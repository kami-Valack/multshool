import { Repository } from 'typeorm';
import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';
import { RefreshToken } from '../../domain/entities/RefreshToken';
import { RefreshTokenEntity } from '../database/entities/RefreshTokenEntity';
import { AppDataSource } from '../database/data-source';

export class PostgreSQLRefreshTokenRepository implements IRefreshTokenRepository {
  private getRepository(): Repository<RefreshTokenEntity> {
    return AppDataSource.getRepository(RefreshTokenEntity);
  }

  async save(token: RefreshToken): Promise<void> {
    const entity = RefreshTokenEntity.fromDomain(token);
    await this.getRepository().save(entity);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const entity = await this.getRepository().findOne({
      where: { token },
    });

    return entity ? entity.toDomain() : null;
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    const entities = await this.getRepository().find({
      where: { userId },
    });

    return entities.map((e: RefreshTokenEntity) => e.toDomain());
  }

  async revokeToken(token: RefreshToken): Promise<void> {
    await this.getRepository().update(
      { id: token.id },
      { revoked: true }
    );
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.getRepository().update(
      { userId, revoked: false },
      { revoked: true }
    );
  }

  async delete(token: RefreshToken): Promise<void> {
    await this.getRepository().delete(token.id);
  }
}

