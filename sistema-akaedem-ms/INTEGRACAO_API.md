# 🔌 Guia de Integração com APIs

Este documento descreve como o frontend `sistema-akaedem-ms` está integrado com as APIs Laravel.

## 📋 Estrutura de Integração

### 1. Configuração (`src/lib/api/config.ts`)

Define as URLs das APIs e endpoints disponíveis:

```typescript
import { API_CONFIG, API_ENDPOINTS } from '@/lib/api/config';
```

**Variáveis de Ambiente Necessárias:**
- `NEXT_PUBLIC_USERS_API_URL` - URL da API de usuários (padrão: http://localhost:8001/api)
- `NEXT_PUBLIC_SCHOOL_API_URL` - URL da API de escolas (padrão: http://localhost:8002/api)
- `NEXT_PUBLIC_STUDENT_API_URL` - URL da API de estudantes (padrão: http://localhost:8003/api)
- `NEXT_PUBLIC_ADMIN_API_URL` - URL da API de admin (padrão: http://localhost:8004/api)
- `NEXT_PUBLIC_API_SECRET` - Secret para comunicação entre serviços

### 2. Cliente HTTP (`src/lib/api/client.ts`)

Cliente HTTP reutilizável com:
- ✅ Gerenciamento automático de tokens JWT
- ✅ Refresh automático de tokens
- ✅ Tratamento de erros
- ✅ Suporte a upload de arquivos
- ✅ Timeout configurável

**Uso:**
```typescript
import { schoolApiClient } from '@/lib/api/client';

const response = await schoolApiClient.get('/courses');
```

### 3. Serviços (`src/lib/api/services/`)

Serviços organizados por domínio:

- **`auth.service.ts`** - Autenticação e gerenciamento de usuários
- **`school.service.ts`** - Gestão de escolas/instituições
- **`course.service.ts`** - Gestão de cursos
- **`enrollment.service.ts`** - Gestão de matrículas e inscrições

**Exemplo de uso:**
```typescript
import { authService } from '@/lib/api/services/auth.service';
import { courseService } from '@/lib/api/services/course.service';

// Login
await authService.login({ email: 'user@example.com', password: 'password' });

// Buscar cursos
const courses = await courseService.listCourses();
```

### 4. Contexto de Autenticação (`src/contexts/AuthContext.tsx`)

Provider React para gerenciar estado de autenticação globalmente.

**Uso:**
```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // ...
}
```

### 5. Proteção de Rotas (`src/components/ProtectedRoute.tsx`)

Componente para proteger rotas que requerem autenticação:

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <div>Conteúdo protegido</div>
    </ProtectedRoute>
  );
}
```

## 🚀 Como Usar

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_USERS_API_URL=http://localhost:8001/api
NEXT_PUBLIC_SCHOOL_API_URL=http://localhost:8002/api
NEXT_PUBLIC_STUDENT_API_URL=http://localhost:8003/api
NEXT_PUBLIC_ADMIN_API_URL=http://localhost:8004/api
NEXT_PUBLIC_API_SECRET=your-api-secret-here
```

### 2. Usar Autenticação

O `AuthProvider` já está configurado no `layout.tsx`. Use o hook `useAuth` em qualquer componente:

```typescript
"use client";

import { useAuth } from '@/hooks/useAuth';

export default function MyPage() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Por favor, faça login</div>;
  }
  
  return (
    <div>
      <p>Olá, {user?.name}!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

### 3. Fazer Requisições às APIs

#### Exemplo: Listar Cursos

```typescript
"use client";

import { useState, useEffect } from 'react';
import { courseService } from '@/lib/api/services/course.service';
import { Course } from '@/lib/api/services/course.service';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const data = await courseService.listCourses();
        setCourses(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar cursos');
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>Cursos</h1>
      {courses.map(course => (
        <div key={course.id}>{course.name}</div>
      ))}
    </div>
  );
}
```

#### Exemplo: Aprovar Matrícula

```typescript
"use client";

import { enrollmentService } from '@/lib/api/services/enrollment.service';
import { toast } from 'sonner';

async function handleApprove(enrollmentId: string) {
  try {
    await enrollmentService.approveEnrollment(enrollmentId);
    toast.success('Matrícula aprovada com sucesso!');
    // Atualizar lista...
  } catch (error: any) {
    toast.error(error.message || 'Erro ao aprovar matrícula');
  }
}
```

## 📚 APIs Disponíveis

### Autenticação (`auth.service.ts`)
- `login(credentials)` - Fazer login
- `logout()` - Fazer logout
- `getMe()` - Obter dados do usuário autenticado
- `isAuthenticated()` - Verificar se está autenticado

### Escolas (`school.service.ts`)
- `listSchools()` - Listar escolas (requer API Secret)
- `getSchool(id)` - Obter detalhes de uma escola
- `getSchoolCourses(id)` - Listar cursos de uma escola
- `approveSchool(id)` - Aprovar escola
- `rejectSchool(id, reason?)` - Rejeitar escola

### Cursos (`course.service.ts`)
- `listCourses()` - Listar cursos
- `getCourse(id, includeSubjects?, includeExams?)` - Obter detalhes do curso
- `getCourseSubjects(courseId)` - Listar disciplinas
- `getAdmissionExams(courseId)` - Listar exames de admissão

### Matrículas (`enrollment.service.ts`)
- `listEnrollments(courseId)` - Listar matrículas de um curso
- `approveEnrollment(id)` - Aprovar matrícula
- `rejectEnrollment(id, reason?)` - Rejeitar matrícula
- `approveExamRegistration(id)` - Aprovar inscrição em exame
- `rejectExamRegistration(id, reason?)` - Rejeitar inscrição em exame
- `listExamRegistrations(courseId, examId)` - Listar inscrições em exame

## 🔒 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação:

1. **Login**: O token é salvo automaticamente no `localStorage`
2. **Requisições**: O token é enviado automaticamente no header `Authorization: Bearer <token>`
3. **Refresh**: Se o token expirar, o sistema tenta renová-lo automaticamente
4. **Logout**: Remove os tokens do `localStorage`

## 🛡️ Proteção de Rotas

Para proteger uma rota, envolva o conteúdo com `ProtectedRoute`:

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <div>Conteúdo protegido</div>
    </ProtectedRoute>
  );
}
```

## 📝 Notas Importantes

1. **API Secret**: Algumas rotas requerem `API_SECRET` no header `X-API-Secret` (configurado automaticamente)
2. **CORS**: Certifique-se de que as APIs Laravel estão configuradas para aceitar requisições do frontend
3. **Erros**: Todos os erros são tratados e podem ser capturados com try/catch
4. **Loading States**: Sempre gerencie estados de loading para melhor UX

## 🔧 Troubleshooting

### Erro: "Token não fornecido ou inválido"
- Verifique se o usuário está autenticado
- Verifique se o token não expirou
- Tente fazer login novamente

### Erro: "CORS policy"
- Configure CORS nas APIs Laravel para aceitar requisições do frontend
- Verifique se as URLs estão corretas

### Erro: "Network request failed"
- Verifique se as APIs estão rodando
- Verifique as URLs nas variáveis de ambiente
- Verifique a conexão de rede

