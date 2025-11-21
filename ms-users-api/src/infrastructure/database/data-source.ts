import { DataSource } from 'typeorm';
import { UserEntity } from './entities/UserEntity';
import { PasswordResetTokenEntity } from './entities/PasswordResetTokenEntity';
import { RefreshTokenEntity } from './entities/RefreshTokenEntity';
import { EmailVerificationTokenEntity } from './entities/EmailVerificationTokenEntity';
import { appConfig } from '../../config/appConfig';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: appConfig.database.url,
  entities: [
    UserEntity,
    PasswordResetTokenEntity,
    RefreshTokenEntity,
    EmailVerificationTokenEntity,
  ],
  synchronize: true, // Apenas para desenvolvimento - usar migrations em produção
  logging: appConfig.nodeEnv === 'development',
  ssl: appConfig.database.url.includes('railway') || appConfig.database.url.includes('ssl') 
    ? { rejectUnauthorized: false } 
    : false,
});

