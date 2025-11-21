import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EmailVerificationToken } from '../../../domain/entities/EmailVerificationToken';
import { UserEntity } from './UserEntity';

@Entity('email_verification_tokens')
export class EmailVerificationTokenEntity {
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

  static fromDomain(token: EmailVerificationToken): EmailVerificationTokenEntity {
    const entity = new EmailVerificationTokenEntity();
    entity.id = token.id;
    entity.userId = token.userId;
    entity.token = token.token;
    entity.expiresAt = token.expiresAt;
    entity.used = token.used;
    entity.createdAt = token.createdAt;
    return entity;
  }

  toDomain(): EmailVerificationToken {
    return EmailVerificationToken.reconstitute(
      this.id,
      this.userId,
      this.token,
      this.expiresAt,
      this.used,
      this.createdAt
    );
  }
}

