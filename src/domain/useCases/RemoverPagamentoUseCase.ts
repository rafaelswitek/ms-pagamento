import InterfacePagamentoRepository from "../InterfacePagamentoRepository";

export default class RemoverPagamentoUseCase {
    constructor(private repository: InterfacePagamentoRepository) {}

    async executa(id: number): Promise<{ success: boolean; message?: string }> {

        return this.repository.deletaPagamento(id);
    }
}
