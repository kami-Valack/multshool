
import { CreditCard, DebtAlert, DebtStatus, AlertPriority } from "@/types/contaMS";

/**
 * Formata o saldo para exibição
 */
export const formatBalance = (amount: number, currency: string = 'AOA'): string => {
  const formattedAmount = amount.toLocaleString('pt-AO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  const currencySymbol = currency === 'AOA' ? 'kz' : currency;
  return `${formattedAmount} ${currencySymbol}`;
};

/**
 * Formata o valor da dívida para exibição
 */
export const formatDebtAmount = (amount: number, currency: string = 'AOA'): string => {
  const formatted = formatBalance(amount, currency);
  return `-${formatted}`;
};

/**
 * Mascaras o número do cartão para exibição
 */
export const maskCardNumber = (cardNumber: string, showLast: number = 4): string => {
  const cleaned = cardNumber.replace(/\s/g, '');
  const masked = cleaned.slice(0, -showLast).replace(/\d/g, '*');
  const visible = cleaned.slice(-showLast);
  return `${masked} ${visible}`.replace(/(.{4})/g, '$1 ').trim();
};

/**
 * Obtém a cor do alerta baseada na prioridade
 */
export const getAlertColor = (priority: AlertPriority): string => {
  switch (priority) {
    case AlertPriority.LOW:
      return '#4CAF50';
    case AlertPriority.MEDIUM:
      return '#FF9800';
    case AlertPriority.HIGH:
      return '#FF6B35';
    case AlertPriority.CRITICAL:
      return '#F44336';
    default:
      return '#FF6B35';
  }
};

/**
 * Traduz o estado da dívida
 */
export const translateDebtStatus = (status: DebtStatus): string => {
  switch (status) {
    case DebtStatus.PENDING:
      return 'Pendente';
    case DebtStatus.OVERDUE:
      return 'Em atraso';
    case DebtStatus.PAID:
      return 'Pago';
    case DebtStatus.CANCELLED:
      return 'Cancelado';
    default:
      return 'Desconhecido';
  }
};