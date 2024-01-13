class PagamentoDto {
  constructor(
    public pedidoId: string,
    public valor: string,
    public status: string,
    public formaPagamento: string,
    public valorPago?: string,
    public dataPagamento?: string,
    public integrationId?: string,
    public qrCode?: string,
    public id?: string,
  ) {}
}
