import InterfacePagamentoRepository from '../InterfacePagamentoRepository'
import Pagamento from '../entities/Pagamento'

export default class ListarPagamentoUseCase {
  constructor(private repository: InterfacePagamentoRepository) {}

  async executa(): Promise<Pagamento[]> {
    try {
      return this.repository.listaPagamento()
    } catch (error: any) {
      throw new Error(`Erro ao listar pagamentos: ${error.message}`)
    }
  }
}
