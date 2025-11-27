# 📝 Exemplo de Integração - Página de Candidaturas

Este documento mostra como integrar dados reais da API na página de candidaturas.

## Antes (com dados mockados)

```typescript
const mockData = [
  {
    id: 1,
    name: "Maria Silva Santos",
    enrollmentNumber: "2024001",
    course: "Engenharia Informática",
    status: "Ativa",
    // ...
  },
];

export default function Candidaturas() {
  return (
    <DynamicTable data={mockData} />
  );
}
```

## Depois (com dados reais da API)

```typescript
"use client";

import { useState, useEffect } from 'react';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useCourses } from '@/hooks/useCourses';
import { courseService } from '@/lib/api/services/course.service';
import DynamicTable from '@/components/data-table';
import { toast } from 'sonner';

export default function Candidaturas() {
  const { courses, loading: coursesLoading } = useCourses();
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();
  const { enrollments, loading, error, approveEnrollment, rejectEnrollment } = useEnrollments({
    courseId: selectedCourseId,
    autoFetch: !!selectedCourseId,
  });

  // Transforma dados da API para o formato esperado pela tabela
  const tableData = enrollments.map((enrollment) => ({
    id: enrollment.id,
    name: enrollment.student?.name || 'N/A',
    enrollmentNumber: enrollment.student_id,
    course: enrollment.course?.name || 'N/A',
    enrollmentDate: enrollment.enrollment_date || enrollment.created_at,
    status: enrollment.status === 'pending' ? 'Pendente' : 
            enrollment.status === 'approved' ? 'Aprovada' : 'Rejeitada',
    email: enrollment.student?.email || 'N/A',
    phone: enrollment.student?.phone || 'N/A',
  }));

  const handleApprove = async (enrollmentId: string) => {
    try {
      await approveEnrollment(enrollmentId);
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleReject = async (enrollmentId: string) => {
    try {
      const reason = prompt('Motivo da rejeição:');
      if (reason) {
        await rejectEnrollment(enrollmentId, reason);
      }
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  if (coursesLoading) {
    return <div>Carregando cursos...</div>;
  }

  return (
    <div>
      {/* Seletor de curso */}
      <select 
        value={selectedCourseId || ''} 
        onChange={(e) => setSelectedCourseId(e.target.value)}
        className="mb-4"
      >
        <option value="">Selecione um curso</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>

      {/* Tabela de candidaturas */}
      {loading ? (
        <div>Carregando candidaturas...</div>
      ) : error ? (
        <div>Erro: {error}</div>
      ) : (
        <DynamicTable
          title="Candidaturas Recentes"
          description="Gerencie e visualize as candidaturas mais recentes"
          data={tableData}
          fieldLabels={{
            name: "Nome do Candidato",
            enrollmentNumber: "Nº Candidatura",
            course: "Curso",
            enrollmentDate: "Data de Candidatura",
            status: "Estado",
            email: "Email de Contacto",
          }}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
```

## Passos para Integrar Outras Páginas

1. **Identifique a API necessária**
   - Verifique qual serviço fornece os dados (ex: `enrollmentService`, `courseService`)

2. **Crie ou use um hook customizado**
   - Use hooks existentes como `useEnrollments`, `useCourses`
   - Ou crie novos hooks seguindo o mesmo padrão

3. **Transforme os dados da API**
   - Adapte o formato da API para o formato esperado pelos componentes
   - Mapeie status, datas, etc.

4. **Adicione tratamento de erros**
   - Use `toast` para notificações
   - Mostre estados de loading
   - Trate erros graciosamente

5. **Teste a integração**
   - Verifique se os dados são carregados corretamente
   - Teste ações como aprovar/rejeitar
   - Verifique tratamento de erros

## Hooks Disponíveis

- `useAuth()` - Autenticação e dados do usuário
- `useEnrollments(options)` - Matrículas e candidaturas
- `useCourses()` - Lista de cursos

## Serviços Disponíveis

- `authService` - Autenticação
- `courseService` - Cursos
- `enrollmentService` - Matrículas
- `schoolService` - Escolas

Veja `INTEGRACAO_API.md` para mais detalhes sobre os serviços.

