import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { Container } from './infrastructure/di/container';
import { createAuthRoutes } from './infrastructure/routes/authRoutes';
import { appConfig } from './config/appConfig';
import { swaggerSpec } from './infrastructure/swagger/swagger.config';
import 'reflect-metadata';

async function bootstrap() {
  const app = express();

  // Middlewares de segurança
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requisições por IP
    message: 'Muitas requisições deste IP, tente novamente mais tarde.',
  });
  app.use('/api/', limiter);

  // Rate limiting mais restritivo para login e registro
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Muitas tentativas de autenticação, tente novamente mais tarde.',
  });
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
  app.use('/api/auth/password-reset/request', authLimiter);

  // Inicializar container de dependências
  const container = new Container();
  await container.initialize();

  // Swagger Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'MS Users API - Documentação',
  }));

  // Rotas
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/auth', createAuthRoutes(container.authController, container.tokenGenerator));

  // Tratamento de erros
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({
      error: 'Erro interno do servidor',
      ...(appConfig.nodeEnv === 'development' && { details: err.message }),
    });
  });

  // Iniciar servidor
  const port = appConfig.port;
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
    console.log(`📝 Ambiente: ${appConfig.nodeEnv}`);
    console.log(`🔐 Health check: http://localhost:${port}/health`);
    console.log(`🔑 Auth endpoints: http://localhost:${port}/api/auth`);
    console.log(`📚 Swagger Docs: http://localhost:${port}/api-docs`);
  });

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM recebido, encerrando servidor...');
    await container.shutdown();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT recebido, encerrando servidor...');
    await container.shutdown();
    process.exit(0);
  });
}

bootstrap().catch((error) => {
  console.error('Erro ao iniciar aplicação:', error);
  process.exit(1);
});

