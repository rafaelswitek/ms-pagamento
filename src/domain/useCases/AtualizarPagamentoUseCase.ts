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
        StatusPedidoEnum[pagamentoDto.statusPedido as keyof typeof StatusPedidoEnum],
        StatusPagamentoEnum[pagamentoDto.statusPagamento as keyof typeof StatusPagamentoEnum],
        FormasPagamentoEnum[pagamentoDto.formaPagamento as keyof typeof FormasPagamentoEnum],
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
    if (!this.isStatusValid(pagamentoDto.statusPagamento)) {
      throw new Error('Status inválido')
    }

    if (!this.isFormaPagamentoValid(pagamentoDto.formaPagamento)) {
      throw new Error('Forma de pagamento inválida')
    }
  }

  private isStatusValid(status: string): boolean {
    return Object.keys(StatusPedidoEnum).includes(status)
  }

  private isFormaPagamentoValid(formaPagamento: string): boolean {
    return Object.keys(FormasPagamentoEnum).includes(formaPagamento)
  }
}
