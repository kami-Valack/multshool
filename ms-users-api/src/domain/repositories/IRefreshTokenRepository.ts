import { RefreshToken } from '../entities/RefreshToken';

export interface IRefreshTokenRepository {
  save(token: RefreshToken): Promise<void>;
  findByToken(token: string): Promise<RefreshToken | null>;
  findByUserId(userId: string): Promise<RefreshToken[]>;
  revokeToken(token: RefreshToken): Promise<void>;
  revokeAllUserTokens(userId: string): Promise<void>;
  delete(token: RefreshToken): Promise<void>;
}

