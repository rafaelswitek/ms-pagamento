import { Connection, Channel, connect, Message, Replies } from 'amqplib'
import QueueConnection from '../../domain/interfaces/QueueConnection'

export default class RabbitmqAdapter implements QueueConnection {
    private connection!: Connection
    private channel!: Channel
    private uri: string

    constructor(uri: string) {
        this.uri = uri
    }

    async start(): Promise<void> {
        this.connection = await connect(this.uri)
        this.channel = await this.connection.createChannel()
    }

    async publishInQueue(queue: string, message: string): Promise<boolean> {
        return this.channel.sendToQueue(queue, Buffer.from(message))
    }

    async publishInExchange(exchange: string, routingKey: string, message: string): Promise<boolean> {
        return this.channel.publish(exchange, routingKey, Buffer.from(message))
    }

    async consume(queue: string, callback: (message: Message) => void): Promise<Replies.Consume> {
        return this.channel.consume(queue, (message) => {
            if (message !== null) {
                callback(message)
                this.channel.ack(message)
            }
        })
    }
}
