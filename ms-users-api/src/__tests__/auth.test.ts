import { RegisterUserUseCase } from '../application/use-cases/RegisterUserUseCase';
import { LoginUseCase } from '../application/use-cases/LoginUseCase';
import { RefreshTokenUseCase } from '../application/use-cases/RefreshTokenUseCase';
import { RequestPasswordResetUseCase } from '../application/use-cases/RequestPasswordResetUseCase';
import { ResetPasswordUseCase } from '../application/use-cases/ResetPasswordUseCase';
import { LogoutUseCase } from '../application/use-cases/LogoutUseCase';
import { LogoutAllDevicesUseCase } from '../application/use-cases/LogoutAllDevicesUseCase';

import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IPasswordResetTokenRepository } from '../domain/repositories/IPasswordResetTokenRepository';
import { IRefreshTokenRepository } from '../domain/repositories/IRefreshTokenRepository';
import { IEmailVerificationTokenRepository } from '../domain/repositories/IEmailVerificationTokenRepository';
import { IPasswordHasher } from '../domain/services/IPasswordHasher';
import { ITokenGenerator } from '../domain/services/ITokenGenerator';
import { IEmailService } from '../domain/services/IEmailService';

import { User } from '../domain/entities/User';
import { PasswordResetToken } from '../domain/entities/PasswordResetToken';
import { RefreshToken } from '../domain/entities/RefreshToken';
import { EmailVerificationToken } from '../domain/entities/EmailVerificationToken';
import { TokenPair } from '../domain/value-objects/TokenPair';

// Mocks
class MockUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase().trim();
    for (const user of this.users.values()) {
      if (user.email === normalizedEmail) {
        return user;
      }
    }
    return null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async update(user: User): Promise<void> {
    if (!this.users.has(user.id)) {
      throw new Error('Usuário não encontrado');
    }
    this.users.set(user.id, user);
  }
}

class MockPasswordResetTokenRepository implements IPasswordResetTokenRepository {
  private tokens: Map<string, PasswordResetToken> = new Map();

  async save(token: PasswordResetToken): Promise<void> {
    this.tokens.set(token.id, token);
  }

  async findByToken(token: string): Promise<PasswordResetToken | null> {
    for (const tokenEntity of this.tokens.values()) {
      if (tokenEntity.token === token) {
        return tokenEntity;
      }
    }
    return null;
  }

  async findByUserId(userId: string): Promise<PasswordResetToken[]> {
    const userTokens: PasswordResetToken[] = [];
    for (const token of this.tokens.values()) {
      if (token.userId === userId) {
        userTokens.push(token);
      }
    }
    return userTokens;
  }

  async invalidateUserTokens(userId: string): Promise<void> {
    const userTokens = await this.findByUserId(userId);
    for (const token of userTokens) {
      token.markAsUsed();
      await this.save(token);
    }
  }

  async delete(token: PasswordResetToken): Promise<void> {
    this.tokens.delete(token.id);
  }
}

class MockRefreshTokenRepository implements IRefreshTokenRepository {
  private tokens: Map<string, RefreshToken> = new Map();

  async save(token: RefreshToken): Promise<void> {
    this.tokens.set(token.id, token);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    for (const tokenEntity of this.tokens.values()) {
      if (tokenEntity.token === token) {
        return tokenEntity;
      }
    }
    return null;
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    const userTokens: RefreshToken[] = [];
    for (const token of this.tokens.values()) {
      if (token.userId === userId) {
        userTokens.push(token);
      }
    }
    return userTokens;
  }

  async revokeToken(token: RefreshToken): Promise<void> {
    token.revoke();
    await this.save(token);
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    const userTokens = await this.findByUserId(userId);
    for (const token of userTokens) {
      token.revoke();
      await this.save(token);
    }
  }

  async delete(token: RefreshToken): Promise<void> {
    this.tokens.delete(token.id);
  }
}

class MockEmailVerificationTokenRepository implements IEmailVerificationTokenRepository {
  private tokens: Map<string, EmailVerificationToken> = new Map();

