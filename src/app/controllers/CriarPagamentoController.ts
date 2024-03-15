import { Request, Response } from 'express'
import CriarPagamentoUseCase from '../../domain/useCases/CriarPagamentoUseCase'
import PagamentoDto from '../dtos/pagamento.dto'
import RabbitmqAdapter from '../../infra/adapters/RabbitmqAdapter'

export default class CriarPagamentoController {
  constructor(
    private readonly useCase: CriarPagamentoUseCase,
    private readonly queue: RabbitmqAdapter,
  ) {
    this.subscribeToQueues()
  }

  async processar(req: Request, res: Response) {
    try {
      const pagamentoDto = req.body as PagamentoDto

      const pagamento = await this.useCase.executa(pagamentoDto)

      return res.status(201).json(pagamento)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  private async subscribeToQueues() {
    await this.queue.start()
    await this.queue.consume(process.env.QUEUE_1!, async (message) => {
      const pagamentoDto = JSON.parse(message.content.toString()) as PagamentoDto

      await this.useCase.executa(pagamentoDto)
    })
  }
}
