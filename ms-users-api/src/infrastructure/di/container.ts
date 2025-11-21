import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IPasswordResetTokenRepository } from '../../domain/repositories/IPasswordResetTokenRepository';
import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';
import { IEmailVerificationTokenRepository } from '../../domain/repositories/IEmailVerificationTokenRepository';
import { IPasswordHasher } from '../../domain/services/IPasswordHasher';
import { ITokenGenerator } from '../../domain/services/ITokenGenerator';
import { IEmailService } from '../../domain/services/IEmailService';

import { InMemoryUserRepository } from '../repositories/InMemoryUserRepository';
import { InMemoryPasswordResetTokenRepository } from '../repositories/InMemoryPasswordResetTokenRepository';
import { InMemoryRefreshTokenRepository } from '../repositories/InMemoryRefreshTokenRepository';
import { InMemoryEmailVerificationTokenRepository } from '../repositories/InMemoryEmailVerificationTokenRepository';
import { PostgreSQLUserRepository } from '../repositories/PostgreSQLUserRepository';
import { PostgreSQLPasswordResetTokenRepository } from '../repositories/PostgreSQLPasswordResetTokenRepository';
import { PostgreSQLRefreshTokenRepository } from '../repositories/PostgreSQLRefreshTokenRepository';
import { PostgreSQLEmailVerificationTokenRepository } from '../repositories/PostgreSQLEmailVerificationTokenRepository';
import { AppDataSource } from '../database/data-source';
import { BcryptPasswordHasher } from '../services/BcryptPasswordHasher';
import { JwtTokenGenerator } from '../services/JwtTokenGenerator';
import { RabbitMQEmailService } from '../services/RabbitMQEmailService';
import { RabbitMQConnection } from '../messaging/RabbitMQConnection';

import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import { RefreshTokenUseCase } from '../../application/use-cases/RefreshTokenUseCase';
import { RequestPasswordResetUseCase } from '../../application/use-cases/RequestPasswordResetUseCase';
import { ResetPasswordUseCase } from '../../application/use-cases/ResetPasswordUseCase';
import { LogoutUseCase } from '../../application/use-cases/LogoutUseCase';
import { LogoutAllDevicesUseCase } from '../../application/use-cases/LogoutAllDevicesUseCase';
import { VerifyEmailUseCase } from '../../application/use-cases/VerifyEmailUseCase';
import { IUserEventService } from '../../domain/services/IUserEventService';
import { RabbitMQUserEventService } from '../services/RabbitMQUserEventService';

import { AuthController } from '../controllers/AuthController';
import { appConfig } from '../../config/appConfig';

export class Container {
  // Repositórios
  private _userRepository: IUserRepository;
  private _passwordResetTokenRepository: IPasswordResetTokenRepository;
  private _refreshTokenRepository: IRefreshTokenRepository;
  private _emailVerificationTokenRepository: IEmailVerificationTokenRepository;

  // Serviços
  private _passwordHasher: IPasswordHasher;
  private _tokenGenerator: ITokenGenerator;
  private _emailService: IEmailService;
  private _userEventService: IUserEventService;
  private _rabbitMQConnection: RabbitMQConnection;

  // Use Cases
  private _registerUserUseCase: RegisterUserUseCase;
  private _loginUseCase: LoginUseCase;
  private _refreshTokenUseCase: RefreshTokenUseCase;
  private _requestPasswordResetUseCase: RequestPasswordResetUseCase;
  private _resetPasswordUseCase: ResetPasswordUseCase;
  private _logoutUseCase: LogoutUseCase;
  private _logoutAllDevicesUseCase: LogoutAllDevicesUseCase;
  private _verifyEmailUseCase: VerifyEmailUseCase;

  // Controllers
  private _authController: AuthController;

