// Configuração das URLs das APIs
export const API_CONFIG = {
  // API de Autenticação e Usuários
  USERS_API: process.env.NEXT_PUBLIC_USERS_API_URL || 'http://localhost:8001/api',
  
  // API de Estudantes
  STUDENT_API: process.env.NEXT_PUBLIC_STUDENT_API_URL || 'http://localhost:8002/api',
  
  // API de Escolas
  SCHOOL_API: process.env.NEXT_PUBLIC_SCHOOL_API_URL || 'http://localhost:8003/api',
  
  // API de Billing/Pagamentos (se existir)
  BILLING_API: process.env.NEXT_PUBLIC_BILLING_API_URL || 'http://localhost:8004/api',
};

// Timeout padrão para requisições (em ms)
export const API_TIMEOUT = 30000;

