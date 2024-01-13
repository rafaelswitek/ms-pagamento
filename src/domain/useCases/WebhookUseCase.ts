import PagamentoDto from '../../app/dtos/pagamento.dto'
import MercadoPagoService from '../../infra/services/MercadoPagoService'
import FormasPagamentoEnum from '../enums/FormasPagamentoEnum'
import StatusEnum from '../enums/StatusEnum'
import InterfaceWebhook from '../interfaces/InterfaceWebhook'
import AtualizarPagamentoUseCase from './AtualizarPagamentoUseCase'
import BuscarPagamentoUseCase from './BuscarPagamentoUseCase'

interface Props {
  order_status: string
  external_reference: string
}

export default class WebhookUseCase {
  constructor(
    private buscaPagamentoUseCase: BuscarPagamentoUseCase,
    private mercadoPagoService: MercadoPagoService,
    private atualizaUseCase: AtualizarPagamentoUseCase,
  ) {}

  async executa(payload: InterfaceWebhook) {
    if (payload.topic == 'merchant_order') {
      const resposta = await this.mercadoPagoService.consultarStatus(payload.resource)
      const dados = resposta.data as Props
      if (resposta && dados && dados.order_status === 'paid') {
        const id = parseInt(dados.external_reference)
        const { pagamento } = await this.buscaPagamentoUseCase.executa(id)
        const pagamentoDto = new PagamentoDto(
          pagamento!.pedidoId,
          pagamento!.valor.toString(),
          'Pago' as keyof typeof StatusEnum,
          'MercadoPago' as keyof typeof FormasPagamentoEnum,
          pagamento!.valor?.toString(),
          new Date().toString(),
          pagamento?.integrationId,
          pagamento?.qrCode,
        )

        return this.atualizaUseCase.executa(id, pagamentoDto)
      }
    }
  }
}
