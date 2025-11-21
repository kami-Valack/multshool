import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';
import { RefreshToken } from '../../domain/entities/RefreshToken';

export class InMemoryRefreshTokenRepository implements IRefreshTokenRepository {
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

