import PagamentoDto from '../../app/dtos/pagamento.dto'
import HttpClient from '../../domain/interfaces/HttpClient'

class NotificarService {
  private readonly urls: string[]

  constructor(private httpClient: HttpClient) {
    this.urls = [process.env.URL_MS_PEDIDO!, process.env.URL_MS_PRODUCAO!]
  }

  notificaOutrosMS(pagamentoDto: PagamentoDto): void {
    for (const url of this.urls) {
      this.httpClient.post(url, pagamentoDto)
    }
  }
}

export default NotificarService
