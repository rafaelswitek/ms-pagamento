import { Request, Response } from 'express'
import WebhookUseCase from '../../domain/useCases/WebhookUseCase'
import InterfaceWebhook from '../../domain/interfaces/InterfaceWebhook'

export default class WebhookController {
  constructor(private readonly useCase: WebhookUseCase) {}

  async processar(req: Request, res: Response) {
    try {
      const payload = req.body as InterfaceWebhook

      await this.useCase.executa(payload)

      return res.sendStatus(200)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}
