import { Request, Response } from 'express'
import CriarPagamentoUseCase from '../../domain/useCases/CriarPagamentoUseCase'
import PagamentoDto from '../dtos/pagamento.dto'
import RabbitmqServer from '../../infra/config/rabbitmq-server';

export default class CriarPagamentoController {
  constructor(private readonly useCase: CriarPagamentoUseCase) {
    this.subscribeToQueues();
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
    const server = new RabbitmqServer(process.env.QUEUE_URL!);
    await server.start();
    await server.consume(process.env.QUEUE_1!, async (message) => {
      console.log('lendo fila: ' + message.content.toString())
      const pagamentoDto = JSON.parse(message.content.toString()) as PagamentoDto;

      await this.useCase.executa(pagamentoDto)
    });
  }
}

