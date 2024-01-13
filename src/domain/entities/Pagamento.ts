import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import FormasPagamentoEnum from '../enums/FormasPagamentoEnum'
import StatusEnum from '../enums/StatusEnum'

@Entity()
export default class Pagamento {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  pedidoId: string
  @Column()
  valor: number
  @Column()
  status: StatusEnum
  @Column()
  formaPagamento: FormasPagamentoEnum
  @Column({ nullable: true })
  valorPago?: number
  @Column({ nullable: true })
  dataPagamento?: Date
  @Column({ nullable: true })
  integrationId?: string
  @Column({ nullable: true })
  qrCode?: string

  constructor(
    pedidoId: string,
    valor: number,
    status: StatusEnum,
    formaPagamento: FormasPagamentoEnum,
    valorPago?: number,
    dataPagamento?: Date,
  ) {
    this.pedidoId = pedidoId
    this.valor = valor
    this.status = status
    this.formaPagamento = formaPagamento
    this.valorPago = valorPago
    this.dataPagamento = dataPagamento
  }

  set setIntegrationId(valor: string) {
    this.integrationId = valor
  }

  set setQrCode(valor: string) {
    this.qrCode = valor
  }
}
