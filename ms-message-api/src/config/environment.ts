import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    queue: process.env.RABBITMQ_QUEUE || 'email_queue',
    exchange: process.env.RABBITMQ_EXCHANGE || 'email_exchange',
  },
  postmark: {
    apiToken: process.env.POSTMARK_API_TOKEN || '',
    fromEmail: process.env.POSTMARK_FROM_EMAIL || 'noreply@example.com',
    fromName: process.env.POSTMARK_FROM_NAME || 'MultiShol',
  },
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
  },
};

// Validação de variáveis obrigatórias
if (!config.postmark.apiToken) {
  console.warn('AVISO: POSTMARK_API_TOKEN não configurado. O envio de emails não funcionará.');
}

