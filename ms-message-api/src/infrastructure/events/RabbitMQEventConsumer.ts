import * as amqp from 'amqplib';
import { IEventConsumer } from '../../domain/services/IEventConsumer';

export class RabbitMQEventConsumer implements IEventConsumer {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private url: string;
  private queue: string;
  private exchange: string;
  private messageCallback: ((message: any) => Promise<void>) | null = null;

  constructor(url: string, queue: string, exchange: string) {
    this.url = url;
    this.queue = queue;
    this.exchange = exchange;
  }

  async start(): Promise<void> {
    try {
      // Conecta ao RabbitMQ
      const connection = await amqp.connect(this.url);
      this.connection = connection as any;
      if (!this.connection) {
        throw new Error('Falha ao conectar ao RabbitMQ');
      }
      this.channel = await (this.connection as any).createChannel();
      if (!this.channel) {
        throw new Error('Falha ao criar canal do RabbitMQ');
      }

      // Declara o exchange
      await this.channel.assertExchange(this.exchange, 'direct', {
        durable: true,
      });

      // Declara a fila
      await this.channel.assertQueue(this.queue, {
        durable: true,
      });

      // Faz o bind da fila com o exchange
      await this.channel.bindQueue(this.queue, this.exchange, this.queue);

      console.log(`Conectado ao RabbitMQ. Aguardando mensagens na fila: ${this.queue}`);

      // Configura o consumidor
      await this.channel.consume(
        this.queue,
        async (msg) => {
          if (msg) {
            try {
              const content = JSON.parse(msg.content.toString());
              console.log('Mensagem recebida:', content);

              if (this.messageCallback) {
                await this.messageCallback(content);
              }

              // Confirma o processamento
              this.channel?.ack(msg);
            } catch (error) {
              console.error('Erro ao processar mensagem:', error);
              // Rejeita a mensagem e não reenvia (pode ser configurado para DLQ)
              this.channel?.nack(msg, false, false);
            }
          }
        },
        {
          noAck: false, // Confirmação manual
        }
      );
    } catch (error) {
      console.error('Erro ao conectar ao RabbitMQ:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }
      if (this.connection) {
        await (this.connection as any).close();
        this.connection = null;
      }
      console.log('Conexão com RabbitMQ encerrada');
    } catch (error) {
      console.error('Erro ao encerrar conexão com RabbitMQ:', error);
      throw error;
    }
  }

  onMessage(callback: (message: any) => Promise<void>): void {
    this.messageCallback = callback;
  }
}

