import { Request, Response } from "express";
import RemoverPagamentoUseCase from "../../domain/useCases/RemoverPagamentoUseCase";

export default class RemoverPagamentoController {
    constructor(private readonly useCase: RemoverPagamentoUseCase) {}

    async processar(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { success, message } = await this.useCase.executa(Number(id));

            if (!success) {
                return res.status(404).json({ message });
            }
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao remover pagamento" });
        }
    }
}
