import * as jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { ITokenGenerator } from '../../domain/services/ITokenGenerator';
import { TokenPair } from '../../domain/value-objects/TokenPair';

export class JwtTokenGenerator implements ITokenGenerator {
  constructor(
    private readonly secret: string,
    private readonly accessTokenExpiration: string = '15m',
    private readonly refreshTokenExpiration: string = '7d'
  ) {
    if (!secret) {
      throw new Error('JWT_SECRET não configurado');
    }
  }

  generateAccessToken(userId: string, email: string): string {
    const payload = {
      sub: userId,
      email,
      type: 'access',
    };

    return jwt.sign(payload, this.secret, {
      expiresIn: this.accessTokenExpiration,
      issuer: 'ms-users-api',
      audience: 'microservices',
    } as jwt.SignOptions);
  }

  generateRefreshToken(): string {
    // Refresh token é um token aleatório seguro, não JWT
    return randomBytes(64).toString('hex');
  }

  generateTokenPair(userId: string, email: string): TokenPair {
    const accessToken = this.generateAccessToken(userId, email);
    const refreshToken = this.generateRefreshToken();

    // Converter expiração para segundos
    const expiresIn = this.parseExpirationToSeconds(this.accessTokenExpiration);

    return new TokenPair(accessToken, refreshToken, expiresIn);
  }

  verifyAccessToken(token: string): { userId: string; email: string } | null {
    try {
      const decoded = jwt.verify(token, this.secret, {
        issuer: 'ms-users-api',
        audience: 'microservices',
      }) as any;

      if (decoded.type !== 'access') {
        return null;
      }

      return {
        userId: decoded.sub,
        email: decoded.email,
      };
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token: string): boolean {
    // Refresh token é apenas uma string aleatória, validação é feita no repositório
    return typeof token === 'string' && token.length === 128; // 64 bytes em hex = 128 caracteres
  }

  private parseExpirationToSeconds(expiration: string): number {
    const match = expiration.match(/^(\d+)([smhd])$/);
    if (!match) {
      return 900; // Default 15 minutos
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 3600;
      case 'd':
        return value * 86400;
      default:
        return 900;
    }
  }
}

