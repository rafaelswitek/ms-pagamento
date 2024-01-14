import { PurchaseDto } from '../../app/dtos/mercadoPago.dto'
import HttpClient from '../../domain/interfaces/HttpClient'

class MercadoPagoService {
  private readonly apiUrl: string
  private readonly userId: string
  private readonly posId: string
  private readonly config: any

  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'https://api.mercadopago.com'
    this.userId = process.env.MERCADO_PAGO_USER_ID!
    this.posId = process.env.MERCADO_PAGO_POS_ID!

    const apiKey = process.env.MERCADO_PAGO_KEY!
    this.config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    }
  }

  async gerarQrCodeDinamico(data: PurchaseDto): Promise<any> {
    const fullUrl = `${this.apiUrl}/instore/orders/qr/seller/collectors/${this.userId}/pos/${this.posId}/qrs`
    const resposta = await this.httpClient.post(fullUrl, JSON.stringify(data), this.config)
    return resposta
  }

  async consultarStatus(url: string): Promise<any> {
    return this.httpClient.get(url, this.config)
  }
}

export default MercadoPagoService
