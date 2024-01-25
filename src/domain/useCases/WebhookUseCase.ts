import PagamentoDto from '../../app/dtos/pagamento.dto'
import MercadoPagoService from '../../infra/services/MercadoPagoService'
import NotificarService from '../../infra/services/NotificarService'
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
    private notificaService: NotificarService
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

        this.notificaService.notificaOutrosMS(pagamentoDto)

        return this.atualizaUseCase.executa(id, pagamentoDto)
      }
    }
  }
}

export default WebhookUseCase