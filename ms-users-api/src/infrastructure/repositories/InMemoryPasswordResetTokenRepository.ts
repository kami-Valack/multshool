import { IPasswordResetTokenRepository } from '../../domain/repositories/IPasswordResetTokenRepository';
import { PasswordResetToken } from '../../domain/entities/PasswordResetToken';

export class InMemoryPasswordResetTokenRepository implements IPasswordResetTokenRepository {
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

