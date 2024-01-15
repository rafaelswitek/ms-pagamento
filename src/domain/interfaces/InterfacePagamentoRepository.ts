import Pagamento from '../entities/Pagamento'
import InterfacePagamentoResposta from './InterfacePagamentoResposta'

export default interface InterfacePagamentoRepository {
  criaPagamento(pagamento: Pagamento): Promise<Pagamento>
  listaPagamento(): Array<Pagamento> | Promise<Pagamento[]>
  buscaPorId(id: number): Promise<InterfacePagamentoResposta>
  atualizaPagamento(id: number, pagamento: Pagamento): Promise<InterfacePagamentoResposta>
  deletaPagamento(id: number): Promise<InterfacePagamentoResposta>
}
