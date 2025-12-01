"use client"

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import DynamicTable from "@/components/data-table";
import AccessExams from "@/components/access-exams";
import ExamResults from "@/components/exam-results";
import ExportData from "@/components/export-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useCourses } from "@/hooks/useCourses";
import { toast } from "sonner";
import { Edit } from "lucide-react";

export default function Candidaturas() {
  const { courses, loading: coursesLoading } = useCourses();
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const { enrollments, loading, error, approveEnrollment, rejectEnrollment, updateEnrollment } = useEnrollments({
    courseId: selectedCourseId || undefined,
    autoFetch: !!selectedCourseId,
  });
  const [editingEnrollment, setEditingEnrollment] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ class: '', student_phone: '', student_name: '', student_email: '' });
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectingEnrollmentId, setRejectingEnrollmentId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Garante que courses seja sempre um array
  const coursesArray = Array.isArray(courses) ? courses : [];

  // Transforma dados da API para o formato esperado pela tabela
  const tableData = enrollments.map((enrollment) => ({
    id: enrollment.id,
    photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${enrollment.student?.name || enrollment.student_name || enrollment.id}`,
    name: enrollment.student?.name || enrollment.student_name || 'N/A',
    enrollmentNumber: enrollment.student_id || enrollment.id,
    course: enrollment.course?.name || 'N/A',
    class: enrollment.class || '',
    enrollmentDate: enrollment.enrollment_date || enrollment.created_at,
    status: enrollment.status === 'pending' ? 'Pendente' : 
            enrollment.status === 'approved' ? 'Aprovada' : 'Rejeitada',
    phone: enrollment.student?.phone || enrollment.student_phone || 'N/A',
    email: enrollment.student?.email || enrollment.student_email || 'N/A',
    enrollment: enrollment, // Guarda o objeto completo para edição
  }));

  const handleApprove = async (enrollmentId: string) => {
    try {
      await approveEnrollment(enrollmentId);
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleReject = async (enrollmentId: string) => {
    setRejectingEnrollmentId(enrollmentId);
    setRejectDialogOpen(true);
  };
  
  const confirmReject = async () => {
    if (!rejectingEnrollmentId) return;
    
    try {
      await rejectEnrollment(rejectingEnrollmentId, rejectReason || undefined);
      setRejectDialogOpen(false);
      setRejectingEnrollmentId(null);
      setRejectReason('');
    } catch (error) {
      // Erro já é tratado no hook
    }
  };
  
  const cancelReject = () => {
    setRejectDialogOpen(false);
    setRejectingEnrollmentId(null);
    setRejectReason('');
  };

  const handleEdit = (enrollment: any) => {
    setEditingEnrollment(enrollment.id);
    setEditForm({
      class: enrollment.class || '',
      student_phone: enrollment.student_phone || enrollment.student?.phone || '',
      student_name: enrollment.student_name || enrollment.student?.name || '',
      student_email: enrollment.student_email || enrollment.student?.email || '',
    });
  };

  const handleSaveEdit = async () => {
    if (!editingEnrollment) return;
    
    try {
      await updateEnrollment(editingEnrollment, editForm);
      setEditingEnrollment(null);
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleCancelEdit = () => {
    setEditingEnrollment(null);
    setEditForm({ class: '', student_phone: '', student_name: '', student_email: '' });
  };

  const handleSaveFromTable = async (item: any, formData: any) => {
    if (item.enrollment) {
      await updateEnrollment(item.enrollment.id, formData);
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
              <NavbarH />
              {/* Conteúdo Principal com Tabs */}
              <div className="flex-1 p-6">
                <Tabs defaultValue="candidatos" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="candidatos">Candidatos</TabsTrigger>
                    <TabsTrigger value="exames">Exames de Acesso</TabsTrigger>
                    <TabsTrigger value="resultados">Resultados</TabsTrigger>
                    <TabsTrigger value="exportar">Exportar Dados</TabsTrigger>
                  </TabsList>
                  <TabsContent value="candidatos">
                    <div className="space-y-4">
                      {/* Seletor de Curso */}
                      <div className="flex items-center gap-4">
                        <label className="text-sm font-medium">Selecione o curso:</label>
                        <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                          <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Selecione um curso" />
                          </SelectTrigger>
                          <SelectContent>
                            {coursesLoading ? (
                              <SelectItem value="loading" disabled>Carregando cursos...</SelectItem>
                            ) : coursesArray.length === 0 ? (
                              <SelectItem value="empty" disabled>Nenhum curso disponível</SelectItem>
                            ) : (
                              coursesArray.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Tabela de Candidaturas */}
                      {!selectedCourseId ? (
                        <div className="text-center py-12 text-gray-500">
                          Selecione um curso para visualizar as candidaturas
                        </div>
                      ) : loading ? (
                        <div className="text-center py-12">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
                          <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando candidaturas...</p>
                        </div>
                      ) : error ? (
                        <div className="text-center py-12 text-red-500">
                          Erro: {error}
                        </div>
                      ) : tableData.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          Nenhuma candidatura encontrada para este curso
                        </div>
                      ) : (
                        <DynamicTable
                          title="Candidaturas Recentes"
                          description="Gerencie e visualize as candidaturas mais recentes"
                          addButtonText="Nova Candidatura"
                          searchPlaceholder="Buscar por nome ou candidatura..."
                          data={tableData}
                          fieldLabels={{
                            name: "Nome do Candidato",
                            enrollmentNumber: "Nº Candidatura",
                            course: "Curso",
                            class: "Turma",
                            enrollmentDate: "Data de Candidatura",
                            status: "Estado",
                            phone: "Telefone",
                            email: "Email de Contacto",
                          }}
                          onAddNew={() => toast.info("Funcionalidade em desenvolvimento")}
                          onSave={handleSaveFromTable}
                          onApprove={async (item) => {
                            if (item.enrollment) {
                              await handleApprove(item.enrollment.id);
                            }
                          }}
                          onReject={async (item) => {
                            if (item.enrollment) {
                              await handleReject(item.enrollment.id);
                            }
                          }}
                        />
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="exames">
                    <AccessExams />
                  </TabsContent>
                  <TabsContent value="resultados">
                    <ExamResults />
                  </TabsContent>
                  <TabsContent value="exportar">
                    <ExportData />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      
      {/* Diálogo de Rejeição */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeitar Candidatura</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja rejeitar esta candidatura? Você pode adicionar um motivo (opcional).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reject-reason">Motivo da rejeição (opcional)</Label>
              <Input
                id="reject-reason"
                placeholder="Digite o motivo da rejeição..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cancelReject}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmReject}>
              Confirmar Rejeição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
