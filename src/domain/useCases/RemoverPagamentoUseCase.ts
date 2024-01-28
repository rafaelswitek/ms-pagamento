import InterfacePagamentoRepository from '../interfaces/InterfacePagamentoRepository'
import InterfacePagamentoResposta from '../interfaces/InterfacePagamentoResposta'

export default class RemoverPagamentoUseCase {
  constructor(private repository: InterfacePagamentoRepository) {}

  async executa(id: number): Promise<InterfacePagamentoResposta> {
    try {
      return await this.repository.deletaPagamento(id)
    } catch (error: any) {
      throw new Error(`Erro ao remover pagamento: ${error.message}`)
    }
  }
}
