import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export type TuitionPlan = {
  id: string;
  name: string;
  period: 'mensal' | 'trimestral' | 'semestral' | 'anual';
  total_amount: number | string;
  installments: number;
  currency: string;
  discount_percent?: number | string | null;
  late_fee_percent?: number | string | null;
  late_fee_fixed?: number | string | null;
  start_date: string;
  end_date: string;
  course_ids?: string[] | null;
  class_ids?: string[] | null;
  academic_years?: string[] | null;
  student_types?: string[] | null;
  is_active?: boolean;
};

export type AdditionalFee = {
  id: string;
  name: string;
  amount: number | string;
  currency: string;
};

export type FeeCharge = {
  id: string;
  student_id?: string | null;
  student_name: string;
  student_number?: string | null;
  course_name?: string | null;
  class_name?: string | null;
  tuition_plan_id?: string | null;
  description: string;
  amount: number | string;
  due_date: string;
  status: 'pending' | 'paid' | 'overdue' | 'waived';
  kind: 'tuition' | 'fine' | 'fee' | 'other';
  paid_at?: string | null;
};

export type Payment = {
  id: string;
  receipt_number: string;
  student_id?: string | null;
  student_name: string;
  course_name?: string | null;
  class_name?: string | null;
  fee_charge_id?: string | null;
  type: string;
  amount: number | string;
  method: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  paid_at: string;
  notes?: string | null;
  origin?: 'manual' | 'exame' | 'evento' | 'propina';
};

export type Invoice = {
  id: string;
  number: string;
  doc_type: 'fatura' | 'recibo';
  student_id?: string | null;
  student_name: string;
  student_nif?: string | null;
  issue_date: string;
  due_date?: string | null;
  items: Array<{ description: string; quantity: number; unit_price: number; total?: number }>;
  subtotal: number | string;
  total: number | string;
  status: 'pendente' | 'pago' | 'cancelado' | 'atrasado';
  payment_method?: string | null;
  qr_data?: string | null;
  notes?: string | null;
};

/** Shape normalizado para o frontend de relatórios */
export type FinanceSummary = {
  payments_total: number;
  payments_count: number;
  pending_charges_total: number;
  overdue_charges_total: number;
  charges_count: number;
  invoices_count: number;
  currency: string;
};

function unwrapList<T>(data: any, key: string): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data[key])) return data[key];
  return [];
}

class FinanceService {
  async listTuitionPlans(): Promise<TuitionPlan[]> {
    const res = await schoolApiClient.get(API_ENDPOINTS.TUITION_PLANS.LIST);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao listar planos');
    return unwrapList<TuitionPlan>(res.data, 'tuition_plans');
  }

