import { Request, Response } from 'express'
import CriarPagamentoUseCase from '../../domain/useCases/CriarPagamentoUseCase'
import PagamentoDto from '../dtos/pagamento.dto'

export default class CriarPagamentoController {
  constructor(private readonly useCase: CriarPagamentoUseCase) {}

  async processar(req: Request, res: Response) {
    try {
      const pagamentoDto = req.body as PagamentoDto

      const pagamento = await this.useCase.executa(pagamentoDto)

      return res.status(201).json(pagamento)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}
