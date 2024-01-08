import PagamentoEntity from "../../../domain/entities/PagamentoEntity";

export default interface InterfacePagamentoRepository {
  criaPagamento(pagamento: PagamentoEntity): void | Promise<void>;
  listaPagamento(): Array<PagamentoEntity> | Promise<PagamentoEntity[]>;
  atualizaPagamento(
    id: number,
    pagamento: PagamentoEntity
  ): Promise<{ success: boolean; message?: string }> | void;
  deletaPagamento(id: number): Promise<{ success: boolean; message?: string }> | void;
  buscaPagamentoPorCampoGenerico<Tipo extends keyof PagamentoEntity>(
    campo: Tipo,
    valor: PagamentoEntity[Tipo]
  ): Promise<PagamentoEntity[]> | PagamentoEntity[];
}
