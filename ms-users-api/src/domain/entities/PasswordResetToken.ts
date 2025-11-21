import { v4 as uuidv4 } from 'uuid';

export class PasswordResetToken {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly token: string,
    public readonly expiresAt: Date,
    public readonly used: boolean,
    public readonly createdAt: Date
  ) {}

  static create(userId: string, token: string, expiresInMinutes: number = 30): PasswordResetToken {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

    return new PasswordResetToken(
      uuidv4(),
      userId,
      token,
      expiresAt,
      false,
      new Date()
    );
  }

  static reconstitute(
    id: string,
    userId: string,
    token: string,
    expiresAt: Date,
    used: boolean,
    createdAt: Date
  ): PasswordResetToken {
    return new PasswordResetToken(
      id,
      userId,
      token,
      expiresAt,
      used,
      createdAt
    );
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  isValid(): boolean {
    return !this.used && !this.isExpired();
  }

  markAsUsed(): void {
    (this as any).used = true;
  }
}

