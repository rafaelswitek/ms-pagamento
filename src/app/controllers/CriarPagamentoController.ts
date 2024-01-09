import { Request, Response } from "express";
import CriarPagamentoUseCase from "../../domain/useCases/CriarPagamentoUseCase";

export default class CriarPagamentoController {
    constructor(private readonly useCase: CriarPagamentoUseCase) {}

    async processar(req: Request, res: Response) {
        try {
            const {
                pedidoId,
                valor,
                status,
                formaPagamento,
                valorPago,
                dataPagamento,
            } = req.body as PagamentoDto;

            const pagamento = await this.useCase.executa({
                pedidoId,
                valor,
                status,
                formaPagamento,
                valorPago,
                dataPagamento,
            });

            return res.status(201).json(pagamento);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar pagamento" });
        }
    }
}
