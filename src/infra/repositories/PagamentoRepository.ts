import { Repository } from "typeorm";
import InterfacePagamentoRepository from "../../domain/InterfacePagamentoRepository";
import PagamentoEntity from "../../domain/entities/PagamentoEntity";

export default class PagamentoRepository implements InterfacePagamentoRepository {
  private pagamentoRepository: Repository<PagamentoEntity>;

  constructor(
    pagamentoRepository: Repository<PagamentoEntity>,
  ) {
    this.pagamentoRepository = pagamentoRepository;
  }

  async criaPagamento(pagamento: PagamentoEntity): Promise<void> {
    await this.pagamentoRepository.save(pagamento);
  }
  async listaPagamento(): Promise<PagamentoEntity[]> {
    return await this.pagamentoRepository.find();
  }
  async atualizaPagamento(
    id: number,
    newData: PagamentoEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const pagamentoToUpdate = await this.pagamentoRepository.findOne({ where: { id } });

      if (!pagamentoToUpdate) {
        return { success: false, message: "Pagamento não encontrado" };
      }

      Object.assign(pagamentoToUpdate, newData);

      await this.pagamentoRepository.save(pagamentoToUpdate);

      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o pagamento.",
      };
    }
  }

  async deletaPagamento(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const pagamentoToRemove = await this.pagamentoRepository.findOne({ where: { id } });

      if (!pagamentoToRemove) {
        return { success: false, message: "Pagamento não encontrado" };
      }

      await this.pagamentoRepository.remove(pagamentoToRemove);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar excluir o pagamento.",
      };
    }
  }

  async buscaPagamentoPorCampoGenerico<Tipo extends keyof PagamentoEntity>(
    campo: Tipo,
    valor: PagamentoEntity[Tipo]
  ): Promise<PagamentoEntity[]> {
    const pagamentos = await this.pagamentoRepository.find({ where: { [campo]: valor } });
    return pagamentos;
  }
}
