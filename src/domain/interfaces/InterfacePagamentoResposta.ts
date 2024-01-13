import Pagamento from '../entities/Pagamento'

export default interface InterfacePagamentoResposta {
  success: boolean
  message?: string
  pagamento?: Pagamento
}
