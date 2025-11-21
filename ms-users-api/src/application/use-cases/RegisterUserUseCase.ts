import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IPasswordHasher } from '../../domain/services/IPasswordHasher';
import { IEmailService } from '../../domain/services/IEmailService';
import { IEmailVerificationTokenRepository } from '../../domain/repositories/IEmailVerificationTokenRepository';
import { EmailVerificationToken } from '../../domain/entities/EmailVerificationToken';
import { randomBytes } from 'crypto';

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private emailService: IEmailService,
    private emailVerificationTokenRepository: IEmailVerificationTokenRepository,
    private frontendUrl: string
  ) {}

  async execute(input: {
    email: string;
    password: string;
    name: string;
  }): Promise<{ id: string; email: string; name: string; role: string }> {
    // Validar email único
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Validar senha
    if (input.password.length < 8) {
      throw new Error('Senha deve ter no mínimo 8 caracteres');
    }

    // Hash da senha
    const passwordHash = await this.passwordHasher.hash(input.password);

    // Criar usuário
    const user = User.create(input.email, passwordHash, input.name);

    // Salvar
    await this.userRepository.save(user);

    // Gerar token de verificação
    const verificationToken = randomBytes(32).toString('hex');
    const emailVerificationToken = EmailVerificationToken.create(user.id, verificationToken, 24);
    await this.emailVerificationTokenRepository.save(emailVerificationToken);

    // Construir URL de verificação
    const verificationUrl = `${this.frontendUrl}/verify-email?token=${verificationToken}`;

    // Enviar email de verificação
    try {
      await this.emailService.sendVerificationEmail(user.email, user.name, verificationToken, verificationUrl);
    } catch (error) {
      // Se falhar o email, deletar o token
      await this.emailVerificationTokenRepository.delete(emailVerificationToken);
      console.error('Erro ao enviar email de verificação:', error);
      // Não falha o registro, mas loga o erro
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}

