import Pagamento from '../../../src/domain/entities/Pagamento'
import FormasPagamentoEnum from '../../../src/domain/enums/FormasPagamentoEnum'
import StatusEnum from '../../../src/domain/enums/StatusEnum'

describe('Pagamento', () => {
  it('deve criar uma instância de Pagamento', () => {
    const pagamento = new Pagamento('pedido123', 100.0, StatusEnum.Pendente, FormasPagamentoEnum.MercadoPago)

    expect(pagamento).toBeDefined()
    expect(pagamento.pedidoId).toBe('pedido123')
    expect(pagamento.valor).toBe(100.0)
    expect(pagamento.status).toBe(StatusEnum.Pendente)
    expect(pagamento.formaPagamento).toBe(FormasPagamentoEnum.MercadoPago)
    expect(pagamento.integrationId).toBeUndefined()
    expect(pagamento.qrCode).toBeUndefined()
  })

  it('deve definir IntegrationId corretamente', () => {
    const pagamento = new Pagamento('pedido123', 100.0, StatusEnum.Pendente, FormasPagamentoEnum.MercadoPago)

    pagamento.setIntegrationId('3cf9a110-0719-4ef8-93f4-57564ca7b50a')

    expect(pagamento.integrationId).toBe('3cf9a110-0719-4ef8-93f4-57564ca7b50a')
  })

  it('deve definir QrCode corretamente', () => {
    const pagamento = new Pagamento('pedido123', 100.0, StatusEnum.Pendente, FormasPagamentoEnum.MercadoPago)

    pagamento.setQrCode('00020101021243650016COM.MERCADOLIBRE0201306363cf9a110-0719-4ef8-93f4-57564ca7b50a5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304C41D')
      

    expect(pagamento.qrCode).toBe(
      '00020101021243650016COM.MERCADOLIBRE0201306363cf9a110-0719-4ef8-93f4-57564ca7b50a5204000053039865802BR5909Test Test6009SAO PAULO62070503***6304C41D',
    )
  })
})
