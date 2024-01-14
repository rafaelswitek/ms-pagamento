import { Repository } from 'typeorm'
import InterfacePagamentoRepository from '../../domain/interfaces/InterfacePagamentoRepository'
import Pagamento from '../../domain/entities/Pagamento'
import InterfacePagamentoResposta from '../../domain/interfaces/InterfacePagamentoResposta'

export default class PagamentoRepository implements InterfacePagamentoRepository {
  private pagamentoRepository: Repository<Pagamento>

  constructor(pagamentoRepository: Repository<Pagamento>) {
    this.pagamentoRepository = pagamentoRepository
  }

  async criaPagamento(pagamento: Pagamento): Promise<Pagamento> {
    try {
      return await this.pagamentoRepository.save(pagamento)
    } catch (error: any) {
      throw new Error('Erro ao criar pagamento: ' + error.message)
    }
  }

  async listaPagamento(): Promise<Pagamento[]> {
    try {
      return await this.pagamentoRepository.find()
    } catch (error: any) {
      throw new Error('Erro ao listar pagamentos: ' + error.message)
    }
  }

  async buscaPorId(id: number): Promise<InterfacePagamentoResposta> {
    try {
      const pagamento = await this.pagamentoRepository.findOne({
        where: { id },
      })

      if (!pagamento) {
        return { success: false, message: 'Pagamento não encontrado' }
      }

      return { success: true, pagamento }
    } catch (error: any) {
      throw new Error('Erro ao atualizar pagamento: ' + error.message)
    }
  }

  async atualizaPagamento(id: number, newData: Pagamento): Promise<InterfacePagamentoResposta> {
    try {
      const pagamentoToUpdate = await this.pagamentoRepository.findOne({
        where: { id },
      })

      if (!pagamentoToUpdate) {
        return { success: false, message: 'Pagamento não encontrado' }
      }

      Object.assign(pagamentoToUpdate, newData)
      const pagamento = await this.pagamentoRepository.save(pagamentoToUpdate)

      return { success: true, pagamento }
    } catch (error: any) {
      throw new Error('Erro ao atualizar pagamento: ' + error.message)
    }
  }

  async deletaPagamento(id: number): Promise<InterfacePagamentoResposta> {
    try {
      const pagamentoToRemove = await this.pagamentoRepository.findOne({
        where: { id },
      })

      if (!pagamentoToRemove) {
        return { success: false, message: 'Pagamento não encontrado' }
      }

      await this.pagamentoRepository.remove(pagamentoToRemove)
      return { success: true }
    } catch (error: any) {
      throw new Error('Erro ao deletar pagamento: ' + error.message)
    }
  }
}
