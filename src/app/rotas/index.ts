import express from 'express'
import PagamentoRepository from '../../infra/repositories/PagamentoRepository'
import { AppDataSource } from '../../infra/config/dataSource'
import CriarPagamentoUseCase from '../../domain/useCases/CriarPagamentoUseCase'
import CriarPagamentoController from '../controllers/CriarPagamentoController'
import AtualizarPagamentoController from '../controllers/AtualizarPagamentoController'
import AtualizarPagamentoUseCase from '../../domain/useCases/AtualizarPagamentoUseCase'
import ListarPagamentoController from '../controllers/ListarPagamentoController'
import ListarPagamentoUseCase from '../../domain/useCases/ListarPagamentoUseCase'
import RemoverPagamentoUseCase from '../../domain/useCases/RemoverPagamentoUseCase'
import RemoverPagamentoController from '../controllers/RemoverPagamentoController'
import BuscarPagamentoUseCase from '../../domain/useCases/BuscarPagamentoUseCase'
import BuscarPagamentoController from '../controllers/BuscarPagamentoController'
import MercadoPagoService from '../../infra/services/MercadoPagoService'
const router = (app: express.Router) => {
  const pagamentoRepository = new PagamentoRepository(AppDataSource.getRepository('Pagamento'))
  const criaUseCase = new CriarPagamentoUseCase(pagamentoRepository, new MercadoPagoService())
  const criarPagamentoController = new CriarPagamentoController(criaUseCase)

  const atualizaUseCase = new AtualizarPagamentoUseCase(pagamentoRepository)
  const atualizaPagamentoController = new AtualizarPagamentoController(atualizaUseCase)

  const listarUseCase = new ListarPagamentoUseCase(pagamentoRepository)
  const listarPagamentoController = new ListarPagamentoController(listarUseCase)

  const buscarUseCase = new BuscarPagamentoUseCase(pagamentoRepository)
  const buscarPagamentoController = new BuscarPagamentoController(buscarUseCase)

  const removerUseCase = new RemoverPagamentoUseCase(pagamentoRepository)
  const removerPagamentoController = new RemoverPagamentoController(removerUseCase)

  app.post('/pagamento', (req, res) => criarPagamentoController.processar(req, res))
  app.get('/pagamento', (req, res) => listarPagamentoController.processar(req, res))
  app.get('/pagamento/:id', (req, res) => buscarPagamentoController.processar(req, res))
  app.put('/pagamento/:id', (req, res) => atualizaPagamentoController.processar(req, res))
  app.delete('/pagamento/:id', (req, res) => removerPagamentoController.processar(req, res))
}

export default router
