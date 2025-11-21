import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PasswordResetToken } from '../../../domain/entities/PasswordResetToken';
import { UserEntity } from './UserEntity';

@Entity('password_reset_tokens')
export class PasswordResetTokenEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('uuid')
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @Column({ unique: true })
  token!: string;

  @Column()
  expiresAt!: Date;

  @Column({ default: false })
  used!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  static fromDomain(token: PasswordResetToken): PasswordResetTokenEntity {
    const entity = new PasswordResetTokenEntity();
    entity.id = token.id;
    entity.userId = token.userId;
    entity.token = token.token;
    entity.expiresAt = token.expiresAt;
    entity.used = token.used;
    entity.createdAt = token.createdAt;
    return entity;
  }

  toDomain(): PasswordResetToken {
    return PasswordResetToken.reconstitute(
      this.id,
      this.userId,
      this.token,
      this.expiresAt,
      this.used,
      this.createdAt
    );
  }
}

