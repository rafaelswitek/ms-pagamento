import { CashOutDto, ItemDto, PurchaseDto } from '../../app/dtos/mercadoPago.dto'
import MercadoPagoService from '../../infra/services/MercadoPagoService'
import InterfacePagamentoRepository from '../interfaces/InterfacePagamentoRepository'
import Pagamento from '../entities/Pagamento'
import FormasPagamentoEnum from '../enums/FormasPagamentoEnum'
import StatusEnum from '../enums/StatusEnum'
import PagamentoDto from '../../app/dtos/pagamento.dto'

interface QrCodeResposta {
  in_store_order_id: string
  qr_data: string
}

export default class CriarPagamentoUseCase {
  constructor(
    private repository: InterfacePagamentoRepository,
    private mercadoPagoService: MercadoPagoService,
  ) {}

  async executa(pagamentoDto: PagamentoDto): Promise<Pagamento> {
    try {
      this.validarCampos(pagamentoDto)

      const dados = new Pagamento(
        pagamentoDto.pedidoId,
        parseFloat(pagamentoDto.valor),
        StatusEnum[pagamentoDto.status as keyof typeof StatusEnum],
        FormasPagamentoEnum[pagamentoDto.formaPagamento as keyof typeof FormasPagamentoEnum],
      )

      const novoPagamento = await this.repository.criaPagamento(dados)
      const resposta = await this.gerarQrCode(novoPagamento)

      novoPagamento.setIntegrationId(resposta.in_store_order_id)
      novoPagamento.setQrCode(resposta.qr_data)

      const pagamentoAtualizado = await this.repository.atualizaPagamento(novoPagamento.id, novoPagamento)
      return pagamentoAtualizado.pagamento!
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
    if (!this.isStatusValid(pagamentoDto.status)) {
      throw new Error('Status inválido')
    }

    if (!this.isFormaPagamentoValid(pagamentoDto.formaPagamento)) {
      throw new Error('Forma de pagamento inválida')
    }
  }

  private isStatusValid(status: string): boolean {
    return Object.keys(StatusEnum).includes(status)
  }

  private isFormaPagamentoValid(formaPagamento: string): boolean {
    return Object.keys(FormasPagamentoEnum).includes(formaPagamento)
  }
}
