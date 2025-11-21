import * as postmark from 'postmark';
import { IEmailRepository } from '../../domain/repositories/IEmailRepository';
import { EmailMessage } from '../../domain/entities/EmailMessage';

export class PostmarkEmailRepository implements IEmailRepository {
  private client: postmark.ServerClient;
  private fromEmail: string;
  private fromName: string;

  constructor(
    apiToken: string,
    fromEmail: string,
    fromName: string
  ) {
    this.client = new postmark.ServerClient(apiToken);
    this.fromEmail = fromEmail;
    this.fromName = fromName;
  }

  async send(email: EmailMessage): Promise<void> {
    try {
      if (!email.htmlBody || !email.textBody) {
        throw new Error('Email deve ter htmlBody e textBody preenchidos');
      }

      // Envia via Postmark
      await this.client.sendEmail({
        From: `${this.fromName} <${this.fromEmail}>`,
        To: email.to,
        Subject: email.subject,
        HtmlBody: email.htmlBody,
        TextBody: email.textBody,
        MessageStream: 'outbound',
      });

      console.log(`Email enviado com sucesso para: ${email.to} (Tipo: ${email.type})`);
    } catch (error) {
      console.error(`Erro ao enviar email para ${email.to}:`, error);
      throw new Error(`Falha ao enviar email: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }
}

