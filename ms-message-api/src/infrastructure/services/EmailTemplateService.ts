import * as fs from 'fs';
import * as path from 'path';
import { IEmailTemplateService } from '../../domain/services/IEmailTemplateService';
import { EmailType } from '../../domain/entities/EmailMessage';

export class EmailTemplateService implements IEmailTemplateService {
  private templatesPath: string;

  constructor() {
    // Detecta o caminho baseado no ambiente
    // Em produção (compilado), __dirname aponta para dist/infrastructure/services
    // Em desenvolvimento, __dirname aponta para src/infrastructure/services
    const basePath = __dirname.includes('dist')
      ? path.join(__dirname, '../../infrastructure/templates')
      : path.join(__dirname, '../templates');
    
    // Fallback: tenta caminho relativo ao process.cwd()
    if (!fs.existsSync(basePath)) {
      const fallbackPath = path.join(process.cwd(), 'src/infrastructure/templates');
      this.templatesPath = fs.existsSync(fallbackPath) ? fallbackPath : basePath;
    } else {
      this.templatesPath = basePath;
    }
  }

  renderTemplate(emailType: string, data: Record<string, any>): {
    subject: string;
    htmlBody: string;
    textBody: string;
  } {
    const templateFile = this.getTemplateFileName(emailType);
    const templatePath = path.join(this.templatesPath, templateFile);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template não encontrado para o tipo: ${emailType}`);
    }

    let htmlBody = fs.readFileSync(templatePath, 'utf-8');
    
    // Substitui variáveis no template (simples substituição de {{variavel}})
    htmlBody = this.replaceVariables(htmlBody, data);

    // Gera versão texto simples
    const textBody = this.htmlToText(htmlBody);

    // Gera assunto baseado no tipo
    const subject = this.generateSubject(emailType, data);

    return {
      subject,
      htmlBody,
      textBody,
    };
  }

  private getTemplateFileName(emailType: string): string {
    const templateMap: Record<string, string> = {
      [EmailType.VERIFICACAO_CONTA]: 'verificacao-conta.template.html',
      [EmailType.NOTIFICACAO]: 'notificacao.template.html',
      [EmailType.NOTIFICACAO_PAGAMENTO]: 'notificacao-pagamento.template.html',
      [EmailType.RECUPERACAO_SENHA]: 'recuperacao-senha.template.html',
    };

    return templateMap[emailType] || 'notificacao.template.html';
  }

  private replaceVariables(template: string, data: Record<string, any>): string {
    let result = template;
    
    // Substitui {{variavel}} por valores
    result = result.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : match;
    });

    // Remove blocos condicionais não suportados ({{#if}})
    result = result.replace(/\{\{#if\s+(\w+)\}\}/g, '');
    result = result.replace(/\{\{\/if\}\}/g, '');

    return result;
  }

  private htmlToText(html: string): string {
    // Remove tags HTML e converte para texto simples
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
  }

  private generateSubject(emailType: string, data: Record<string, any>): string {
    const subjectMap: Record<string, string> = {
      [EmailType.VERIFICACAO_CONTA]: 'Verifique sua conta',
      [EmailType.NOTIFICACAO]: data.assunto || 'Notificação',
      [EmailType.NOTIFICACAO_PAGAMENTO]: `Notificação de Pagamento - ${data.status || 'Atualização'}`,
      [EmailType.RECUPERACAO_SENHA]: 'Recuperação de Senha',
    };

    return subjectMap[emailType] || 'Notificação';
  }
}

