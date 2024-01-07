import { Request, Response } from "express";
import PagamentoRepository from "../repositories/PagamentoRepository";
import PagamentoEntity from "../entities/PagamentoEntity";
import FormasPagamentoEnum from "../enums/FormasPagamentoEnum";

export default class PagamentoController {
    constructor(private repository: PagamentoRepository) {}
    async criaPagamento(req: Request, res: Response) {
        const {
            pedidoId,
            valor,
            status,
            formaPagamento,
            valorPago,
            dataPagamento,
        } = <PagamentoEntity>req.body;

        if (!Object.values(FormasPagamentoEnum).includes(formaPagamento)) {
            return res
                .status(400)
                .json({ error: "Forma de pagamento inválida" });
        }

        const novoPagamento = new PagamentoEntity(
            pedidoId,
            valor,
            status,
            formaPagamento,
            valorPago,
            dataPagamento
        );

        await this.repository.criaPagamento(novoPagamento);
        return res.status(201).json(novoPagamento);
    }

    async listaPagamento(req: Request, res: Response) {
        const listaDePagamentos = await this.repository.listaPagamento();

        return res.status(200).json(listaDePagamentos);
    }

    async atualizaPagamento(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPagamento(
            Number(id),
            req.body as PagamentoEntity
        );

        if (!success) {
            return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }

    async deletaPagamento(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletaPagamento(Number(id));

        if (!success) {
            return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }
}