  async save(token: EmailVerificationToken): Promise<void> {
    this.tokens.set(token.id, token);
  }

  async findByToken(token: string): Promise<EmailVerificationToken | null> {
    for (const tokenEntity of this.tokens.values()) {
      if (tokenEntity.token === token) {
        return tokenEntity;
      }
    }
    return null;
  }

  async findByUserId(userId: string): Promise<EmailVerificationToken[]> {
    const userTokens: EmailVerificationToken[] = [];
    for (const token of this.tokens.values()) {
      if (token.userId === userId) {
        userTokens.push(token);
      }
    }
    return userTokens;
  }

  async invalidateUserTokens(userId: string): Promise<void> {
    const userTokens = await this.findByUserId(userId);
    for (const token of userTokens) {
      token.markAsUsed();
      await this.save(token);
    }
  }

  async delete(token: EmailVerificationToken): Promise<void> {
    this.tokens.delete(token.id);
  }
}

class MockPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return `hashed_${password}`;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return hash === `hashed_${password}`;
  }
}

class MockTokenGenerator implements ITokenGenerator {
  private tokenCounter = 0;

  generateAccessToken(userId: string, email: string): string {
    this.tokenCounter++;
    return `access_token_${userId}_${this.tokenCounter}`;
  }

  generateRefreshToken(): string {
    return 'a'.repeat(128); // 128 caracteres hex
  }

  generateTokenPair(userId: string, email: string): TokenPair {
    return new TokenPair(
      this.generateAccessToken(userId, email),
      this.generateRefreshToken(),
      900
    );
  }

  verifyAccessToken(token: string): { userId: string; email: string } | null {
    if (token.startsWith('access_token_')) {
      const parts = token.split('_');
      return {
        userId: parts[2],
        email: 'test@example.com',
      };
    }
    return null;
  }

  verifyRefreshToken(token: string): boolean {
    return typeof token === 'string' && token.length === 128;
  }
}

class MockEmailService implements IEmailService {
  public sentEmails: Array<{ type: string; email: string; data: any }> = [];

  async sendPasswordResetEmail(
    email: string,
    name: string,
    resetToken: string,
    resetUrl: string
  ): Promise<void> {
    this.sentEmails.push({
      type: 'password-reset',
      email,
      data: { name, resetToken, resetUrl },
    });
  }

  async sendVerificationEmail(
    email: string,
    name: string,
    verificationToken: string,
    verificationUrl: string
  ): Promise<void> {
    this.sentEmails.push({
      type: 'verification',
      email,
      data: { name, verificationToken, verificationUrl },
    });
  }
}

