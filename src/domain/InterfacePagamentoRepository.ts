import Pagamento from './entities/Pagamento'

export default interface InterfacePagamentoRepository {
  criaPagamento(pagamento: Pagamento): Promise<Pagamento>
  listaPagamento(): Array<Pagamento> | Promise<Pagamento[]>
  buscaPorId(id: number): Promise<{ success: boolean; message?: string; pagamento?: Pagamento }>
  atualizaPagamento(id: number, pagamento: Pagamento): Promise<{ success: boolean; message?: string }>
  deletaPagamento(id: number): Promise<{ success: boolean; message?: string }>
  buscaPagamentoPorCampoGenerico<Tipo extends keyof Pagamento>(
    campo: Tipo,
    valor: Pagamento[Tipo],
  ): Promise<Pagamento[]> | Pagamento[]
}
