import { IEmailService } from '../../domain/services/IEmailService';
import { RabbitMQConnection } from '../messaging/RabbitMQConnection';
import { EmailType } from '../../domain/value-objects/EmailType';

interface EmailEvent {
  type: string;
  to: string;
  data: Record<string, any>;
  metadata?: Record<string, any>;
}

export class RabbitMQEmailService implements IEmailService {
  private queueInitialized = false;

  constructor(
    private readonly rabbitMQ: RabbitMQConnection,
    private readonly queue: string
  ) {}

  async sendPasswordResetEmail(
    email: string,
    name: string,
    resetToken: string,
    resetUrl: string
  ): Promise<void> {
    const event: EmailEvent = {
      type: EmailType.RECUPERACAO_SENHA,
      to: email,
      data: {
        nome: name,
        linkRecuperacao: resetUrl,
        tempoExpiracao: '30 minutos',
      },
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };

    await this.publishEvent(event);
  }

  async sendVerificationEmail(
    email: string,
    name: string,
    verificationToken: string,
    verificationUrl: string
  ): Promise<void> {
    const event: EmailEvent = {
      type: EmailType.VERIFICACAO_CONTA,
      to: email,
      data: {
        nome: name,
        linkVerificacao: verificationUrl,
        tempoExpiracao: '24 horas',
      },
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };

    await this.publishEvent(event);
  }

  private async publishEvent(event: EmailEvent): Promise<void> {
    if (!this.rabbitMQ.isConnected()) {
      await this.rabbitMQ.connect();
    }

    // Garantir que a fila está declarada e vinculada (apenas uma vez)
    if (!this.queueInitialized) {
      try {
        await this.rabbitMQ.bindQueue(this.queue, this.queue);
        this.queueInitialized = true;
      } catch (error) {
        console.error('Erro ao vincular fila:', error);
        throw error;
      }
    }

    const channel = this.rabbitMQ.getChannel();
    const message = JSON.stringify(event);

    // Usar o routing key igual ao nome da fila (como no exemplo)
    const published = channel.publish(
      this.rabbitMQ.getExchange(),
      this.queue, // routing key
      Buffer.from(message),
      { persistent: true }
    );

    if (!published) {
      throw new Error(`Falha ao publicar evento de email: ${event.type}`);
    }

    console.log(`✓ Evento de email publicado: ${event.type} para ${event.to}`);
  }
}

