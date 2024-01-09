import InterfacePagamentoRepository from "../InterfacePagamentoRepository";
import Pagamento from "../entities/Pagamento";

export default class ListarPagamentoUseCase {
    constructor(private repository: InterfacePagamentoRepository) {}

    async executa(): Promise<Pagamento[]> {
        return this.repository.listaPagamento();
    }
}
