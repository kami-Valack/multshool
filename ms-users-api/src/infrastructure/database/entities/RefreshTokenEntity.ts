import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RefreshToken } from '../../../domain/entities/RefreshToken';
import { UserEntity } from './UserEntity';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
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
  revoked!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ nullable: true })
  deviceInfo?: string;

  static fromDomain(token: RefreshToken): RefreshTokenEntity {
    const entity = new RefreshTokenEntity();
    entity.id = token.id;
    entity.userId = token.userId;
    entity.token = token.token;
    entity.expiresAt = token.expiresAt;
    entity.revoked = token.revoked;
    entity.createdAt = token.createdAt;
    entity.deviceInfo = token.deviceInfo;
    return entity;
  }

  toDomain(): RefreshToken {
    return RefreshToken.reconstitute(
      this.id,
      this.userId,
      this.token,
      this.expiresAt,
      this.revoked,
      this.createdAt,
      this.deviceInfo
    );
  }
}

