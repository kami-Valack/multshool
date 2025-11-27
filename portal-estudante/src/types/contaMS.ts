export interface CreditCard {
  id: string;
  schoolName: string;
  cardNumber: string;
  balance: number;
  currency: string;
  holderName: string;
  provider: string;
  hasChip: boolean;
  hasContactless: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DebtAlert {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  status: DebtStatus;
  dueDate: Date;
  createdAt: Date;
  type: DebtType;
  priority: AlertPriority;
}

export enum DebtStatus {
  PENDING = 'pending',
  OVERDUE = 'overdue',
  PAID = 'paid',
  CANCELLED = 'cancelled'
}

export enum DebtType {
  TUITION = 'tuition', // Propina
  FEE = 'fee', // Taxa
  FINE = 'fine', // Multa
  OTHER = 'other'
}

export enum AlertPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface CardData {
  card: CreditCard;
  alerts: DebtAlert[];
}