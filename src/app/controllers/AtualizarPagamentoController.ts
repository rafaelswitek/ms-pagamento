import { Request, Response } from 'express'
import AtualizarPagamentoUseCase from '../../domain/useCases/AtualizarPagamentoUseCase'
import PagamentoDto from '../dtos/pagamento.dto'

export default class AtualizarPagamentoController {
  constructor(private readonly useCase: AtualizarPagamentoUseCase) {}

  async processar(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { success, message } = await this.useCase.executa(Number(id), req.body as PagamentoDto)

      if (!success) {
        return res.status(404).json({ message })
      }
      return res.sendStatus(204)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}
