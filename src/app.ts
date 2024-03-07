import express from 'express'
import 'reflect-metadata'
import { AppDataSource } from './infra/config/dataSource'
import rotas from './app/rotas'
import RabbitmqServer from './infra/config/rabbitmq-server'
const app = express()
app.use(express.json())
rotas(app)

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado')
  })
  .catch((erro) => {
    console.log(erro)
  })

const consumer = async () => {
  const server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
  await server.start();
  await server.publishInQueue('express', 'teste envio');
  await server.consume('express', (message) => console.log('lendo fila: ' + message.content.toString()));
}

consumer();

export default app
