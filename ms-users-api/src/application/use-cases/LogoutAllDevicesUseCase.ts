import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';

export class LogoutAllDevicesUseCase {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute(userId: string): Promise<void> {
    await this.refreshTokenRepository.revokeAllUserTokens(userId);
  }
}

