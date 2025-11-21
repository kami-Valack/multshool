import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IPasswordHasher } from '../../domain/services/IPasswordHasher';
import { ITokenGenerator } from '../../domain/services/ITokenGenerator';
import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';
import { RefreshToken } from '../../domain/entities/RefreshToken';
import { TokenPair } from '../../domain/value-objects/TokenPair';

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private tokenGenerator: ITokenGenerator,
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(input: {
    email: string;
    password: string;
    deviceInfo?: string;
  }): Promise<{ tokens: TokenPair; user: { id: string; email: string; name: string; role: string } }> {
    // Buscar usuário
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar se está ativo
    if (!user.isActive) {
      throw new Error('Conta desativada');
    }

    // Verificar se o email foi verificado
    if (!user.emailVerified) {
      throw new Error('Email não verificado. Por favor, verifique seu email antes de fazer login.');
    }

    // Verificar senha
    const isPasswordValid = await this.passwordHasher.compare(
      input.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar tokens
    const tokenPair = this.tokenGenerator.generateTokenPair(user.id, user.email);

    // Salvar refresh token
    const refreshTokenEntity = RefreshToken.create(
      user.id,
      tokenPair.refreshToken,
      7, // 7 dias
      input.deviceInfo
    );

    await this.refreshTokenRepository.save(refreshTokenEntity);

    return {
      tokens: tokenPair,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}

