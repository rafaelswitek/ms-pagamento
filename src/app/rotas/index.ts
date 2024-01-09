import express from "express";
import PagamentoRepository from "../../infra/repositories/PagamentoRepository";
import { AppDataSource } from "../../infra/config/dataSource";
import CriarPagamentoUseCase from "../../domain/useCases/CriarPagamentoUseCase";
import PagamentoController from "../controllers/PagamentoController";
const router = (app: express.Router) => {
    const pagamentoRepository = new PagamentoRepository(
        AppDataSource.getRepository("Pagamento")
    );
    const useCase = new CriarPagamentoUseCase(pagamentoRepository);
    const pagamentoController = new PagamentoController(useCase);

    app.post("/pagamento/criar", (req, res) => pagamentoController.criaPagamento(req, res));
};
export default router;
