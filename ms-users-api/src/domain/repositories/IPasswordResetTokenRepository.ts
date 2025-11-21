import { PasswordResetToken } from '../entities/PasswordResetToken';

export interface IPasswordResetTokenRepository {
  save(token: PasswordResetToken): Promise<void>;
  findByToken(token: string): Promise<PasswordResetToken | null>;
  findByUserId(userId: string): Promise<PasswordResetToken[]>;
  invalidateUserTokens(userId: string): Promise<void>;
  delete(token: PasswordResetToken): Promise<void>;
}

