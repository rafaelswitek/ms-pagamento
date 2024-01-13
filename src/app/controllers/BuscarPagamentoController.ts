import { Request, Response } from 'express'
import BuscarPagamentoUseCase from '../../domain/useCases/BuscarPagamentoUseCase'

export default class BuscarPagamentoController {
  constructor(private readonly useCase: BuscarPagamentoUseCase) {}

  async processar(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { success, message, pagamento } = await this.useCase.executa(Number(id))

      if (!success) {
        return res.status(404).json({ message })
      }

      return res.status(200).json(pagamento)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}
