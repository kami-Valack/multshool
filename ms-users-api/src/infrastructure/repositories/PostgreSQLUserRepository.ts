import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserEntity } from '../database/entities/UserEntity';
import { AppDataSource } from '../database/data-source';

export class PostgreSQLUserRepository implements IUserRepository {
  private getRepository(): Repository<UserEntity> {
    return AppDataSource.getRepository(UserEntity);
  }

  async save(user: User): Promise<void> {
    const entity = UserEntity.fromDomain(user);
    await this.getRepository().save(entity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase().trim();
    const entity = await this.getRepository().findOne({
      where: { email: normalizedEmail },
    });

    return entity ? entity.toDomain() : null;
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.getRepository().findOne({
      where: { id },
    });

    return entity ? entity.toDomain() : null;
  }

  async update(user: User): Promise<void> {
    const entity = UserEntity.fromDomain(user);
    await this.getRepository().save(entity);
  }
}

