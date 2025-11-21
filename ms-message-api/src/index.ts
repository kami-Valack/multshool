import { config } from './config/environment';
import { RabbitMQEventConsumer } from './infrastructure/events/RabbitMQEventConsumer';
import { PostmarkEmailRepository } from './infrastructure/repositories/PostmarkEmailRepository';
import { EmailTemplateService } from './infrastructure/services/EmailTemplateService';
import { SendEmailUseCase } from './application/use-cases/SendEmailUseCase';
import { ProcessEmailEventUseCase } from './application/use-cases/ProcessEmailEventUseCase';

class EmailServiceApplication {
  private eventConsumer: RabbitMQEventConsumer;
  private processEmailEventUseCase: ProcessEmailEventUseCase;

  constructor() {
    // Inicializa serviços de infraestrutura
    const emailTemplateService = new EmailTemplateService();
    const emailRepository = new PostmarkEmailRepository(
      config.postmark.apiToken,
      config.postmark.fromEmail,
      config.postmark.fromName
    );

    // Inicializa casos de uso
    const sendEmailUseCase = new SendEmailUseCase(
      emailRepository,
      emailTemplateService
    );
    this.processEmailEventUseCase = new ProcessEmailEventUseCase(
      sendEmailUseCase
    );

    // Inicializa consumidor de eventos
    this.eventConsumer = new RabbitMQEventConsumer(
      config.rabbitmq.url,
      config.rabbitmq.queue,
      config.rabbitmq.exchange
    );

    // Configura callback para processar mensagens
    this.eventConsumer.onMessage(async (message) => {
      await this.handleEmailEvent(message);
    });
  }

  async start(): Promise<void> {
    try {
      console.log('Iniciando serviço de email...');
      console.log(`Ambiente: ${config.app.nodeEnv}`);
      console.log(`RabbitMQ: ${config.rabbitmq.url}`);
      console.log(`Fila: ${config.rabbitmq.queue}`);

      await this.eventConsumer.start();
      console.log('Serviço de email iniciado com sucesso!');
    } catch (error) {
      console.error('Erro ao iniciar serviço:', error);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    try {
      console.log('Encerrando serviço de email...');
      await this.eventConsumer.stop();
      console.log('Serviço encerrado com sucesso');
    } catch (error) {
      console.error('Erro ao encerrar serviço:', error);
    }
  }

  private async handleEmailEvent(event: any): Promise<void> {
    try {
      await this.processEmailEventUseCase.execute(event);
    } catch (error) {
      console.error('Erro ao processar evento de email:', error);
      throw error;
    }
  }
}

// Inicializa a aplicação
const app = new EmailServiceApplication();

// Tratamento de sinais para encerramento graceful
process.on('SIGINT', async () => {
  console.log('\nRecebido SIGINT, encerrando...');
  await app.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nRecebido SIGTERM, encerrando...');
  await app.stop();
  process.exit(0);
});

// Inicia a aplicação
app.start().catch((error) => {
  console.error('Erro fatal ao iniciar aplicação:', error);
  process.exit(1);
});

