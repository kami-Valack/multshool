import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IPasswordResetTokenRepository } from '../../domain/repositories/IPasswordResetTokenRepository';
import { IPasswordHasher } from '../../domain/services/IPasswordHasher';
import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';

export class ResetPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordResetTokenRepository: IPasswordResetTokenRepository,
    private passwordHasher: IPasswordHasher,
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(input: {
    token: string;
    newPassword: string;
  }): Promise<void> {
    // Validar senha
    if (input.newPassword.length < 8) {
      throw new Error('Senha deve ter no mínimo 8 caracteres');
    }

    // Buscar token
    const resetToken = await this.passwordResetTokenRepository.findByToken(input.token);
    if (!resetToken) {
      throw new Error('Token inválido');
    }

    // Verificar se é válido
    if (!resetToken.isValid()) {
      throw new Error('Token expirado ou já utilizado');
    }

    // Buscar usuário
    const user = await this.userRepository.findById(resetToken.userId);
    if (!user || !user.isActive) {
      throw new Error('Usuário não encontrado ou inativo');
    }

    // Hash da nova senha
    const newPasswordHash = await this.passwordHasher.hash(input.newPassword);

    // Atualizar senha
    user.updatePassword(newPasswordHash);
    await this.userRepository.update(user);

    // Marcar token como usado
    resetToken.markAsUsed();
    await this.passwordResetTokenRepository.save(resetToken);

    // Revogar todos os refresh tokens do usuário (forçar novo login)
    await this.refreshTokenRepository.revokeAllUserTokens(user.id);
  }
}

