import { Repository } from 'typeorm';
import { IEmailVerificationTokenRepository } from '../../domain/repositories/IEmailVerificationTokenRepository';
import { EmailVerificationToken } from '../../domain/entities/EmailVerificationToken';
import { EmailVerificationTokenEntity } from '../database/entities/EmailVerificationTokenEntity';
import { AppDataSource } from '../database/data-source';

export class PostgreSQLEmailVerificationTokenRepository implements IEmailVerificationTokenRepository {
  private getRepository(): Repository<EmailVerificationTokenEntity> {
    return AppDataSource.getRepository(EmailVerificationTokenEntity);
  }

  async save(token: EmailVerificationToken): Promise<void> {
    const entity = EmailVerificationTokenEntity.fromDomain(token);
    await this.getRepository().save(entity);
  }

  async findByToken(token: string): Promise<EmailVerificationToken | null> {
    const entity = await this.getRepository().findOne({
      where: { token },
    });

    return entity ? entity.toDomain() : null;
  }

  async findByUserId(userId: string): Promise<EmailVerificationToken[]> {
    const entities = await this.getRepository().find({
      where: { userId },
    });

    return entities.map((e: EmailVerificationTokenEntity) => e.toDomain());
  }

  async invalidateUserTokens(userId: string): Promise<void> {
    await this.getRepository().update(
      { userId, used: false },
      { used: true }
    );
  }

  async delete(token: EmailVerificationToken): Promise<void> {
    await this.getRepository().delete(token.id);
  }
}

