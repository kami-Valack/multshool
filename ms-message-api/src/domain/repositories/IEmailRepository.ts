import { EmailMessage } from '../entities/EmailMessage';

export interface IEmailRepository {
  send(email: EmailMessage): Promise<void>;
}

