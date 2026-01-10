"use client"

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DynamicTable from "@/components/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useCourses } from "@/hooks/useCourses";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Matriculas() {
  const { courses, loading: coursesLoading } = useCourses();
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  
  // Buscar apenas matrículas aprovadas
  const { enrollments, loading, error, updateEnrollment } = useEnrollments({
    courseId: selectedCourseId || undefined,
    autoFetch: !!selectedCourseId,
    status: 'approved', // Apenas matrículas aprovadas
  });

  // Garante que courses seja sempre um array
  const coursesArray = Array.isArray(courses) ? courses : [];

  // Transformar dados da API para o formato esperado pela tabela
  // A API já filtra apenas matrículas aprovadas quando status='approved'
  const tableData = enrollments.map((enrollment, index) => ({
      id: parseInt(enrollment.id, 10) || index + 1, // Converte string para number, usa index como fallback
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${enrollment.student?.name || enrollment.student_name || enrollment.id}`,
      name: enrollment.student?.name || enrollment.student_name || 'N/A',
      enrollmentNumber: enrollment.student_id || enrollment.id,
      course: enrollment.course?.name || 'N/A',
      class: enrollment.class || '',
      enrollmentDate: enrollment.enrollment_date || enrollment.created_at,
      status: 'Ativa', // Matrículas aprovadas são sempre "Ativa"
      phone: enrollment.student?.phone || enrollment.student_phone || 'N/A',
      email: enrollment.student?.email || enrollment.student_email || 'N/A',
      enrollment: enrollment, // Guarda o objeto completo para edição
    })) as Array<{
      id: number;
      photo: string;
      name: string;
      enrollmentNumber: string;
      course: string;
      class: string;
      enrollmentDate: string;
      status: string;
      phone: string;
      email: string;
      enrollment: typeof enrollments[0];
    }>;

  const handleSaveFromTable = async (item: any, formData: any) => {
    const extendedItem = item as typeof item & { enrollment?: typeof enrollments[0] };
    if (extendedItem.enrollment) {
      try {
        await updateEnrollment(extendedItem.enrollment.id, formData);
      } catch (error) {
        // Erro já é tratado no hook
      }
    }
  };

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              {/* <NavbarH /> */}
            </div>
          </div>
        </SidebarInset>
        
        <div className="container mx-auto p-6 space-y-6">
          {/* Seletor de Curso */}
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-xs">
              <label className="text-sm font-medium mb-2 block">
                Filtrar por Curso
              </label>
              <Select
                value={selectedCourseId}
                onValueChange={setSelectedCourseId}
                disabled={coursesLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um curso" />
                </SelectTrigger>
                <SelectContent>
                  {coursesLoading ? (
                    <SelectItem value="loading" disabled>
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Carregando cursos...</span>
                      </div>
                    </SelectItem>
                  ) : coursesArray.length === 0 ? (
                    <SelectItem value="no-courses" disabled>
                      Nenhum curso disponível
                    </SelectItem>
                  ) : (
                    <>
                      {coursesArray.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabela de Matrículas */}
          {!selectedCourseId ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Selecione um curso para visualizar as matrículas aprovadas</p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Carregando matrículas...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-destructive">
              <p>Erro ao carregar matrículas: {error}</p>
            </div>
          ) : tableData.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhuma matrícula aprovada encontrada para este curso</p>
            </div>
          ) : (
            <DynamicTable
              title="Matrículas - Ano lectivo 2025/26"
              description="Gerencie e visualize as matrículas aprovadas"
              addButtonText="Nova matrícula"
              searchPlaceholder="Buscar por nome ou nº de matrícula..."
              data={tableData}
              fieldLabels={{
                name: "Nome Completo",
                enrollmentNumber: "Nº Matrícula",
                course: "Curso",
                class: "Turma",
                enrollmentDate: "Data de matrícula",
                status: "Estado",
                phone: "Telefone",
                email: "Email",
              }}
              onAddNew={() => toast.info("Funcionalidade em desenvolvimento")}
              onSave={handleSaveFromTable}
            />
          )}
        </div>
      </SidebarProvider>
    </>
  );
}
