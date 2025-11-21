import { EmailMessage, EmailType } from '../../domain/entities/EmailMessage';
import { SendEmailUseCase } from './SendEmailUseCase';

export interface EmailEvent {
  type: string;
  to: string;
  data: Record<string, any>;
  metadata?: Record<string, any>;
}

export class ProcessEmailEventUseCase {
  constructor(private sendEmailUseCase: SendEmailUseCase) {}

  async execute(event: EmailEvent): Promise<void> {
    // Valida o tipo de email
    const emailType = this.validateEmailType(event.type);
    
    if (!emailType) {
      throw new Error(`Tipo de email inválido: ${event.type}`);
    }

    // Cria a mensagem de email
    const emailMessage: EmailMessage = {
      type: emailType,
      to: event.to,
      subject: '', // Será preenchido pelo template service
      data: event.data,
      metadata: {
        ...event.metadata,
        timestamp: new Date(),
      },
    };

    // Processa o envio
    await this.sendEmailUseCase.execute(emailMessage);
  }

  private validateEmailType(type: string): EmailType | null {
    const emailTypes = Object.values(EmailType);
    return emailTypes.includes(type as EmailType) ? (type as EmailType) : null;
  }
}

