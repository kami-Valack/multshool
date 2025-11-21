import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../../domain/entities/User';

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  emailVerified!: boolean;

  @Column({ default: 'student' })
  role!: string;

  static fromDomain(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.passwordHash = user.passwordHash;
    entity.name = user.name;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    entity.isActive = user.isActive;
    entity.emailVerified = user.emailVerified;
    entity.role = user.role;
    return entity;
  }

  toDomain(): User {
    return User.reconstitute(
      this.id,
      this.email,
      this.passwordHash,
      this.name,
      this.createdAt,
      this.updatedAt,
      this.isActive,
      this.emailVerified,
      this.role || 'student' // Garante 'student' se null ou undefined
    );
  }
}

