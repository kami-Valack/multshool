import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';

export class LogoutUseCase {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute(refreshToken: string): Promise<void> {
    const tokenEntity = await this.refreshTokenRepository.findByToken(refreshToken);
    if (tokenEntity) {
      tokenEntity.revoke();
      await this.refreshTokenRepository.revokeToken(tokenEntity);
    }
  }
}

