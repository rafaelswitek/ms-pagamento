import { AxiosResponse } from 'axios'
import PagamentoDto from '../../../src/app/dtos/pagamento.dto'
import CriarPagamentoUseCase from '../../../src/domain/useCases/CriarPagamentoUseCase'
import PagamentoRepositoryEmMemoria from '../../../src/infra/repositories/PagamentoRepositoryEmMemoria'
import MercadoPagoService from '../../../src/infra/services/MercadoPagoService'

jest.mock('../../../src/infra/services/MercadoPagoService')

describe('CriarPagamentoUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve criar um novo pagamento com sucesso', async () => {
    const pagamentoRepositoryMock = new PagamentoRepositoryEmMemoria()
    const mercadoPagoServiceMock = new MercadoPagoService() as jest.Mocked<MercadoPagoService>
    const criarPagamentoUseCase = new CriarPagamentoUseCase(pagamentoRepositoryMock, mercadoPagoServiceMock)
    mercadoPagoServiceMock.gerarQrCodeDinamico.mockResolvedValue({
      status: 201,
      statusText: 'Created',
      data: {
        in_store_order_id: '12345',
        qr_data: 'qr_code_data_here',
      },
    } as AxiosResponse)

    const mockPagamentoDto: PagamentoDto = {
      valor: '12',
      status: 'Pendente',
      formaPagamento: 'Pix',
      pedidoId: '1234',
    }

    jest.spyOn(pagamentoRepositoryMock, 'criaPagamento')

    const novoPagamento = await criarPagamentoUseCase.executa(mockPagamentoDto)

    expect(pagamentoRepositoryMock.criaPagamento).toHaveBeenCalledWith(expect.anything())

    expect(mercadoPagoServiceMock.gerarQrCodeDinamico).toHaveBeenCalledWith(expect.anything())

    expect(novoPagamento).toBeDefined()
  })

  it('deve lançar uma exception de Status inválido', async () => {
    const pagamentoRepositoryMock = new PagamentoRepositoryEmMemoria()
    const mercadoPagoServiceMock = new MercadoPagoService() as jest.Mocked<MercadoPagoService>
    const criarPagamentoUseCase = new CriarPagamentoUseCase(pagamentoRepositoryMock, mercadoPagoServiceMock)

    const mockPagamentoDto: PagamentoDto = {
      valor: '12',
      status: 'pendente',
      formaPagamento: 'Pix',
      pedidoId: '1234',
    }

    try {
      await criarPagamentoUseCase.executa(mockPagamentoDto)
      fail('Deveria ter lançado uma exceção')
    } catch (error: any) {
      expect(error.message).toBe('Erro ao criar pagamento: Status inválido')
    }
  })

  it('deve lançar uma exception de Forma de pagamento inválida', async () => {
    const pagamentoRepositoryMock = new PagamentoRepositoryEmMemoria()
    const mercadoPagoServiceMock = new MercadoPagoService() as jest.Mocked<MercadoPagoService>
    const criarPagamentoUseCase = new CriarPagamentoUseCase(pagamentoRepositoryMock, mercadoPagoServiceMock)

    const mockPagamentoDto: PagamentoDto = {
      valor: '12',
      status: 'Pendente',
      formaPagamento: 'pix',
      pedidoId: '1234',
    }

    try {
      await criarPagamentoUseCase.executa(mockPagamentoDto)
      fail('Deveria ter lançado uma exceção')
    } catch (error: any) {
      expect(error.message).toBe('Erro ao criar pagamento: Forma de pagamento inválida')
    }
  })
})
