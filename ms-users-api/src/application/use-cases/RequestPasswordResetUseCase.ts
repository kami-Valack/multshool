import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IPasswordResetTokenRepository } from '../../domain/repositories/IPasswordResetTokenRepository';
import { PasswordResetToken } from '../../domain/entities/PasswordResetToken';
import { IEmailService } from '../../domain/services/IEmailService';
import { randomBytes } from 'crypto';

export class RequestPasswordResetUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordResetTokenRepository: IPasswordResetTokenRepository,
    private emailService: IEmailService,
    private frontendUrl: string
  ) {}

  async execute(email: string): Promise<void> {
    // Buscar usuário
    const user = await this.userRepository.findByEmail(email);
    
    // Por segurança, não revelamos se o email existe ou não
    if (!user || !user.isActive) {
      // Simular delay para evitar timing attacks
      await new Promise(resolve => setTimeout(resolve, 100));
      return;
    }

    // Invalidar tokens anteriores
    await this.passwordResetTokenRepository.invalidateUserTokens(user.id);

    // Gerar token seguro
    const resetToken = randomBytes(32).toString('hex');

    // Criar entidade
    const passwordResetToken = PasswordResetToken.create(user.id, resetToken, 30);

    // Salvar
    await this.passwordResetTokenRepository.save(passwordResetToken);

    // Construir URL de reset
    const resetUrl = `${this.frontendUrl}/reset-password?token=${resetToken}`;

    // Enviar email
    try {
      await this.emailService.sendPasswordResetEmail(user.email, user.name, resetToken, resetUrl);
    } catch (error) {
      // Se falhar o email, deletar o token
      await this.passwordResetTokenRepository.delete(passwordResetToken);
      throw new Error('Erro ao enviar email de recuperação');
    }
  }
}

