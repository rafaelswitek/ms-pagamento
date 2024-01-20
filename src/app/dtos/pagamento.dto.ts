export default class PagamentoDto {
  constructor(
    public pedidoId: string,
    public valor: string,
    public statusPedido: string,
    public statusPagamento: string,
    public formaPagamento: string,
    public valorPago?: string,
    public dataPagamento?: string,
    public integrationId?: string,
    public qrCode?: string,
    public id?: string,
  ) {}
}
