import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { ITokenGenerator } from '../../domain/services/ITokenGenerator';
import { TokenPair } from '../../domain/value-objects/TokenPair';
import { RefreshToken } from '../../domain/entities/RefreshToken';

export class RefreshTokenUseCase {
  constructor(
    private refreshTokenRepository: IRefreshTokenRepository,
    private userRepository: IUserRepository,
    private tokenGenerator: ITokenGenerator
  ) {}

  async execute(refreshToken: string, deviceInfo?: string): Promise<TokenPair> {
    // Verificar formato do token
    if (!this.tokenGenerator.verifyRefreshToken(refreshToken)) {
      throw new Error('Token inválido');
    }

    // Buscar refresh token no repositório
    const refreshTokenEntity = await this.refreshTokenRepository.findByToken(refreshToken);
    if (!refreshTokenEntity) {
      throw new Error('Token não encontrado');
    }

    // Verificar se é válido
    if (!refreshTokenEntity.isValid()) {
      throw new Error('Token expirado ou revogado');
    }

    // Buscar usuário
    const user = await this.userRepository.findById(refreshTokenEntity.userId);
    if (!user || !user.isActive) {
      throw new Error('Usuário não encontrado ou inativo');
    }

    // Revogar token antigo
    refreshTokenEntity.revoke();
    await this.refreshTokenRepository.revokeToken(refreshTokenEntity);

    // Gerar novos tokens
    const newTokenPair = this.tokenGenerator.generateTokenPair(user.id, user.email);

    // Salvar novo refresh token
    const newRefreshTokenEntity = RefreshToken.create(
      user.id,
      newTokenPair.refreshToken,
      7,
      deviceInfo
    );

    await this.refreshTokenRepository.save(newRefreshTokenEntity);

    return newTokenPair;
  }
}

