# Guia de Integração com APIs

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto `portal-estudante` com as seguintes variáveis:

```env
NEXT_PUBLIC_USERS_API_URL=http://localhost:8001/api
NEXT_PUBLIC_STUDENT_API_URL=http://localhost:8002/api
NEXT_PUBLIC_SCHOOL_API_URL=http://localhost:8003/api
NEXT_PUBLIC_BILLING_API_URL=http://localhost:8004/api
```

## Estrutura de Integração

### Serviços Criados

1. **apiClient.ts** - Cliente HTTP base com:
   - Gerenciamento automático de tokens JWT
   - Renovação automática de tokens
   - Tratamento de erros
   - Upload de arquivos com progresso

2. **authService.ts** - Serviço de autenticação:
   - Login
   - Logout
   - Refresh token
   - Obter perfil
   - Reset de senha
   - Verificação de email

3. **studentService.ts** - Serviço do estudante:
   - Perfil do estudante
   - Documentos
   - Instituições
   - Matrículas
   - Inscrições em exames

### Contexto de Autenticação

O `AuthContext` gerencia o estado global de autenticação:
- Usuário logado
- Estado de carregamento
- Funções de login/logout
- Atualização de perfil

### Proteção de Rotas

Use o componente `ProtectedRoute` para proteger rotas que requerem autenticação:

```tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function MinhaPage() {
  return (
    <ProtectedRoute>
      {/* Conteúdo protegido */}
    </ProtectedRoute>
  );
}
```

## Endpoints Integrados

### Autenticação (ms-users-api-laravel)
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh-token` - Renovar token
- `GET /api/auth/me` - Obter perfil do usuário
- `POST /api/auth/password-reset/request` - Solicitar reset de senha
- `POST /api/auth/password-reset/reset` - Resetar senha
- `POST /api/auth/verify-email` - Verificar email

### Estudante (ms-stundent-api-laravel-temp)
- `GET /api/me` - Perfil do estudante
- `GET /api/documents` - Listar documentos
- `POST /api/documents/upload` - Upload de documento
- `GET /api/documents/check-first-access` - Verificar primeiro acesso
- `GET /api/institutions` - Listar instituições
- `GET /api/institutions/{id}` - Obter instituição
- `GET /api/enrollments` - Listar matrículas
- `POST /api/enrollments` - Criar matrícula
- `GET /api/exam-registrations` - Listar inscrições em exames
- `POST /api/exam-registrations` - Inscrever-se em exame

## Como Usar

### 1. Login

```tsx
import { useAuth } from "@/contexts/AuthContext";

const { login } = useAuth();

await login(email, password);
```

### 2. Obter Dados do Estudante

```tsx
import { studentService } from "@/services/studentService";

// Perfil
const profile = await studentService.getProfile();

// Matrículas
const enrollments = await studentService.getEnrollments();

// Documentos
const documents = await studentService.getDocuments();
```

### 3. Upload de Documento

```tsx
const file = // File object
const document = await studentService.uploadDocument(
  file,
  "bi", // tipo do documento
  (progress) => {
    console.log(`Progresso: ${progress}%`);
  }
);
```

## Próximos Passos

1. Integrar notas/grades quando disponível
2. Integrar propinas/pagamentos quando disponível
3. Integrar horários e calendários
4. Integrar materiais de estudo
5. Adicionar tratamento de erros mais robusto
6. Implementar cache de dados
7. Adicionar loading states em todas as páginas