describe('API de Autenticação - Testes Completos', () => {
  let userRepository: MockUserRepository;
  let passwordResetTokenRepository: MockPasswordResetTokenRepository;
  let refreshTokenRepository: MockRefreshTokenRepository;
  let emailVerificationTokenRepository: MockEmailVerificationTokenRepository;
  let passwordHasher: MockPasswordHasher;
  let tokenGenerator: MockTokenGenerator;
  let emailService: MockEmailService;

  let registerUseCase: RegisterUserUseCase;
  let loginUseCase: LoginUseCase;
  let refreshTokenUseCase: RefreshTokenUseCase;
  let requestPasswordResetUseCase: RequestPasswordResetUseCase;
  let resetPasswordUseCase: ResetPasswordUseCase;
  let logoutUseCase: LogoutUseCase;
  let logoutAllDevicesUseCase: LogoutAllDevicesUseCase;

  beforeEach(() => {
    // Resetar mocks
    userRepository = new MockUserRepository();
    passwordResetTokenRepository = new MockPasswordResetTokenRepository();
    refreshTokenRepository = new MockRefreshTokenRepository();
    emailVerificationTokenRepository = new MockEmailVerificationTokenRepository();
    passwordHasher = new MockPasswordHasher();
    tokenGenerator = new MockTokenGenerator();
    emailService = new MockEmailService();

    // Inicializar use cases
    registerUseCase = new RegisterUserUseCase(
      userRepository,
      passwordHasher,
      emailService,
      emailVerificationTokenRepository,
      'http://localhost:3001'
    );

    loginUseCase = new LoginUseCase(
      userRepository,
      passwordHasher,
      tokenGenerator,
      refreshTokenRepository
    );

    refreshTokenUseCase = new RefreshTokenUseCase(
      refreshTokenRepository,
      userRepository,
      tokenGenerator
    );

    requestPasswordResetUseCase = new RequestPasswordResetUseCase(
      userRepository,
      passwordResetTokenRepository,
      emailService,
      'http://localhost:3001'
    );

    resetPasswordUseCase = new ResetPasswordUseCase(
      userRepository,
      passwordResetTokenRepository,
      passwordHasher,
      refreshTokenRepository
    );

    logoutUseCase = new LogoutUseCase(refreshTokenRepository);

    logoutAllDevicesUseCase = new LogoutAllDevicesUseCase(refreshTokenRepository);
  });

  describe('Registro de Usuário', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const result = await registerUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        name: 'Test User',
      });

      expect(result).toHaveProperty('id');
      expect(result.email).toBe('test@example.com');
      expect(result.name).toBe('Test User');

      const user = await userRepository.findByEmail('test@example.com');
      expect(user).not.toBeNull();
      expect(user?.email).toBe('test@example.com');
    });

    it('não deve permitir registro com email duplicado', async () => {
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        name: 'Test User',
      });

      await expect(
        registerUseCase.execute({
          email: 'test@example.com',
          password: 'outraSenha123',
          name: 'Another User',
        })
      ).rejects.toThrow('Email já está em uso');
    });

    it('não deve permitir senha com menos de 8 caracteres', async () => {
      await expect(
        registerUseCase.execute({
          email: 'test@example.com',
          password: 'short',
          name: 'Test User',
        })
      ).rejects.toThrow('Senha deve ter no mínimo 8 caracteres');
    });
  });

  describe('Login', () => {
    beforeEach(async () => {
      // Criar usuário para testes de login
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        name: 'Test User',
      });
    });

    it('deve fazer login com credenciais válidas', async () => {
      const result = await loginUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
      });

      expect(result).toHaveProperty('tokens');
      expect(result.tokens).toHaveProperty('accessToken');
      expect(result.tokens).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@example.com');
    });

    it('não deve fazer login com senha incorreta', async () => {
      await expect(
        loginUseCase.execute({
          email: 'test@example.com',
          password: 'senhaErrada123',
        })
      ).rejects.toThrow('Credenciais inválidas');
    });

    it('não deve fazer login com email inexistente', async () => {
      await expect(
        loginUseCase.execute({
          email: 'inexistente@example.com',
          password: 'senhaSegura123',
        })
      ).rejects.toThrow('Credenciais inválidas');
    });

    it('deve salvar refresh token após login', async () => {
      const result = await loginUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
      });

      const refreshTokenEntity = await refreshTokenRepository.findByToken(
        result.tokens.refreshToken
      );

      expect(refreshTokenEntity).not.toBeNull();
      expect(refreshTokenEntity?.isValid()).toBe(true);
    });
  });

  describe('Refresh Token', () => {
    let refreshToken: string;
    let userId: string;

    beforeEach(async () => {
      // Criar usuário e fazer login
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        name: 'Test User',
      });

      const loginResult = await loginUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
      });

      refreshToken = loginResult.tokens.refreshToken;
      userId = loginResult.user.id;
    });

    it('deve renovar tokens com refresh token válido', async () => {
      const newTokens = await refreshTokenUseCase.execute(refreshToken);

      expect(newTokens).toHaveProperty('accessToken');
      expect(newTokens).toHaveProperty('refreshToken');
      expect(newTokens.accessToken).not.toBe(refreshToken);
    });

    it('não deve renovar com refresh token inválido', async () => {
      await expect(
        refreshTokenUseCase.execute('token_invalido')
      ).rejects.toThrow('Token inválido');
    });

    it('deve revogar token antigo ao renovar', async () => {
      const oldTokenEntity = await refreshTokenRepository.findByToken(refreshToken);
      expect(oldTokenEntity?.isValid()).toBe(true);

      await refreshTokenUseCase.execute(refreshToken);

      const revokedToken = await refreshTokenRepository.findByToken(refreshToken);
      expect(revokedToken?.isValid()).toBe(false);
    });
  });

  describe('Recuperação de Senha', () => {
    beforeEach(async () => {
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        name: 'Test User',
      });
    });

    it('deve solicitar recuperação de senha com sucesso', async () => {
      // Limpar emails anteriores (do registro)
      emailService.sentEmails = [];
      
      await requestPasswordResetUseCase.execute('test@example.com');

      const tokens = await passwordResetTokenRepository.findByUserId(
        (await userRepository.findByEmail('test@example.com'))!.id
      );

      expect(tokens.length).toBeGreaterThan(0);
      expect(emailService.sentEmails.length).toBe(1);
      expect(emailService.sentEmails[0].type).toBe('password-reset');
    });

    it('não deve revelar se email existe ou não', async () => {
      // Não deve lançar erro mesmo com email inexistente
      await expect(
        requestPasswordResetUseCase.execute('inexistente@example.com')
      ).resolves.not.toThrow();
    });

    it('deve invalidar tokens anteriores ao solicitar novo reset', async () => {
      await requestPasswordResetUseCase.execute('test@example.com');
      const userId = (await userRepository.findByEmail('test@example.com'))!.id;
      const firstTokens = await passwordResetTokenRepository.findByUserId(userId);

      await requestPasswordResetUseCase.execute('test@example.com');
      const secondTokens = await passwordResetTokenRepository.findByUserId(userId);

      // Todos os tokens anteriores devem estar marcados como usados
      const validTokens = secondTokens.filter((t) => t.isValid());
      expect(validTokens.length).toBe(1); // Apenas o novo token deve ser válido
    });
  });

  describe('Reset de Senha', () => {
    let resetToken: string;
    let userId: string;

    beforeEach(async () => {
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        name: 'Test User',
      });

      userId = (await userRepository.findByEmail('test@example.com'))!.id;
      await requestPasswordResetUseCase.execute('test@example.com');

      const tokens = await passwordResetTokenRepository.findByUserId(userId);
      resetToken = tokens.find((t) => t.isValid())!.token;
    });

    it('deve resetar senha com token válido', async () => {
      await resetPasswordUseCase.execute({
        token: resetToken,
        newPassword: 'novaSenhaSegura123',
      });

      // Verificar se consegue fazer login com nova senha
      const loginResult = await loginUseCase.execute({
        email: 'test@example.com',
        password: 'novaSenhaSegura123',
      });

      expect(loginResult.user.email).toBe('test@example.com');
    });

    it('não deve resetar senha com token inválido', async () => {
      await expect(
        resetPasswordUseCase.execute({
          token: 'token_invalido',
          newPassword: 'novaSenhaSegura123',
        })
      ).rejects.toThrow('Token inválido');
    });

    it('não deve permitir senha com menos de 8 caracteres', async () => {
      await expect(
        resetPasswordUseCase.execute({
          token: resetToken,
          newPassword: 'short',
        })
      ).rejects.toThrow('Senha deve ter no mínimo 8 caracteres');
    });

    it('deve marcar token como usado após reset', async () => {
      await resetPasswordUseCase.execute({
        token: resetToken,
        newPassword: 'novaSenhaSegura123',
      });

      const tokenEntity = await passwordResetTokenRepository.findByToken(resetToken);
      expect(tokenEntity?.isValid()).toBe(false);
    });

    it('deve revogar todos os refresh tokens após reset', async () => {
      // Fazer login para criar refresh tokens
      const loginResult = await loginUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
      });

      const refreshTokensBefore = await refreshTokenRepository.findByUserId(userId);
      expect(refreshTokensBefore.length).toBeGreaterThan(0);

      await resetPasswordUseCase.execute({
        token: resetToken,
        newPassword: 'novaSenhaSegura123',
      });

      const refreshTokensAfter = await refreshTokenRepository.findByUserId(userId);
      const validTokens = refreshTokensAfter.filter((t) => t.isValid());
      expect(validTokens.length).toBe(0);
    });
  });

  describe('Logout', () => {
    let refreshToken: string;

    beforeEach(async () => {
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        name: 'Test User',
      });

      const loginResult = await loginUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
      });

      refreshToken = loginResult.tokens.refreshToken;
    });

    it('deve fazer logout revogando refresh token', async () => {
      const tokenEntity = await refreshTokenRepository.findByToken(refreshToken);
      expect(tokenEntity?.isValid()).toBe(true);

      await logoutUseCase.execute(refreshToken);

      const revokedToken = await refreshTokenRepository.findByToken(refreshToken);
      expect(revokedToken?.isValid()).toBe(false);
    });
  });

  describe('Logout de Todos os Dispositivos', () => {
    let userId: string;

    beforeEach(async () => {
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        name: 'Test User',
      });

      userId = (await userRepository.findByEmail('test@example.com'))!.id;

      // Criar múltiplos refresh tokens (simulando múltiplos dispositivos)
      await loginUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        deviceInfo: 'Device 1',
      });

      await loginUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        deviceInfo: 'Device 2',
      });
    });

    it('deve revogar todos os refresh tokens do usuário', async () => {
      const tokensBefore = await refreshTokenRepository.findByUserId(userId);
      const validTokensBefore = tokensBefore.filter((t) => t.isValid());
      expect(validTokensBefore.length).toBe(2);

      await logoutAllDevicesUseCase.execute(userId);

      const tokensAfter = await refreshTokenRepository.findByUserId(userId);
      const validTokensAfter = tokensAfter.filter((t) => t.isValid());
      expect(validTokensAfter.length).toBe(0);
    });
  });

  describe('Fluxo Completo', () => {
    it('deve completar fluxo completo: registro -> login -> refresh -> logout', async () => {
      // 1. Registro
      const registerResult = await registerUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        name: 'Test User',
      });

      expect(registerResult.email).toBe('test@example.com');

      // 2. Login
      const loginResult = await loginUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
      });

      expect(loginResult.tokens.accessToken).toBeDefined();
      expect(loginResult.tokens.refreshToken).toBeDefined();

      // 3. Refresh Token
      const refreshResult = await refreshTokenUseCase.execute(
        loginResult.tokens.refreshToken
      );

      expect(refreshResult.accessToken).toBeDefined();
      expect(refreshResult.refreshToken).toBeDefined();

      // 4. Logout
      await logoutUseCase.execute(refreshResult.refreshToken);

      const revokedToken = await refreshTokenRepository.findByToken(
        refreshResult.refreshToken
      );
      expect(revokedToken?.isValid()).toBe(false);
    });

    it('deve completar fluxo de recuperação de senha', async () => {
      // 1. Registro
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'senhaSegura123',
        name: 'Test User',
      });

      // 2. Solicitar recuperação
      await requestPasswordResetUseCase.execute('test@example.com');

      const userId = (await userRepository.findByEmail('test@example.com'))!.id;
      const tokens = await passwordResetTokenRepository.findByUserId(userId);
      const resetToken = tokens.find((t) => t.isValid())!.token;

      // 3. Resetar senha
      await resetPasswordUseCase.execute({
        token: resetToken,
        newPassword: 'novaSenhaSegura123',
      });

      // 4. Login com nova senha
      const loginResult = await loginUseCase.execute({
        email: 'test@example.com',
        password: 'novaSenhaSegura123',
      });

      expect(loginResult.user.email).toBe('test@example.com');
    });
  });
});

