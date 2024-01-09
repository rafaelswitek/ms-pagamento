class PagamentoDto {
    constructor(
        public pedidoId: string,
        public valor: string,
        public valorPago: string,
        public status: string,
        public formaPagamento: string,
        public dataPagamento: string,
        public id?: string
    ) {}
}
