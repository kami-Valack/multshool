import { TokenPair } from '../value-objects/TokenPair';

export interface ITokenGenerator {
  generateAccessToken(userId: string, email: string): string;
  generateRefreshToken(): string;
  generateTokenPair(userId: string, email: string): TokenPair;
  verifyAccessToken(token: string): { userId: string; email: string } | null;
  verifyRefreshToken(token: string): boolean;
}

