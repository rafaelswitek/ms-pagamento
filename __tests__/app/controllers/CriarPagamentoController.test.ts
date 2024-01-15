import { Request, Response } from 'express'
import CriarPagamentoController from '../../../src/app/controllers/CriarPagamentoController'
import CriarPagamentoUseCase from '../../../src/domain/useCases/CriarPagamentoUseCase'

describe('CriarPagamentoController', () => {
  it('deve retornar status 201 ao criar um pagamento com sucesso', async () => {
    const mockRequest = {} as Request
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    } as unknown as Response

    const mockResposta = {
      pedidoId: '1234',
      valor: 12,
      status: 'pendente',
      formaPagamento: 'pix',
      valorPago: null,
      dataPagamento: null,
      id: 13,
      integrationId: 'da3e7124-26e2-4746-9703-c9bd33985544',
      qrCode:
        '00020101021243650016COM.MERCADOLIBRE020130636da3e7124-26e2-4746-9703-c9bd339855445204000053039865802BR5909Test Test6009SAO PAULO62070503***6304D135',
    }

    const mockCriarPagamentoUseCase = {
      executa: jest.fn(() => Promise.resolve(mockResposta)),
    } as unknown as CriarPagamentoUseCase

    const criarPagamentoController = new CriarPagamentoController(mockCriarPagamentoUseCase)

    await criarPagamentoController.processar(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalled()
  })

  it('deve retornar status 500 se houver um erro interno', async () => {
    const mockRequest = {} as Request
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    } as unknown as Response

    const mockCriarPagamentoUseCase = {
      executa: jest.fn(() => Promise.reject(new Error('Erro interno'))),
    } as unknown as CriarPagamentoUseCase

    const criarPagamentoController = new CriarPagamentoController(mockCriarPagamentoUseCase)

    await criarPagamentoController.processar(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalled()
  })
})
