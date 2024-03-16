import { CashOutDto, ItemDto, PurchaseDto } from '../../app/dtos/mercadoPago.dto'
import MercadoPagoService from '../../infra/services/MercadoPagoService'
import InterfacePagamentoRepository from '../interfaces/InterfacePagamentoRepository'
import Pagamento from '../entities/Pagamento'
import FormasPagamentoEnum from '../enums/FormasPagamentoEnum'
import StatusPedidoEnum from '../enums/StatusPedidoEnum'
import PagamentoDto from '../../app/dtos/pagamento.dto'
import StatusPagamentoEnum from '../enums/StatusPagamentoEnum'
import QueueConnection from '../interfaces/QueueConnection'

interface QrCodeResposta {
  in_store_order_id: string
  qr_data: string
}

export default class CriarPagamentoUseCase {
  constructor(
    private repository: InterfacePagamentoRepository,
    private mercadoPagoService: MercadoPagoService,
    private queue: QueueConnection,
  ) {}

  async executa(pagamentoDto: PagamentoDto): Promise<Pagamento> {
    try {
      this.validarCampos(pagamentoDto)

      const statusPagamento =
        pagamentoDto.formaPagamento == FormasPagamentoEnum.MERCADO_PAGO
          ? StatusPagamentoEnum.AGUARDANDO_PAGAMENTO
          : StatusPagamentoEnum.PAGAMENTO_APROVADO

      const dados = new Pagamento(
        pagamentoDto.pedidoId,
        parseFloat(pagamentoDto.valor),
        StatusPedidoEnum.RECEBIDO,
        statusPagamento,
        pagamentoDto.formaPagamento as FormasPagamentoEnum,
        pagamentoDto.formaPagamento == FormasPagamentoEnum.MERCADO_PAGO ? undefined : Number(pagamentoDto.valor),
        pagamentoDto.formaPagamento == FormasPagamentoEnum.MERCADO_PAGO ? undefined : new Date(),
      )

      const novoPagamento = await this.repository.criaPagamento(dados)

      if (pagamentoDto.formaPagamento == FormasPagamentoEnum.MERCADO_PAGO) {
        const resposta = await this.gerarQrCode(novoPagamento)

        novoPagamento.setIntegrationId(resposta.in_store_order_id)
        novoPagamento.setQrCode(resposta.qr_data)
        const pagamentoAtualizado = await this.repository.atualizaPagamento(novoPagamento.id, novoPagamento)
        return pagamentoAtualizado.pagamento!
      } else {
        await this.queue.start()
        await this.queue.publishInQueue(process.env.QUEUE_2!, JSON.stringify(novoPagamento))
      }

      return novoPagamento
    } catch (error: any) {
      throw new Error(`Erro ao criar pagamento: ${error.message}`)
    }
  }

  private async gerarQrCode(pagamento: Pagamento) {
    try {
      const mercadoPagoDto = new PurchaseDto(
        new CashOutDto(0),
        `Pagamento ref. ao pedido:  ${pagamento.id}`,
        pagamento.id.toString(),
        [new ItemDto(pagamento.id.toString(), 'item', 'Produto', 'Item', pagamento.valor, 1, 'unit', pagamento.valor)],
        process.env.URL_BASE + '/pagamento/webhook',
        'Product order',
        pagamento.valor,
      )

      const mercadoPagoResposta = await this.mercadoPagoService.gerarQrCodeDinamico(mercadoPagoDto)
      return mercadoPagoResposta as QrCodeResposta
    } catch (error: any) {
      throw new Error(`Erro ao gerar QR Code: ${error.message}`)
    }
  }

  private validarCampos(pagamentoDto: PagamentoDto): void {
    if (!this.isFormaPagamentoValid(pagamentoDto.formaPagamento)) {
      throw new Error('Forma de pagamento inválida')
    }
  }

  private isFormaPagamentoValid(formaPagamento: string): boolean {
    return Object.values(FormasPagamentoEnum).includes(formaPagamento as FormasPagamentoEnum)
  }
}
