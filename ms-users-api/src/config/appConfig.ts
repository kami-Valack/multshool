import * as dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || '',
    accessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '15m',
    refreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d',
  },
  rabbitMQ: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    exchange: process.env.RABBITMQ_EXCHANGE || 'email_exchange',
    queue: process.env.RABBITMQ_QUEUE || 'email_queue',
    userEventsExchange: process.env.RABBITMQ_USER_EVENTS_EXCHANGE || 'user_events',
    userEventsQueue: process.env.RABBITMQ_USER_EVENTS_QUEUE || 'user_replication_queue',
  },
  database: {
    url: process.env.DATABASE_URL || '',
    type: 'postgres' as const,
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
};

if (!appConfig.jwt.secret) {
  throw new Error('JWT_SECRET não configurado no arquivo .env');
}

