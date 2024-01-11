import { Repository } from "typeorm";
import InterfacePagamentoRepository from "../../domain/InterfacePagamentoRepository";
import Pagamento from "../../domain/entities/Pagamento";

export default class PagamentoRepository
    implements InterfacePagamentoRepository
{
    private pagamentoRepository: Repository<Pagamento>;

    constructor(pagamentoRepository: Repository<Pagamento>) {
        this.pagamentoRepository = pagamentoRepository;
    }

    async criaPagamento(pagamento: Pagamento): Promise<Pagamento> {
        try {
            return await this.pagamentoRepository.save(pagamento);
        } catch (error: any) {
            throw new Error("Erro ao criar pagamento: " + error.message);
        }
    }

    async listaPagamento(): Promise<Pagamento[]> {
        try {
            return await this.pagamentoRepository.find();
        } catch (error: any) {
            throw new Error("Erro ao listar pagamentos: " + error.message);
        }
    }

    async atualizaPagamento(
        id: number,
        newData: Pagamento
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const pagamentoToUpdate = await this.pagamentoRepository.findOne({
                where: { id },
            });

            if (!pagamentoToUpdate) {
                return { success: false, message: "Pagamento não encontrado" };
            }

            Object.assign(pagamentoToUpdate, newData);
            await this.pagamentoRepository.save(pagamentoToUpdate);

            return { success: true };
        } catch (error: any) {
            throw new Error("Erro ao atualizar pagamento: " + error.message);
        }
    }

    async deletaPagamento(
        id: number
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const pagamentoToRemove = await this.pagamentoRepository.findOne({
                where: { id },
            });

            if (!pagamentoToRemove) {
                return { success: false, message: "Pagamento não encontrado" };
            }

            await this.pagamentoRepository.remove(pagamentoToRemove);
            return { success: true };
        } catch (error: any) {
            throw new Error("Erro ao deletar pagamento: " + error.message);
        }
    }

    async buscaPagamentoPorCampoGenerico<Tipo extends keyof Pagamento>(
        campo: Tipo,
        valor: Pagamento[Tipo]
    ): Promise<Pagamento[]> {
        try {
            const pagamentos = await this.pagamentoRepository.find({
                where: { [campo]: valor },
            });
            return pagamentos;
        } catch (error: any) {
            throw new Error(
                "Erro ao buscar pagamentos por campo genérico: " + error.message
            );
        }
    }
}
