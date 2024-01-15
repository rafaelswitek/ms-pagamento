import PagamentoDto from '../../../src/app/dtos/pagamento.dto'
import CriarPagamentoUseCase from '../../../src/domain/useCases/CriarPagamentoUseCase'
import ListarPagamentoUseCase from '../../../src/domain/useCases/ListarPagamentoUseCase'
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

describe('ListarPagamentoUseCase', () => {
  let mercadoPagoService: MercadoPagoService
  let mockHttpClient: MockHttpClient

  beforeEach(() => {
    jest.clearAllMocks()
    mockHttpClient = new MockHttpClient()
    mercadoPagoService = new MercadoPagoService(mockHttpClient)
  })

  it('deve listar dois pagamentos', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const criarPagamentoUseCase = new CriarPagamentoUseCase(pagamentoRepository, mercadoPagoService)
    const listarPagamentoUseCase = new ListarPagamentoUseCase(pagamentoRepository)

    const mockPagamentoDto: PagamentoDto = {
      valor: '12',
      status: 'Pendente',
      formaPagamento: 'Pix',
      pedidoId: '1234',
    }

    await criarPagamentoUseCase.executa(mockPagamentoDto)
    await criarPagamentoUseCase.executa(mockPagamentoDto)

    const retorno = await listarPagamentoUseCase.executa()

    expect(retorno.length).toBe(2)
  })

  it('não deve listar nenhum pagamento', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const listarPagamentoUseCase = new ListarPagamentoUseCase(pagamentoRepository)

    const retorno = await listarPagamentoUseCase.executa()

    expect(retorno.length).toBe(0)
  })

  it('deve lançar um erro ao tentar atualizar um pagamento', async () => {
    const pagamentoRepository = {} as any
    const listarPagamentoUseCase = new ListarPagamentoUseCase(pagamentoRepository)

    await expect(listarPagamentoUseCase.executa()).rejects.toThrow(
      'Erro ao atualizar pagamento: this.repository.atualizaPagamento is not a function',
    )
  })
})
