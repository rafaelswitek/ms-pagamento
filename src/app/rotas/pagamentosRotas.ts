import express from "express";
import PagamentoRepository from "../../infra/repositories/PagamentoRepository";
import PagamentoController from "../controllers/PagamentoController";
import { AppDataSource } from "../../infra/config/dataSource";
const rotas = express.Router();
const pagamentoRepository = new PagamentoRepository(
  AppDataSource.getRepository("PagamentoEntity"),
);
const pagamentoController = new PagamentoController(pagamentoRepository);

rotas.post("/", (req, res) => pagamentoController.criaPagamento(req, res));
rotas.get("/", (req, res) => pagamentoController.listaPagamento(req, res));
rotas.put("/:id", (req, res) => pagamentoController.atualizaPagamento(req, res));
rotas.delete("/:id", (req, res) => pagamentoController.deletaPagamento(req, res));

export default rotas;
