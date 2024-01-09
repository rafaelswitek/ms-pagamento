import InterfacePagamentoRepository from "../InterfacePagamentoRepository";
import Pagamento from "../entities/Pagamento";
import FormasPagamentoEnum from "../enums/FormasPagamentoEnum";
import StatusEnum from "../enums/StatusEnum";

export default class CriarPagamentoUseCase {
    constructor(private repository: InterfacePagamentoRepository) {}

    async executa(pagamentoDto: PagamentoDto): Promise<Pagamento> {
        this.validarCampos(pagamentoDto);

        const novoPagamento = new Pagamento(
            pagamentoDto.pedidoId,
            parseFloat(pagamentoDto.valor),
            StatusEnum[pagamentoDto.status as keyof typeof StatusEnum],
            FormasPagamentoEnum[
                pagamentoDto.formaPagamento as keyof typeof FormasPagamentoEnum
            ],
            pagamentoDto.valorPago
                ? parseFloat(pagamentoDto.valorPago)
                : undefined,
            pagamentoDto.dataPagamento
                ? new Date(pagamentoDto.dataPagamento)
                : undefined
        );

        return this.repository.criaPagamento(novoPagamento);
    }

    private validarCampos(pagamentoDto: PagamentoDto): void {
        if (!this.isStatusValid(pagamentoDto.status)) {
            throw new Error("Status inválido");
        }

        if (!this.isFormaPagamentoValid(pagamentoDto.formaPagamento)) {
            throw new Error("Forma de pagamento inválida");
        }
    }

    private isStatusValid(status: string): boolean {
        return Object.keys(StatusEnum).includes(status);
    }

    private isFormaPagamentoValid(formaPagamento: string): boolean {
        return Object.keys(FormasPagamentoEnum).includes(formaPagamento);
    }
}