  constructor() {
    // Inicializar repositórios
    // Usar PostgreSQL se DATABASE_URL estiver configurado, senão usar InMemory
    const useDatabase = !!appConfig.database.url;
    
    if (useDatabase) {
      this._userRepository = new PostgreSQLUserRepository();
      this._passwordResetTokenRepository = new PostgreSQLPasswordResetTokenRepository();
      this._refreshTokenRepository = new PostgreSQLRefreshTokenRepository();
      this._emailVerificationTokenRepository = new PostgreSQLEmailVerificationTokenRepository();
    } else {
      this._userRepository = new InMemoryUserRepository();
      this._passwordResetTokenRepository = new InMemoryPasswordResetTokenRepository();
      this._refreshTokenRepository = new InMemoryRefreshTokenRepository();
      this._emailVerificationTokenRepository = new InMemoryEmailVerificationTokenRepository();
    }

    // Inicializar serviços
    this._passwordHasher = new BcryptPasswordHasher();
    this._tokenGenerator = new JwtTokenGenerator(
      appConfig.jwt.secret,
      appConfig.jwt.accessTokenExpiration,
      appConfig.jwt.refreshTokenExpiration
    );

    // Inicializar RabbitMQ
    this._rabbitMQConnection = new RabbitMQConnection(
      appConfig.rabbitMQ.url,
      appConfig.rabbitMQ.exchange
    );
    this._emailService = new RabbitMQEmailService(
      this._rabbitMQConnection,
      appConfig.rabbitMQ.queue
    );

    // Inicializar use cases
    this._registerUserUseCase = new RegisterUserUseCase(
      this._userRepository,
      this._passwordHasher,
      this._emailService,
      this._emailVerificationTokenRepository,
      appConfig.frontendUrl
    );

    this._loginUseCase = new LoginUseCase(
      this._userRepository,
      this._passwordHasher,
      this._tokenGenerator,
      this._refreshTokenRepository
    );

    this._refreshTokenUseCase = new RefreshTokenUseCase(
      this._refreshTokenRepository,
      this._userRepository,
      this._tokenGenerator
    );

    this._requestPasswordResetUseCase = new RequestPasswordResetUseCase(
      this._userRepository,
      this._passwordResetTokenRepository,
      this._emailService,
      appConfig.frontendUrl
    );

    this._resetPasswordUseCase = new ResetPasswordUseCase(
      this._userRepository,
      this._passwordResetTokenRepository,
      this._passwordHasher,
      this._refreshTokenRepository
    );

    this._logoutUseCase = new LogoutUseCase(this._refreshTokenRepository);

    this._logoutAllDevicesUseCase = new LogoutAllDevicesUseCase(
      this._refreshTokenRepository
    );

    // Inicializar serviço de eventos de usuário
    this._userEventService = new RabbitMQUserEventService(
      this._rabbitMQConnection,
      appConfig.rabbitMQ.userEventsExchange,
      appConfig.rabbitMQ.userEventsQueue
    );

    this._verifyEmailUseCase = new VerifyEmailUseCase(
      this._userRepository,
      this._emailVerificationTokenRepository,
      this._userEventService
    );

    // Inicializar controllers
    this._authController = new AuthController(
      this._registerUserUseCase,
      this._loginUseCase,
      this._refreshTokenUseCase,
      this._requestPasswordResetUseCase,
      this._resetPasswordUseCase,
      this._logoutUseCase,
      this._logoutAllDevicesUseCase,
      this._verifyEmailUseCase
    );
  }

  get authController(): AuthController {
    return this._authController;
  }

  get tokenGenerator(): ITokenGenerator {
    return this._tokenGenerator;
  }

  async initialize(): Promise<void> {
    // Conectar ao banco de dados se configurado
    if (appConfig.database.url) {
      try {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
          console.log('Conectado ao PostgreSQL com sucesso');
        }
      } catch (error) {
        console.error('Erro ao conectar ao PostgreSQL:', error);
        throw error;
      }
    }
    
    // Conectar ao RabbitMQ
    await this._rabbitMQConnection.connect();
  }

  async shutdown(): Promise<void> {
    // Fechar conexão RabbitMQ
    await this._rabbitMQConnection.close();
    
    // Fechar conexão com banco de dados
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Conexão com PostgreSQL fechada');
    }
  }
}

