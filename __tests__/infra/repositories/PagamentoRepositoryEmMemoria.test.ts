import PagamentoRepositoryEmMemoria from '../../../src/infra/repositories/PagamentoRepositoryEmMemoria'
import Pagamento from '../../../src/domain/entities/Pagamento'
import StatusEnum from '../../../src/domain/enums/StatusEnum'
import FormasPagamentoEnum from '../../../src/domain/enums/FormasPagamentoEnum'

describe('PagamentoRepositoryEmMemoria', () => {
  let repository: PagamentoRepositoryEmMemoria
  const pagamento = new Pagamento('pedido123', 100.0, StatusEnum.Pendente, FormasPagamentoEnum.MercadoPago)

  beforeEach(() => {
    repository = new PagamentoRepositoryEmMemoria()
  })

  it('deve criar um pagamento', async () => {
    const pagamentoCriado = await repository.criaPagamento(pagamento)

    expect(pagamentoCriado.id).toBeDefined()
    expect(pagamentoCriado.id).toBeGreaterThan(0)
  })

  it('deve listar os pagamentos', async () => {
    const pagamentos = await repository.listaPagamento()

    expect(Array.isArray(pagamentos)).toBe(true)
  })

  it('deve pegar um pagamento pelo id', async () => {
    const pagamentoCriado = await repository.criaPagamento(pagamento)

    const result = await repository.buscaPorId(pagamentoCriado.id)

    expect(result.success).toBe(true)
    expect(result.pagamento).toEqual(pagamentoCriado)
  })

  it('deve retornar um erro ao pegar um pagamento pelo id', async () => {
    const result = await repository.buscaPorId(2)

    expect(result.success).toBe(false)
    expect(result.message).toBe('Pagamento não encontrado')
  })

  it('deve atualizar um pagamento', async () => {
    const pagamentoCriado = await repository.criaPagamento(pagamento)

    const newData = new Pagamento('pedido123', 100.0, StatusEnum.Pago, FormasPagamentoEnum.MercadoPago)
    const result = await repository.atualizaPagamento(pagamentoCriado.id, newData)
    expect(result.success).toBe(true)
  })

  it('deve deletar um pagamento', async () => {
    const pagamentoCriado = await repository.criaPagamento(pagamento)

    const result = await repository.deletaPagamento(pagamentoCriado.id)

    expect(result.success).toBe(true)
  })

  it('deve listar os pagamento por um campo generico', async () => {
    const pagamentos = await repository.buscaPagamentoPorCampoGenerico('status', StatusEnum.Pago)

    expect(Array.isArray(pagamentos)).toBe(true)
  })
})
