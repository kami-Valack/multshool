import { IEmailVerificationTokenRepository } from '../../domain/repositories/IEmailVerificationTokenRepository';
import { EmailVerificationToken } from '../../domain/entities/EmailVerificationToken';

export class InMemoryEmailVerificationTokenRepository implements IEmailVerificationTokenRepository {
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

