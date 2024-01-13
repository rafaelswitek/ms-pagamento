import InterfacePagamentoRepository from '../interfaces/InterfacePagamentoRepository'

export default class RemoverPagamentoUseCase {
  constructor(private repository: InterfacePagamentoRepository) {}

  async executa(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      return this.repository.deletaPagamento(id)
    } catch (error: any) {
      throw new Error(`Erro ao remover pagamento: ${error.message}`)
    }
  }
}
