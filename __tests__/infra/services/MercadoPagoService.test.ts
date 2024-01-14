import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import MercadoPagoService from '../../../src/infra/services/MercadoPagoService'
import { CashOutDto, ItemDto, PurchaseDto } from '../../../src/app/dtos/mercadoPago.dto'

const mock = new MockAdapter(axios)

const mockPurchaseDto = new PurchaseDto(
  new CashOutDto(0),
  `Pagamento ref. ao pedido:  1`,
  '1',
  [new ItemDto('1', 'item', 'Produto', 'Item', 10, 1, 'unit', 10)],
  'https://example.com/mock-url',
  'Product order',
  10,
)

const mercadoPagoService = new MercadoPagoService()

describe('MercadoPagoService', () => {
  afterEach(() => {
    mock.reset()
  })

  it('deve gerar qr code dinamicamente', async () => {
    const mockResponse = {
      status: 201,
      statusText: 'Created',
      data: {
        in_store_order_id: '12345',
        qr_data: 'qr_code_data_here',
      },
    }
    mock.onPost(/\/instore\/orders\/qr\/seller/).reply(201, mockResponse)

    const response = await mercadoPagoService.gerarQrCodeDinamico(mockPurchaseDto)
    expect(response.status).toBe(201)
  })

  it('deve buscar o status', async () => {
    const mockResponse = {
      id: 14911691621,
      order_status: 'paid',
    }
    const mockUrl = 'https://example.com/mock-url'
    mock.onGet(mockUrl).reply(200, mockResponse)

    const response = await mercadoPagoService.consultarStatus(mockUrl)

    expect(response.status).toBe(200)
    expect(response.data.order_status).toBe('paid')
    expect(response.data.order_status).toBe(mockResponse.order_status)
    expect(response.data.id).toBe(mockResponse.id)
  })
})
