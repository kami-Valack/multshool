import { v4 as uuidv4 } from 'uuid';

export class User {
  private constructor(
    public readonly id: string,
    public readonly email: string,
    private _passwordHash: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly isActive: boolean = true,
    public readonly emailVerified: boolean = false,
    public readonly role: string = 'student'
  ) {}

  static create(
    email: string,
    passwordHash: string,
    name: string
  ): User {
    const now = new Date();
    return new User(
      uuidv4(),
      email.toLowerCase().trim(),
      passwordHash,
      name,
      now,
      now,
      true,
      false,
      'student' // Role padrão fixa - não pode ser alterada
    );
  }

  static reconstitute(
    id: string,
    email: string,
    passwordHash: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean,
    emailVerified: boolean,
    role?: string | null // Opcional para compatibilidade com dados antigos
  ): User {
    return new User(
      id,
      email,
      passwordHash,
      name,
      createdAt,
      updatedAt,
      isActive,
      emailVerified,
      role && role.trim() ? role.trim() : 'student' // Garante que sempre será 'student' se não fornecido ou vazio
    );
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  updatePassword(newPasswordHash: string): void {
    this._passwordHash = newPasswordHash;
    (this as any).updatedAt = new Date();
  }

  verifyEmail(): void {
    (this as any).emailVerified = true;
    (this as any).updatedAt = new Date();
  }

  deactivate(): void {
    (this as any).isActive = false;
    (this as any).updatedAt = new Date();
  }

  activate(): void {
    (this as any).isActive = true;
    (this as any).updatedAt = new Date();
  }
}

