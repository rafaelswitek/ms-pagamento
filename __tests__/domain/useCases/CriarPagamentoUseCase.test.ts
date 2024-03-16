import PagamentoDto from '../../../src/app/dtos/pagamento.dto'
import StatusPedidoEnum from '../../../src/domain/enums/StatusPedidoEnum'
import CriarPagamentoUseCase from '../../../src/domain/useCases/CriarPagamentoUseCase'
import PagamentoRepositoryEmMemoria from '../../../src/infra/repositories/PagamentoRepositoryEmMemoria'
import MercadoPagoService from '../../../src/infra/services/MercadoPagoService'
import RabbitmqAdapter from '../../infra/adapters/RabbitmqAdapter'

class MockHttpClient {
  async post(url: string, data: string, config: any): Promise<any> {
    return {
      in_store_order_id: '7a6a4328-a414-472c-978e-fd2c381e0703',
      qr_data:
        '00020101021243650016COM.MERCADOLIBRE0201306367a6a4328-a414-472c-978e-fd2c381e07035204000053039865802BR5909Test Test6009SAO PAULO62070503***63041CD7',
    }
  }

  async get(url: string, config: any): Promise<any> {
    return {
      id: 14911691621,
      order_status: 'paid',
    }
  }
}


describe('CriarPagamentoUseCase', () => {
  let mercadoPagoService: MercadoPagoService
  let mockHttpClient: MockHttpClient
  const mockQueue = new RabbitmqAdapter();

  beforeEach(() => {
    jest.clearAllMocks()
    mockHttpClient = new MockHttpClient()
    mercadoPagoService = new MercadoPagoService(mockHttpClient)
  })

  it('deve criar um novo pagamento com sucesso', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const criarPagamentoUseCase = new CriarPagamentoUseCase(pagamentoRepository, mercadoPagoService, mockQueue)

    const mockPagamentoDto: PagamentoDto = {
      valor: '12',
      statusPedido: 'Recebido',
      statusPagamento: 'Aguardando pagamento',
      formaPagamento: 'Mercado Pago',
      pedidoId: '1234',
    }

    const novoPagamento = await criarPagamentoUseCase.executa(mockPagamentoDto)

    expect(novoPagamento.id).toBe(1)
    expect(novoPagamento.statusPedido).toBe(StatusPedidoEnum.RECEBIDO)
    expect(novoPagamento.qrCode).toBe(
      '00020101021243650016COM.MERCADOLIBRE0201306367a6a4328-a414-472c-978e-fd2c381e07035204000053039865802BR5909Test Test6009SAO PAULO62070503***63041CD7',
    )
  })

  it('deve lançar uma exception de Forma de pagamento inválida', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const criarPagamentoUseCase = new CriarPagamentoUseCase(pagamentoRepository, mercadoPagoService, mockQueue)

    const mockPagamentoDto: PagamentoDto = {
      valor: '12',
      statusPedido: 'Recebido',
      statusPagamento: 'Aguardando pagamento',
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
