import { schoolApiClient } from '../client';
import { API_CONFIG } from '../config';

export interface Payment {
  id: string;
  reference: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  student_id: string;
  student_name: string;
  student_email: string;
  gpo_transaction_id?: string;
  paid_at?: string;
  failure_reason?: string;
  created_at: string;
  updated_at: string;
  course: {
    id: string;
    name: string;
    code?: string;
  };
}

export interface PaymentListResponse {
  payments: Payment[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface PaymentDetailResponse {
  payment: Payment & {
    gpo_response?: any;
  };
}

class PaymentService {
  /**
   * List all completed payments
   */
  async listPayments(params?: {
    status?: string;
    course_id?: string;
    student_id?: string;
    page?: number;
    per_page?: number;
  }): Promise<PaymentListResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.course_id) queryParams.append('course_id', params.course_id);
    if (params?.student_id) queryParams.append('student_id', params.student_id);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());

    const queryString = queryParams.toString();
    const url = `/admin/payments${queryString ? `?${queryString}` : ''}`;

    const response = await schoolApiClient.get<PaymentListResponse>(url);
    
    if (response.status === 'success' && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Erro ao listar pagamentos.');
  }

  /**
   * Get payment details
   */
  async getPayment(id: string): Promise<PaymentDetailResponse> {
    const response = await schoolApiClient.get<PaymentDetailResponse>(`/admin/payments/${id}`);
    
    if (response.status === 'success' && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Erro ao obter detalhes do pagamento.');
  }
}

export const paymentService = new PaymentService();

