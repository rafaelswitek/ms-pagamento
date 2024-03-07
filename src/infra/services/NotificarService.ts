import PagamentoDto from '../../app/dtos/pagamento.dto'
import RabbitmqServer from '../config/rabbitmq-server';

class NotificarService {
  private readonly urls: string[]

  constructor() {
    this.urls = [process.env.URL_MS_PEDIDO!, process.env.URL_MS_PRODUCAO!]
  }

  async notificaOutrosMS(pagamentoDto: PagamentoDto): Promise<void> {
    const server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
    await server.start();
    for (const url of this.urls) {
      await server.publishInQueue(url, JSON.stringify(pagamentoDto));
    }
  }
}

export default NotificarService
