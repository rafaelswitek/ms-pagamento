import InterfacePagamentoRepository from '../interfaces/InterfacePagamentoRepository'
import InterfacePagamentoResposta from '../interfaces/InterfacePagamentoResposta'

export default class BuscarPagamentoUseCase {
  constructor(private repository: InterfacePagamentoRepository) {}

  async executa(id: number): Promise<InterfacePagamentoResposta> {
    try {
      return this.repository.buscaPorId(id)
    } catch (error: any) {
      throw new Error(`Erro ao buscar pagamento ${id}: ${error.message}`)
    }
  }
}
