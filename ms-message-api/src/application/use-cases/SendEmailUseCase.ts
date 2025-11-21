import { EmailMessage } from '../../domain/entities/EmailMessage';
import { IEmailRepository } from '../../domain/repositories/IEmailRepository';
import { IEmailTemplateService } from '../../domain/services/IEmailTemplateService';

export class SendEmailUseCase {
  constructor(
    private emailRepository: IEmailRepository,
    private emailTemplateService: IEmailTemplateService
  ) {}

  async execute(emailMessage: EmailMessage): Promise<void> {
    // Renderiza o template baseado no tipo de email
    const template = this.emailTemplateService.renderTemplate(
      emailMessage.type,
      emailMessage.data
    );

    // Cria a mensagem de email completa com o template renderizado
    const completeEmail: EmailMessage = {
      ...emailMessage,
      subject: template.subject,
      htmlBody: template.htmlBody,
      textBody: template.textBody,
    };

    // Envia o email
    await this.emailRepository.send(completeEmail);
  }
}

