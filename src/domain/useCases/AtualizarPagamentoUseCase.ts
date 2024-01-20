import InterfacePagamentoRepository from '../interfaces/InterfacePagamentoRepository'
import Pagamento from '../entities/Pagamento'
import FormasPagamentoEnum from '../enums/FormasPagamentoEnum'
import StatusPedidoEnum from '../enums/StatusPedidoEnum'
import InterfacePagamentoResposta from '../interfaces/InterfacePagamentoResposta'
import PagamentoDto from '../../app/dtos/pagamento.dto'
import StatusPagamentoEnum from '../enums/StatusPagamentoEnum'

export default class AtualizarPagamentoUseCase {
  constructor(private repository: InterfacePagamentoRepository) {}

  async executa(id: number, pagamentoDto: PagamentoDto): Promise<InterfacePagamentoResposta> {
    try {
      this.validarCampos(pagamentoDto)

      const pagamento = new Pagamento(
        pagamentoDto.pedidoId,
        parseFloat(pagamentoDto.valor),
        pagamentoDto.statusPedido as StatusPedidoEnum,
        pagamentoDto.statusPagamento as StatusPagamentoEnum,
        pagamentoDto.formaPagamento as FormasPagamentoEnum,
        pagamentoDto.valorPago ? parseFloat(pagamentoDto.valorPago) : undefined,
        pagamentoDto.dataPagamento ? new Date(pagamentoDto.dataPagamento) : undefined,
      )

      pagamento.setIntegrationId(pagamentoDto.integrationId!)
      pagamento.setQrCode(pagamentoDto.qrCode!)

      return this.repository.atualizaPagamento(id, pagamento)
    } catch (error: any) {
      throw new Error(`Erro ao atualizar pagamento: ${error.message}`)
    }
  }

  private validarCampos(pagamentoDto: PagamentoDto): void {
    if (!this.isStatusPedidoValid(pagamentoDto.statusPedido)) {
      throw new Error('Status de pedido inválido')
    }

    if (!this.isStatusPagamentoValid(pagamentoDto.statusPagamento)) {
      throw new Error('Status de pagamento inválido')
    }

    if (!this.isFormaPagamentoValid(pagamentoDto.formaPagamento)) {
      throw new Error('Forma de pagamento inválida')
    }
  }

  private isStatusPedidoValid(status: string): boolean {
    return Object.values(StatusPedidoEnum).includes(status as StatusPedidoEnum)
  }

  private isStatusPagamentoValid(status: string): boolean {
    return Object.values(StatusPagamentoEnum).includes(status as StatusPagamentoEnum)
  }

  private isFormaPagamentoValid(formaPagamento: string): boolean {
    return Object.values(FormasPagamentoEnum).includes(formaPagamento as FormasPagamentoEnum)
  }
}
