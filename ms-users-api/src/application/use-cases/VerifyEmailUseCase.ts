import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IEmailVerificationTokenRepository } from '../../domain/repositories/IEmailVerificationTokenRepository';
import { IUserEventService } from '../../domain/services/IUserEventService';

export class VerifyEmailUseCase {
  constructor(
    private userRepository: IUserRepository,
    private emailVerificationTokenRepository: IEmailVerificationTokenRepository,
    private userEventService: IUserEventService
  ) {}

  async execute(token: string): Promise<void> {
    // Buscar token
    const verificationToken = await this.emailVerificationTokenRepository.findByToken(token);
    if (!verificationToken) {
      throw new Error('Token inválido');
    }

    // Verificar se é válido
    if (!verificationToken.isValid()) {
      throw new Error('Token expirado ou já utilizado');
    }

    // Buscar usuário
    const user = await this.userRepository.findById(verificationToken.userId);
    if (!user || !user.isActive) {
      throw new Error('Usuário não encontrado ou inativo');
    }

    // Verificar se já está verificado
    if (user.emailVerified) {
      throw new Error('Email já foi verificado');
    }

    // Verificar email do usuário
    user.verifyEmail();
    await this.userRepository.update(user);

    // Marcar token como usado
    verificationToken.markAsUsed();
    await this.emailVerificationTokenRepository.save(verificationToken);

    // Emitir evento de usuário verificado para replicação
    try {
      await this.userEventService.emitUserVerifiedEvent(user);
    } catch (error) {
      // Log do erro mas não falha a verificação
      console.error('Erro ao emitir evento de usuário verificado:', error);
    }
  }
}

