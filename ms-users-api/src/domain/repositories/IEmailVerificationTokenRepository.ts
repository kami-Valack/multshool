import { EmailVerificationToken } from '../entities/EmailVerificationToken';

export interface IEmailVerificationTokenRepository {
  save(token: EmailVerificationToken): Promise<void>;
  findByToken(token: string): Promise<EmailVerificationToken | null>;
  findByUserId(userId: string): Promise<EmailVerificationToken[]>;
  invalidateUserTokens(userId: string): Promise<void>;
  delete(token: EmailVerificationToken): Promise<void>;
}

