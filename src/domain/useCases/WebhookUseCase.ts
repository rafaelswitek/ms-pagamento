import PagamentoDto from '../../app/dtos/pagamento.dto'
import RabbitmqAdapter from '../../infra/adapters/RabbitmqAdapter'
import MercadoPagoService from '../../infra/services/MercadoPagoService'
import FormasPagamentoEnum from '../enums/FormasPagamentoEnum'
import StatusPagamentoEnum from '../enums/StatusPagamentoEnum'
import StatusPedidoEnum from '../enums/StatusPedidoEnum'
import InterfaceWebhook from '../interfaces/InterfaceWebhook'
import AtualizarPagamentoUseCase from './AtualizarPagamentoUseCase'
import BuscarPagamentoUseCase from './BuscarPagamentoUseCase'

interface Props {
  order_status: string
  external_reference: string
}

class WebhookUseCase {
  constructor(
    private buscaPagamentoUseCase: BuscarPagamentoUseCase,
    private atualizaUseCase: AtualizarPagamentoUseCase,
    private mercadoPagoService: MercadoPagoService,
    private queue: RabbitmqAdapter,
  ) {}

  async executa(payload: InterfaceWebhook) {
    if (payload.topic == 'merchant_order') {
      const resposta = await this.mercadoPagoService.consultarStatus(payload.resource)
      const dados = resposta as Props
      if (resposta && dados && dados.order_status === 'paid') {
        const id = parseInt(dados.external_reference)
        const { pagamento } = await this.buscaPagamentoUseCase.executa(id)
        const pagamentoDto = new PagamentoDto(
          pagamento!.pedidoId,
          pagamento!.valor.toString(),
          StatusPedidoEnum.RECEBIDO,
          StatusPagamentoEnum.PAGAMENTO_APROVADO,
          FormasPagamentoEnum.MERCADO_PAGO,
          pagamento!.valor?.toString(),
          new Date().toString(),
          pagamento?.integrationId,
          pagamento?.qrCode,
          id.toString(),
        )

        await this.queue.start()
        await this.queue.publishInQueue(process.env.QUEUE_2!, JSON.stringify(pagamento))

        return this.atualizaUseCase.executa(id, pagamentoDto)
      }
    }
  }
}

export default WebhookUseCase
