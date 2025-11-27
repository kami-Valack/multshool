import {
  CreditCard,
  DebtAlert,
  DebtStatus,
  DebtType,
  AlertPriority,
  CardData,
} from "@/types/contaMS";

export const mockCreditCard: CreditCard = {
  id: "card-001",
  schoolName: "multischool Angola",
  cardNumber: "043 345 160 9",
  balance: 50000.00,
  currency: "AOA",
  holderName: "Ana Maria Diogo Santos",
  provider: "AppyPay",
  hasChip: true,
  hasContactless: true,
  isActive: true,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-09-08"),
};

export const mockDebtAlerts: DebtAlert[] = [
  {
    id: "debt-001",
    title: "Propina de julho",
    description: "Mensalidade do mês de julho em atraso",
    amount: 62090.0,
    currency: "AOA",
    status: DebtStatus.OVERDUE,
    dueDate: new Date("2024-07-31"),
    createdAt: new Date("2024-07-01"),
    type: DebtType.TUITION,
    priority: AlertPriority.HIGH,
  },
  {
    id: "debt-002",
    title: "Taxa de inscrição",
    description: "Taxa de inscrição para o próximo semestre",
    amount: 25000.0,
    currency: "AOA",
    status: DebtStatus.PENDING,
    dueDate: new Date("2024-09-15"),
    createdAt: new Date("2024-08-01"),
    type: DebtType.FEE,
    priority: AlertPriority.MEDIUM,
  },
];

export const mockCardData: CardData = {
  card: mockCreditCard,
  alerts: mockDebtAlerts.filter((alert) => alert.status === DebtStatus.OVERDUE),
};
