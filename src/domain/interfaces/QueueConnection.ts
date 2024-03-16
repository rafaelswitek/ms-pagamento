import { Message, Replies } from "amqplib"

export default interface QueueConnection {
    start(): Promise<void>
    publishInQueue(queue: string, message: string): Promise<boolean>
    publishInExchange(exchange: string, routingKey: string, message: string): Promise<boolean>
    consume(queue: string, callback: (message: Message) => void): Promise<Replies.Consume>
  }
  