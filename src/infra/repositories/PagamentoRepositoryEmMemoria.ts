import InterfacePagamentoRepository from '../../domain/interfaces/InterfacePagamentoRepository'
import Pagamento from '../../domain/entities/Pagamento'
import InterfacePagamentoResposta from '../../domain/interfaces/InterfacePagamentoResposta'

export default class PagamentoRepositoryEmMemoria implements InterfacePagamentoRepository {
  private pagamentos: Pagamento[] = []
  private idCounter: number = 1

  async criaPagamento(pagamento: Pagamento): Promise<Pagamento> {
    pagamento.id = this.idCounter++
    this.pagamentos.push(pagamento)
    return pagamento
  }

  async listaPagamento(): Promise<Pagamento[]> {
    return this.pagamentos
  }

  async buscaPorId(id: number): Promise<InterfacePagamentoResposta> {
    const pagamento = this.pagamentos.find((p) => p.id === id)

    if (!pagamento) {
      return { success: false, message: 'Pagamento não encontrado' }
    }

    return { success: true, pagamento }
  }

  async atualizaPagamento(id: number, newData: Pagamento): Promise<InterfacePagamentoResposta> {
    const index = this.pagamentos.findIndex((p) => p.id === id)

    if (index === -1) {
      return { success: false, message: 'Pagamento não encontrado' }
    }

    const pagamento = this.pagamentos[index]
    pagamento.setIntegrationId(newData.integrationId || '')
    pagamento.setQrCode(newData.qrCode || '')

    return { success: true, pagamento }
  }

  async deletaPagamento(id: number): Promise<InterfacePagamentoResposta> {
    const index = this.pagamentos.findIndex((p) => p.id === id)

    if (index === -1) {
      return { success: false, message: 'Pagamento não encontrado' }
    }

    this.pagamentos.splice(index, 1)

    return { success: true }
  }

  async buscaPagamentoPorCampoGenerico<Tipo extends keyof Pagamento>(
    campo: Tipo,
    valor: Pagamento[Tipo],
  ): Promise<Pagamento[]> {
    const pagamentos = this.pagamentos.filter((p) => p[campo] === valor)
    return pagamentos
  }
}
