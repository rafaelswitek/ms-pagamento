import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { PurchaseDto } from '../../app/dtos/mercadoPago.dto'

class MercadoPagoService {
  private readonly apiUrl: string
  private readonly apiKey: string
  private readonly userId: string
  private readonly posId: string

  constructor() {
    this.apiUrl = 'https://api.mercadopago.com'
    this.apiKey = process.env.MERCADO_PAGO_KEY!
    this.userId = process.env.MERCADO_PAGO_USER_ID!
    this.posId = process.env.MERCADO_PAGO_POS_ID!
  }

  async gerarQrCodeDinamico(data: PurchaseDto): Promise<AxiosResponse> {
    const fullUrl = `${this.apiUrl}/instore/orders/qr/seller/collectors/${this.userId}/pos/${this.posId}/qrs`
    const config: AxiosRequestConfig = {
      method: 'post',
      url: fullUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      data: JSON.stringify(data),
    }

    return axios.request(config)
  }

  async consultarStatus(url: string): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    }

    return axios.request(config)
  }
}

export default MercadoPagoService
