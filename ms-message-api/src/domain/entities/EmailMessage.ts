export interface EmailMessage {
  id?: string;
  type: EmailType;
  to: string;
  subject: string;
  data: Record<string, any>;
  htmlBody?: string;
  textBody?: string;
  metadata?: {
    userId?: string;
    timestamp?: Date;
    [key: string]: any;
  };
}

export enum EmailType {
  VERIFICACAO_CONTA = 'verificacao de conta',
  NOTIFICACAO = 'notificacao',
  NOTIFICACAO_PAGAMENTO = 'notificacao de pagamento',
  RECUPERACAO_SENHA = 'recuperacao de senha',
}

