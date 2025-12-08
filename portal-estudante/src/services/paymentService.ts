import { studentApiClient, schoolApiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';

export interface PaymentTokenResponse {
  status: 'success' | 'error';
  payment_id?: string;
  purchase_token?: string;
  iframe_url?: string;
  time_to_live?: number;
  message?: string;
}

export interface PaymentStatus {
  id: string;
  reference: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  paid_at?: string;
  course?: {
    id: string;
    name: string;
  };
}

class PaymentService {
  /**
   * Generate purchase token from GPO
   */
  async generatePurchaseToken(
    courseId: string,
    studentId: string,
    studentEmail: string,
    studentName: string
  ): Promise<PaymentTokenResponse> {
    try {
      const response = await schoolApiClient.post<PaymentTokenResponse>(
        '/student/payments/generate-token',
        {
          course_id: courseId,
          student_id: studentId,
          student_email: studentEmail,
          student_name: studentName,
        }
      );

      if (response.status === 'success') {
        return response;
      }

      throw new Error(response.message || 'Erro ao gerar token de pagamento');
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Check payment status
   */
  async checkPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    try {
      const response = await schoolApiClient.get<{
        status: string;
        payment: PaymentStatus;
      }>(`/student/payments/check-status?payment_id=${paymentId}`);

      if (response.status === 'success' && response.payment) {
        return response.payment;
      }

      throw new Error('Erro ao verificar status do pagamento');
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Check if payment exists for course
   */
  async checkPaymentByCourse(
    courseId: string,
    studentId: string
  ): Promise<{ has_payment: boolean; payment?: PaymentStatus }> {
    try {
      const response = await schoolApiClient.get<{
        status: string;
        has_payment: boolean;
        payment?: PaymentStatus;
      }>(`/student/payments/check-by-course?course_id=${courseId}&student_id=${studentId}`);

      if (response.status === 'success') {
        return {
          has_payment: response.has_payment || false,
          payment: response.payment,
        };
      }

      return { has_payment: false };
    } catch (error: any) {
      // Se retornar 404, significa que não há pagamento
      if (error.status === 404) {
        return { has_payment: false };
      }
      throw error;
    }
  }
}

export const paymentService = new PaymentService();