  async createTuitionPlan(data: Partial<TuitionPlan>): Promise<TuitionPlan> {
    const res = await schoolApiClient.post(API_ENDPOINTS.TUITION_PLANS.CREATE, data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao criar plano');
    return (res.data as any).tuition_plan;
  }

  async updateTuitionPlan(id: string, data: Partial<TuitionPlan>): Promise<TuitionPlan> {
    const res = await schoolApiClient.put(API_ENDPOINTS.TUITION_PLANS.UPDATE(id), data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao actualizar plano');
    return (res.data as any).tuition_plan;
  }

  async deleteTuitionPlan(id: string): Promise<void> {
    const res = await schoolApiClient.delete(API_ENDPOINTS.TUITION_PLANS.DELETE(id));
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao eliminar plano');
  }

  async listAdditionalFees(): Promise<AdditionalFee[]> {
    const res = await schoolApiClient.get(API_ENDPOINTS.ADDITIONAL_FEES.LIST);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao listar taxas');
    return unwrapList<AdditionalFee>(res.data, 'additional_fees');
  }

  async createAdditionalFee(data: Partial<AdditionalFee>): Promise<AdditionalFee> {
    const res = await schoolApiClient.post(API_ENDPOINTS.ADDITIONAL_FEES.CREATE, data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao criar taxa');
    return (res.data as any).additional_fee;
  }

  async deleteAdditionalFee(id: string): Promise<void> {
    const res = await schoolApiClient.delete(API_ENDPOINTS.ADDITIONAL_FEES.DELETE(id));
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao eliminar taxa');
  }

  async listFeeCharges(params?: { status?: string }): Promise<FeeCharge[]> {
    const q = params?.status ? `?status=${encodeURIComponent(params.status)}` : '';
    const res = await schoolApiClient.get(`${API_ENDPOINTS.FEE_CHARGES.LIST}${q}`);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao listar débitos');
    return unwrapList<FeeCharge>(res.data, 'fee_charges');
  }

  async createFeeCharge(data: Partial<FeeCharge>): Promise<FeeCharge> {
    const res = await schoolApiClient.post(API_ENDPOINTS.FEE_CHARGES.CREATE, data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao criar débito');
    return (res.data as any).fee_charge;
  }

  async markFeeChargePaid(id: string): Promise<FeeCharge> {
    const res = await schoolApiClient.post(API_ENDPOINTS.FEE_CHARGES.MARK_PAID(id), {});
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao marcar como pago');
    return (res.data as any).fee_charge;
  }

  async deleteFeeCharge(id: string): Promise<void> {
    const res = await schoolApiClient.delete(API_ENDPOINTS.FEE_CHARGES.DELETE(id));
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao eliminar débito');
  }

  async listPayments(): Promise<Payment[]> {
    const res = await schoolApiClient.get(API_ENDPOINTS.PAYMENTS.LIST);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao listar pagamentos');
    return unwrapList<Payment>(res.data, 'payments');
  }

  async createPayment(data: Partial<Payment>): Promise<Payment> {
    const res = await schoolApiClient.post(API_ENDPOINTS.PAYMENTS.CREATE, data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao registar pagamento');
    return (res.data as any).payment;
  }

  async deletePayment(id: string): Promise<void> {
    const res = await schoolApiClient.delete(API_ENDPOINTS.PAYMENTS.DELETE(id));
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao eliminar pagamento');
  }

  async listInvoices(): Promise<Invoice[]> {
    const res = await schoolApiClient.get(API_ENDPOINTS.INVOICES.LIST);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao listar facturas');
    return unwrapList<Invoice>(res.data, 'invoices');
  }

  async createInvoice(data: Partial<Invoice>): Promise<Invoice> {
    const res = await schoolApiClient.post(API_ENDPOINTS.INVOICES.CREATE, data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao criar factura');
    return (res.data as any).invoice;
  }

  async updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice> {
    const res = await schoolApiClient.put(API_ENDPOINTS.INVOICES.UPDATE(id), data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao actualizar factura');
    return (res.data as any).invoice;
  }

  async deleteInvoice(id: string): Promise<void> {
    const res = await schoolApiClient.delete(API_ENDPOINTS.INVOICES.DELETE(id));
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao eliminar factura');
  }

  async getSummary(): Promise<FinanceSummary> {
    const res = await schoolApiClient.get(API_ENDPOINTS.FINANCE_REPORTS.SUMMARY);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao obter relatório');
    const data = res.data as any;
    const summary = data.summary || data;
    const totals = summary.totals || {};
    const counts = summary.counts || {};
    return {
      payments_total: Number(totals.payments_received ?? summary.payments_total ?? 0),
      payments_count: Number(counts.payments ?? summary.payments_count ?? 0),
      pending_charges_total: Number(totals.pending ?? summary.pending_charges_total ?? 0),
      overdue_charges_total: Number(totals.overdue ?? summary.overdue_charges_total ?? 0),
      charges_count: Number(counts.charges ?? summary.charges_count ?? 0),
      invoices_count: Number(summary.invoices_count ?? 0),
      currency: summary.currency || 'AOA',
    };
  }
}

export const financeService = new FinanceService();
