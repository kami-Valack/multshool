import { billingApiClient, ApiResponse } from './apiClient';

export type PaymentReference = {
  id: string;
  provider: string;
  id_fp_referencia?: number | null;
  nu_referencia?: string | null;
  entidade?: string | null;
  vl_referencia: number;
  tp_fp_referencia?: string;
  issued_at?: string | null;
};

export type PaymentIntent = {
  id: string;
  student_id: string;
  fee_id: string;
  amount: number;
  currency: string;
  description?: string | null;
  status: string;
  receipt_number?: string | null;
  paid_at?: string | null;
  reference?: PaymentReference | null;
  created_at?: string | null;
};

export type PaymentStatusResponse = {
  status: 'success' | 'error';
  paid?: boolean;
  payment_intent?: PaymentIntent;
  message?: string;
};

class PaymentService {
  async createPaymentIntent(feeId: string): Promise<PaymentIntent> {
    const response = await billingApiClient.post<
      ApiResponse & { payment_intent: PaymentIntent }
    >('/payment-intents', { fee_id: feeId });

    if (response.status !== 'success' || !response.payment_intent) {
      throw new Error(response.message || 'Erro ao iniciar pagamento');
    }

    return response.payment_intent;
  }

  async getPaymentIntent(id: string): Promise<PaymentIntent> {
    const response = await billingApiClient.get<
      ApiResponse & { payment_intent: PaymentIntent }
    >(`/payment-intents/${id}`);

    if (response.status !== 'success' || !response.payment_intent) {
      throw new Error(response.message || 'Pagamento não encontrado');
    }

    return response.payment_intent;
  }

  async issueReference(intentId: string): Promise<{
    payment_intent: PaymentIntent;
    reference: PaymentReference;
  }> {
    const response = await billingApiClient.post<
      ApiResponse & {
        payment_intent: PaymentIntent;
        reference: PaymentReference;
      }
    >(`/payment-intents/${intentId}/reference`, {});

    if (response.status !== 'success' || !response.reference) {
      throw new Error(response.message || 'Erro ao gerar referência');
    }

    return {
      payment_intent: response.payment_intent,
      reference: response.reference,
    };
  }

  async getPaymentStatus(intentId: string): Promise<PaymentStatusResponse> {
    return billingApiClient.get<PaymentStatusResponse>(
      `/payment-intents/${intentId}/status`
    );
  }

  async simulatePaid(intentId: string): Promise<PaymentIntent> {
    const response = await billingApiClient.post<
      ApiResponse & { payment_intent: PaymentIntent }
    >(`/payment-intents/${intentId}/simulate-paid`, {});

    if (response.status !== 'success' || !response.payment_intent) {
      throw new Error(response.message || 'Simulação indisponível');
    }

    return response.payment_intent;
  }

  async pollUntilPaid(
    intentId: string,
    options?: { maxAttempts?: number; intervalMs?: number }
  ): Promise<PaymentIntent> {
    const maxAttempts = options?.maxAttempts ?? 12;
    const intervalMs = options?.intervalMs ?? 5000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const result = await this.getPaymentStatus(intentId);
      if (result.status === 'success' && result.paid && result.payment_intent) {
        return result.payment_intent;
      }
      if (attempt < maxAttempts - 1) {
        await new Promise((r) => setTimeout(r, intervalMs));
      }
    }

    throw new Error(
      'Pagamento ainda não confirmado. Tente novamente dentro de alguns minutos.'
    );
  }
}

export const paymentService = new PaymentService();
