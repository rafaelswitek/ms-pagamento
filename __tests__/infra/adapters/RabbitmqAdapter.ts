import { Message, Replies } from "amqplib";
import QueueConnection from "../../../src/domain/interfaces/QueueConnection";

export default class RabbitmqAdapter implements QueueConnection {
  async start(): Promise<void> {
    console.log("Simulating start method");
  }

  async publishInQueue(queue: string, message: string): Promise<boolean> {
    console.log(`Simulating publishing message "${message}" in queue "${queue}"`);
    return true;
  }

  async publishInExchange(exchange: string, routingKey: string, message: string): Promise<boolean> {
    // Simular o método publishInExchange
    console.log(`Simulating publishing message "${message}" in exchange "${exchange}" with routing key "${routingKey}"`);
    return true;
  }

  async consume(queue: string, callback: (message: Message) => void): Promise<Replies.Consume> {
    // Simular o método consume
    console.log(`Simulating consuming messages from queue "${queue}"`);
    return {} as Replies.Consume;
  }
}
