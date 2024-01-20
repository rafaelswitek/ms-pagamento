import PagamentoDto from '../../../src/app/dtos/pagamento.dto'
import CriarPagamentoUseCase from '../../../src/domain/useCases/CriarPagamentoUseCase'
import BuscarPagamentoUseCase from '../../../src/domain/useCases/BuscarPagamentoUseCase'
import PagamentoRepositoryEmMemoria from '../../../src/infra/repositories/PagamentoRepositoryEmMemoria'
import MercadoPagoService from '../../../src/infra/services/MercadoPagoService'

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

describe('BuscarPagamentoUseCase', () => {
  let mercadoPagoService: MercadoPagoService
  let mockHttpClient: MockHttpClient

  beforeEach(() => {
    jest.clearAllMocks()
    mockHttpClient = new MockHttpClient()
    mercadoPagoService = new MercadoPagoService(mockHttpClient)
  })

  it('deve buscar o pagamento pelo id', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const criarPagamentoUseCase = new CriarPagamentoUseCase(pagamentoRepository, mercadoPagoService)
    const buscarPagamentoUseCase = new BuscarPagamentoUseCase(pagamentoRepository)

    const mockPagamentoDto: PagamentoDto = {
      valor: '12',
      statusPedido: 'Pendente',
      statusPagamento: 'Pendente',
      formaPagamento: 'Pix',
      pedidoId: '1234',
    }

    const novoPagamento = await criarPagamentoUseCase.executa(mockPagamentoDto)

    const retorno = await buscarPagamentoUseCase.executa(novoPagamento.id)

    expect(retorno.success).toBe(true)
    expect(retorno.pagamento!.id).toBe(novoPagamento.id)
    expect(retorno.pagamento!.pedidoId).toBe(mockPagamentoDto.pedidoId)
  })

  it('deve dar erro ao buscar por id inexistente', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const buscarPagamentoUseCase = new BuscarPagamentoUseCase(pagamentoRepository)

    const retorno = await buscarPagamentoUseCase.executa(1)

    expect(retorno.success).toBe(false)
    expect(retorno.message).toBe('Pagamento não encontrado')
  })

  it('deve lançar um erro ao tentar atualizar um pagamento', async () => {
    const pagamentoRepository = {} as any
    const buscarPagamentoUseCase = new BuscarPagamentoUseCase(pagamentoRepository)

    await expect(buscarPagamentoUseCase.executa(1)).rejects.toThrow(
      'Erro ao buscar pagamento 1: this.repository.buscaPorId is not a function',
    )
  })
})
