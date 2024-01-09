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
        return await this.pagamentoRepository.save(pagamento);
    }

    async listaPagamento(): Promise<Pagamento[]> {
        return await this.pagamentoRepository.find();
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
        } catch (error) {
            return {
                success: false,
                message: "Ocorreu um erro ao tentar atualizar o pagamento.",
            };
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
        } catch (error) {
            return {
                success: false,
                message: "Ocorreu um erro ao tentar excluir o pagamento.",
            };
        }
    }

    async buscaPagamentoPorCampoGenerico<Tipo extends keyof Pagamento>(
        campo: Tipo,
        valor: Pagamento[Tipo]
    ): Promise<Pagamento[]> {
        const pagamentos = await this.pagamentoRepository.find({
            where: { [campo]: valor },
        });
        return pagamentos;
    }
}
