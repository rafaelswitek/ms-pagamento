import PagamentoDto from '../../../src/app/dtos/pagamento.dto'
import StatusPedidoEnum from '../../../src/domain/enums/StatusPedidoEnum'
import AtualizarPagamentoUseCase from '../../../src/domain/useCases/AtualizarPagamentoUseCase'
import CriarPagamentoUseCase from '../../../src/domain/useCases/CriarPagamentoUseCase'
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

const mockPagamentoDto: PagamentoDto = {
  valor: '12',
  statusPedido: 'Recebido',
  statusPagamento: 'Aguardando pagamento',
  formaPagamento: 'Pix',
  pedidoId: '1234',
}

describe('AtualizarPagamentoUseCase', () => {
  let mercadoPagoService: MercadoPagoService
  let mockHttpClient: MockHttpClient

  beforeEach(() => {
    jest.clearAllMocks()
    mockHttpClient = new MockHttpClient()
    mercadoPagoService = new MercadoPagoService(mockHttpClient)
  })

  it('deve atualizar um novo pagamento com sucesso', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const atualizarPagamentoUseCase = new AtualizarPagamentoUseCase(pagamentoRepository)
    const criarPagamentoUseCase = new CriarPagamentoUseCase(pagamentoRepository, mercadoPagoService)

    const novoPagamento = await criarPagamentoUseCase.executa(mockPagamentoDto)
    const novo = {
      ...mockPagamentoDto,
      statusPedido: 'Recebido',
      statusPagamento: 'Pagamento aprovado',
      pedidoId: '321',
      valorPago: '12',
      dataPagamento: Date.now().toString(),
    }

    const retorno = await atualizarPagamentoUseCase.executa(novoPagamento.id, novo)

    expect(retorno.pagamento!.statusPedido).toBe(StatusPedidoEnum.RECEBIDO)
  })

  it('deve dar erro ao atualizar pagamento inexistente', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const atualizarPagamentoUseCase = new AtualizarPagamentoUseCase(pagamentoRepository)

    const retorno = await atualizarPagamentoUseCase.executa(1, mockPagamentoDto)

    expect(retorno.success).toBe(false)
    expect(retorno.message).toBe('Pagamento não encontrado')
  })

  it('deve lançar um erro ao tentar atualizar um pagamento', async () => {
    const pagamentoRepository = {} as any
    const atualizarPagamentoUseCase = new AtualizarPagamentoUseCase(pagamentoRepository)

    await expect(atualizarPagamentoUseCase.executa(1, mockPagamentoDto)).rejects.toThrow(
      'Erro ao atualizar pagamento: this.repository.atualizaPagamento is not a function',
    )
  })

  it('deve lançar uma exception de Status de pedido inválido', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const atualizarPagamentoUseCase = new AtualizarPagamentoUseCase(pagamentoRepository)

    try {
      const mockPagamentoDto: PagamentoDto = {
        valor: '12',
        statusPedido: 'Aguardando',
        statusPagamento: 'Aguardando pagamento',
        formaPagamento: 'Pix',
        pedidoId: '1234',
      }
      await atualizarPagamentoUseCase.executa(1, mockPagamentoDto)
      fail('Deveria ter lançado uma exceção')
    } catch (error: any) {
      expect(error.message).toBe('Erro ao atualizar pagamento: Status de pedido inválido')
    }
  })

  it('deve lançar uma exception de Status de pagamento inválido', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const atualizarPagamentoUseCase = new AtualizarPagamentoUseCase(pagamentoRepository)

    try {
      const mockPagamentoDto: PagamentoDto = {
        valor: '12',
        statusPedido: 'Recebido',
        statusPagamento: 'Pago',
        formaPagamento: 'Pix',
        pedidoId: '1234',
      }
      await atualizarPagamentoUseCase.executa(1, mockPagamentoDto)
      fail('Deveria ter lançado uma exceção')
    } catch (error: any) {
      expect(error.message).toBe('Erro ao atualizar pagamento: Status de pagamento inválido')
    }
  })

  it('deve lançar uma exception de Forma de pagamento inválida', async () => {
    const pagamentoRepository = new PagamentoRepositoryEmMemoria()
    const atualizarPagamentoUseCase = new AtualizarPagamentoUseCase(pagamentoRepository)

    try {
      const mockPagamentoDto: PagamentoDto = {
        valor: '12',
        statusPedido: 'Recebido',
        statusPagamento: 'Aguardando pagamento',
        formaPagamento: 'pix',
        pedidoId: '1234',
      }
      await atualizarPagamentoUseCase.executa(1, mockPagamentoDto)
      fail('Deveria ter lançado uma exceção')
    } catch (error: any) {
      expect(error.message).toBe('Erro ao atualizar pagamento: Forma de pagamento inválida')
    }
  })
})
