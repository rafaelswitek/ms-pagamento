import express from "express";
import PagamentoRepository from "../../infra/repositories/PagamentoRepository";
import { AppDataSource } from "../../infra/config/dataSource";
import CriarPagamentoUseCase from "../../domain/useCases/CriarPagamentoUseCase";
import CriarPagamentoController from "../controllers/CriarPagamentoController";
import AtualizarPagamentoController from "../controllers/AtualizarPagamentoController";
import AtualizarPagamentoUseCase from "../../domain/useCases/AtualizarPagamentoUseCase";
import ListarPagamentoController from "../controllers/ListarPagamentoController";
import ListarPagamentoUseCase from "../../domain/useCases/ListarPagamentoUseCase";
const router = (app: express.Router) => {
    const pagamentoRepository = new PagamentoRepository(
        AppDataSource.getRepository("Pagamento")
    );
    const criaUseCase = new CriarPagamentoUseCase(pagamentoRepository);
    const criarPagamentoController = new CriarPagamentoController(criaUseCase);

    const atualizaUseCase = new AtualizarPagamentoUseCase(pagamentoRepository);
    const atualizaPagamentoController = new AtualizarPagamentoController(atualizaUseCase);
    
    const listarUseCase = new ListarPagamentoUseCase(pagamentoRepository);
    const listarPagamentoController = new ListarPagamentoController(listarUseCase);

    app.post("/pagamento", (req, res) => criarPagamentoController.processar(req, res));
    app.get("/pagamento", (req, res) => listarPagamentoController.processar(req, res));
    app.put("/pagamento/:id", (req, res) => atualizaPagamentoController.processar(req, res));
};

export default router;
