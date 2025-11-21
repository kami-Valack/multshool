import { IUserEventService } from '../../domain/services/IUserEventService';
import { User } from '../../domain/entities/User';
import { RabbitMQConnection } from '../messaging/RabbitMQConnection';

export class RabbitMQUserEventService implements IUserEventService {
  private exchange: string;
  private queue: string;
  private routingKey: string = 'user.verified';
  private exchangeInitialized: boolean = false;
  private queueInitialized: boolean = false;

  constructor(
    private rabbitMQConnection: RabbitMQConnection,
    exchange: string = 'user_events',
    queue: string = 'user_replication_queue'
  ) {
    this.exchange = exchange;
    this.queue = queue;
  }

  async emitUserVerifiedEvent(user: User): Promise<void> {
    try {
      // Garantir conexão
      if (!this.rabbitMQConnection.isConnected()) {
        await this.rabbitMQConnection.connect();
      }

      const channel = this.rabbitMQConnection.getChannel();
      
      // Garantir que a exchange existe (apenas uma vez)
      if (!this.exchangeInitialized) {
        await channel.assertExchange(this.exchange, 'direct', {
          durable: true,
        });
        this.exchangeInitialized = true;
        console.log(`✓ Exchange '${this.exchange}' criada/verificada`);
      }

      // Garantir que a fila existe e está vinculada (apenas uma vez)
      if (!this.queueInitialized) {
        // Criar fila
        await channel.assertQueue(this.queue, {
          durable: true,
        });
        
        // Vincular fila ao exchange
        await channel.bindQueue(this.queue, this.exchange, this.routingKey);
        
        this.queueInitialized = true;
        console.log(`✓ Fila '${this.queue}' criada e vinculada ao exchange '${this.exchange}' (routing key: '${this.routingKey}')`);
      }

      const event = {
        type: 'user.verified',
        userId: user.id,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified,
          isActive: user.isActive,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
        metadata: {
          timestamp: new Date().toISOString(),
          source: 'ms-users-api',
          version: '1.0.0',
        },
      };

      const message = JSON.stringify(event);
      const buffer = Buffer.from(message);

      const published = channel.publish(
        this.exchange,
        this.routingKey,
        buffer,
        {
          persistent: true,
          contentType: 'application/json',
        }
      );

      if (!published) {
        throw new Error('Falha ao publicar evento de usuário verificado');
      }

      console.log(`✓ Evento de usuário verificado emitido: ${user.id} (${user.email})`);
    } catch (error) {
      console.error('Erro ao emitir evento de usuário verificado:', error);
      // Não lança erro para não quebrar o fluxo de verificação
      // O evento pode ser reenviado posteriormente se necessário
    }
  }
}

