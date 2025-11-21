import { v4 as uuidv4 } from 'uuid';

export class RefreshToken {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly token: string,
    public readonly expiresAt: Date,
    public readonly revoked: boolean,
    public readonly createdAt: Date,
    public readonly deviceInfo?: string
  ) {}

  static create(
    userId: string,
    token: string,
    expiresInDays: number = 7,
    deviceInfo?: string
  ): RefreshToken {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    return new RefreshToken(
      uuidv4(),
      userId,
      token,
      expiresAt,
      false,
      new Date(),
      deviceInfo
    );
  }

  static reconstitute(
    id: string,
    userId: string,
    token: string,
    expiresAt: Date,
    revoked: boolean,
    createdAt: Date,
    deviceInfo?: string
  ): RefreshToken {
    return new RefreshToken(
      id,
      userId,
      token,
      expiresAt,
      revoked,
      createdAt,
      deviceInfo
    );
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  isValid(): boolean {
    return !this.revoked && !this.isExpired();
  }

  revoke(): void {
    (this as any).revoked = true;
  }
}

