import { Repository } from 'typeorm';
import { IPasswordResetTokenRepository } from '../../domain/repositories/IPasswordResetTokenRepository';
import { PasswordResetToken } from '../../domain/entities/PasswordResetToken';
import { PasswordResetTokenEntity } from '../database/entities/PasswordResetTokenEntity';
import { AppDataSource } from '../database/data-source';

export class PostgreSQLPasswordResetTokenRepository implements IPasswordResetTokenRepository {
  private getRepository(): Repository<PasswordResetTokenEntity> {
    return AppDataSource.getRepository(PasswordResetTokenEntity);
  }

  async save(token: PasswordResetToken): Promise<void> {
    const entity = PasswordResetTokenEntity.fromDomain(token);
    await this.getRepository().save(entity);
  }

  async findByToken(token: string): Promise<PasswordResetToken | null> {
    const entity = await this.getRepository().findOne({
      where: { token },
    });

    return entity ? entity.toDomain() : null;
  }

  async findByUserId(userId: string): Promise<PasswordResetToken[]> {
    const entities = await this.getRepository().find({
      where: { userId },
    });

    return entities.map((e: PasswordResetTokenEntity) => e.toDomain());
  }

  async invalidateUserTokens(userId: string): Promise<void> {
    await this.getRepository().update(
      { userId, used: false },
      { used: true }
    );
  }

  async delete(token: PasswordResetToken): Promise<void> {
    await this.getRepository().delete(token.id);
  }
}

