import MercadoPagoService from '../../../src/infra/services/MercadoPagoService'
import { CashOutDto, ItemDto, PurchaseDto } from '../../../src/app/dtos/mercadoPago.dto'

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

describe('MercadoPagoService', () => {
  let mercadoPagoService: MercadoPagoService
  let mockHttpClient: MockHttpClient

  beforeEach(() => {
    mockHttpClient = new MockHttpClient()
    mercadoPagoService = new MercadoPagoService(mockHttpClient)
  })

  test('deve gerar um QR code dinâmico', async () => {
    const purchaseData: PurchaseDto = new PurchaseDto(
      new CashOutDto(0),
      `Pagamento ref. ao pedido:  1`,
      '1',
      [new ItemDto('1', 'item', 'Produto', 'Item', 10, 1, 'unit', 10)],
      'https://example.com/mock-url',
      'Product order',
      10,
    )

    const resposta = await mercadoPagoService.gerarQrCodeDinamico(purchaseData)
    expect(resposta).toBeDefined()
    expect(resposta).toEqual({
      in_store_order_id: '7a6a4328-a414-472c-978e-fd2c381e0703',
      qr_data:
        '00020101021243650016COM.MERCADOLIBRE0201306367a6a4328-a414-472c-978e-fd2c381e07035204000053039865802BR5909Test Test6009SAO PAULO62070503***63041CD7',
    })
  })

  test('deve consultar o status', async () => {
    const url: string = ''

    const resposta = await mercadoPagoService.consultarStatus(url)

    expect(resposta).toBeDefined()
    expect(resposta).toEqual({
      id: 14911691621,
      order_status: 'paid',
    })
  })
})
