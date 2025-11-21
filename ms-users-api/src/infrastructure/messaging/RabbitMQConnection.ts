import * as amqp from 'amqplib';

export class RabbitMQConnection {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  constructor(
    private readonly url: string,
    private readonly exchange: string
  ) {}

  async connect(): Promise<void> {
    if (this.connection && this.channel) {
      return;
    }

    try {
      const conn = await amqp.connect(this.url);
      this.connection = conn as unknown as amqp.Connection;
      this.channel = await (this.connection as any).createChannel();

      // Declara o exchange
      if (this.channel) {
        await this.channel.assertExchange(this.exchange, 'direct', {
          durable: true,
        });
      }

      console.log('Conectado ao RabbitMQ com sucesso');
    } catch (error) {
      console.error('Erro ao conectar ao RabbitMQ:', error);
      throw error;
    }
  }

  async bindQueue(queueName: string, routingKey: string): Promise<void> {
    if (!this.channel) {
      throw new Error('Canal RabbitMQ não está conectado');
    }

    // Declara a fila
    await this.channel.assertQueue(queueName, {
      durable: true,
    });

    // Vincula a fila ao exchange com o routing key
    await this.channel.bindQueue(queueName, this.exchange, routingKey);

    console.log(`Fila ${queueName} vinculada ao exchange ${this.exchange} com routing key ${routingKey}`);
  }

  getChannel(): amqp.Channel {
    if (!this.channel) {
      throw new Error('Canal RabbitMQ não está conectado');
    }
    return this.channel;
  }

  getExchange(): string {
    return this.exchange;
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }
    if (this.connection) {
      await (this.connection as any).close();
      this.connection = null;
    }
  }

  isConnected(): boolean {
    return this.connection !== null && this.channel !== null;
  }
}

