import { EmailMessage } from '../entities/EmailMessage';

export interface IEmailTemplateService {
  renderTemplate(emailType: string, data: Record<string, any>): {
    subject: string;
    htmlBody: string;
    textBody: string;
  };
}

