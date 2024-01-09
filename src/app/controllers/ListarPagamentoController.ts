import { Request, Response } from "express";
import ListarPagamentoUseCase from "../../domain/useCases/ListarPagamentoUseCase";

export default class ListarPagamentoController {
    constructor(private readonly useCase: ListarPagamentoUseCase) {}

    async processar(req: Request, res: Response) {
        try {
            const pagamentos = await this.useCase.executa();

            return res.status(200).json(pagamentos);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar pagamento" });
        }
    }
}
