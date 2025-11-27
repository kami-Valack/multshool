// services/pdfService.ts
export interface Transaction {
  title: string;
  date: string;
  amount: string;
  isPositive: boolean;
}

export interface UserInfo {
  fullName: string;
  accountType?: string;
}

class PDFService {
  private formatCurrency(amount: string): number {
    return parseFloat(amount.replace(/[^\d,.-]/g, '').replace(',', '.'));
  }

  private calculateSummary(transactions: Transaction[]) {
    const credits = transactions
      .filter(t => t.isPositive)
      .reduce((acc, t) => acc + Math.abs(this.formatCurrency(t.amount)), 0);
    
    const debits = transactions
      .filter(t => !t.isPositive)
      .reduce((acc, t) => acc + Math.abs(this.formatCurrency(t.amount)), 0);
    
    const balance = credits - debits;
    
    return { credits, debits, balance };
  }

  // Método que REALMENTE baixa um arquivo
  public downloadExtract(user: UserInfo, transactions: Transaction[]): void {
    const { credits, debits, balance } = this.calculateSummary(transactions);
    
    // Criar conteúdo do extracto em formato texto
    let extractContent = '';
    extractContent += '='.repeat(60) + '\n';
    extractContent += '           EXTRACTO DE MOVIMENTOS\n';
    extractContent += '='.repeat(60) + '\n\n';
    
    extractContent += `Nome: ${user.fullName}\n`;
    extractContent += `Conta: ${user.accountType || 'Multischool'}\n`;
    extractContent += `Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
    extractContent += `Hora: ${new Date().toLocaleTimeString('pt-BR')}\n\n`;
    
    extractContent += '-'.repeat(60) + '\n';
    extractContent += 'DESCRIÇÃO'.padEnd(25) + 'DATA'.padEnd(15) + 'MONTANTE'.padStart(20) + '\n';
    extractContent += '-'.repeat(60) + '\n';
    
    transactions.forEach(transaction => {
      const desc = transaction.title.length > 24 ? transaction.title.substring(0, 21) + '...' : transaction.title;
      const date = transaction.date.length > 14 ? transaction.date.substring(0, 11) + '...' : transaction.date;
      
      extractContent += desc.padEnd(25);
      extractContent += date.padEnd(15);
      extractContent += transaction.amount.padStart(20) + '\n';
    });
    
    extractContent += '-'.repeat(60) + '\n\n';
    
    extractContent += 'RESUMO FINANCEIRO:\n';
    extractContent += '-'.repeat(30) + '\n';
    extractContent += `Total Créditos: +${credits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz\n`;
    extractContent += `Total Débitos:  -${debits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz\n`;
    extractContent += `Saldo Final:    ${balance >= 0 ? '+' : ''}${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz\n\n`;
    
    extractContent += '-'.repeat(60) + '\n';
    extractContent += 'Documento gerado automaticamente pela plataforma Multischool\n';
    extractContent += `ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}\n`;
    
    // Forçar download
    this.forceDownload(extractContent, this.generateFileName(user.fullName, 'txt'));
  }

  // Método alternativo - HTML bonito para impressão
  public downloadHTMLExtract(user: UserInfo, transactions: Transaction[]): void {
    const { credits, debits, balance } = this.calculateSummary(transactions);
    
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Extracto - ${user.fullName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .info { background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background: #f0f0f0; font-weight: bold; }
        .positive { color: #28a745; font-weight: bold; }
        .negative { color: #dc3545; font-weight: bold; }
        .summary { background: #f8f9fa; padding: 15px; border-radius: 5px; border: 2px solid #dee2e6; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>EXTRACTO DE MOVIMENTOS</h1>
        <p>Multischool</p>
    </div>
    
    <div class="info">
        <p><strong>Nome:</strong> ${user.fullName}</p>
        <p><strong>Conta:</strong> ${user.accountType || 'Multischool'}</p>
        <p><strong>Data de emissão:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
        <p><strong>Hora de emissão:</strong> ${new Date().toLocaleTimeString('pt-BR')}</p>
    </div>
    
    <table class="table">
        <thead>
            <tr>
                <th>Descrição</th>
                <th>Data</th>
                <th style="text-align: right;">Montante</th>
            </tr>
        </thead>
        <tbody>
            ${transactions.map(transaction => `
                <tr>
                    <td>${transaction.title}</td>
                    <td>${transaction.date}</td>
                    <td class="${transaction.isPositive ? 'positive' : 'negative'}" style="text-align: right;">
                        ${transaction.amount}
                    </td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <div class="summary">
        <h3>Resumo Financeiro</h3>
        <p><strong>Total Créditos:</strong> <span class="positive">+${credits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz</span></p>
        <p><strong>Total Débitos:</strong> <span class="negative">-${debits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz</span></p>
        <p><strong>Saldo Final:</strong> <span class="${balance >= 0 ? 'positive' : 'negative'}">${balance >= 0 ? '+' : ''}${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz</span></p>
    </div>
    
    <div class="footer">
        <p>Documento gerado automaticamente pela plataforma Multischool</p>
        <p>Para converter em PDF: Ctrl+P → Destino: Salvar como PDF</p>
        <p>ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
    </div>
</body>
</html>`;

    this.forceDownload(htmlContent, this.generateFileName(user.fullName, 'html'));
  }

  // Método que FORÇA o download - funciona sempre!
  private forceDownload(content: string, filename: string): void {
    try {
      // Criar blob com o conteúdo
      const blob = new Blob([content], { 
        type: filename.endsWith('.html') ? 'text/html;charset=utf-8' : 'text/plain;charset=utf-8' 
      });
      
      // Criar URL temporária
      const url = URL.createObjectURL(blob);
      
      // Criar link invisível e forçar clique
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      // Adicionar ao DOM, clicar e remover
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Limpar URL temporária
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      console.log(`✅ Download iniciado: ${filename}`);
      
    } catch (error) {
      console.error('❌ Erro no download:', error);
      
      // Fallback extremo: abrir em nova aba
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`<pre>${content}</pre>`);
        newWindow.document.close();
      }
      
      throw new Error('Erro no download do extracto');
    }
  }

  private generateFileName(userName: string, extension: string): string {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(':').slice(0, 2).join('h');
    
    const sanitizedName = userName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '_') // Substitui espaços por underscore
      .substring(0, 20); // Limita tamanho
    
    return `extracto_${sanitizedName}_${date}_${time}.${extension}`;
  }
}

// Instância singleton
export const pdfService = new PDFService();

// Hook personalizado
export const usePDFGenerator = () => {
  const generateExtract = async (user: UserInfo, transactions: Transaction[]) => {
    try {
      // Tenta HTML primeiro (mais bonito)
      pdfService.downloadHTMLExtract(user, transactions);
      
      // Pequeno delay e tenta texto também como backup
      setTimeout(() => {
        try {
          pdfService.downloadExtract(user, transactions);
        } catch (e) {
          console.log('Backup download failed, but HTML should work');
        }
      }, 1000);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro no download' 
      };
    }
  };

  const downloadTextOnly = (user: UserInfo, transactions: Transaction[]) => {
    try {
      pdfService.downloadExtract(user, transactions);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro no download' 
      };
    }
  };

  return { generateExtract, downloadTextOnly };
};