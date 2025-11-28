"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useClasses } from "@/hooks/useClasses";
import { useCourses } from "@/hooks/useCourses";
import { useTeachers } from "@/hooks/useTeachers";
import { courseService } from "@/lib/api/services/course.service";
import { enrollmentService } from "@/lib/api/services/enrollment.service";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Users,
  BookOpen,
  Calendar,
  GraduationCap,
  Eye,
  UserCheck,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Curso {
  id: string;
  nome: string;
}

interface Docente {
  id: string;
  nome: string;
  disciplina: string;
}

interface Estudante {
  id: string;
  nome: string;
  numero: string;
  email: string;
}

interface Disciplina {
  id: string;
  nome: string;
  codigo: string;
}

interface Turma {
  id: string;
  nome: string;
  curso: string;
  cursoNome: string;
  semestre: number;
  anoLetivo: string;
  docentes: string[];
  docentesNomes: string[];
  estudantes: string[];
  estado: "Ativa" | "Concluída";
  disciplinas: string[];
  limiteEstudantes?: number;
  class?: any; // Guarda o objeto original da API
}

export default function Academica() {
  const { classes, loading: classesLoading, createClass, updateClass, deleteClass, fetchClasses } = useClasses();
  const { courses, loading: coursesLoading } = useCourses();
  const { teachers, loading: teachersLoading } = useTeachers();
  
  // Estados para disciplinas e estudantes (carregados dinamicamente)
  const [subjectsMap, setSubjectsMap] = useState<Record<string, Disciplina[]>>({});
  const [enrollmentsMap, setEnrollmentsMap] = useState<Record<string, Estudante[]>>({});
  const [loadingSubjects, setLoadingSubjects] = useState<Record<string, boolean>>({});
  const [loadingEnrollments, setLoadingEnrollments] = useState<Record<string, boolean>>({});

  // Converter dados da API para o formato esperado
  const cursos: Curso[] = useMemo(() => {
    return Array.isArray(courses) ? courses.map(c => ({
      id: c.id,
      nome: c.name,
    })) : [];
  }, [courses]);

  const docentes: Docente[] = useMemo(() => {
    return Array.isArray(teachers) ? teachers.map(t => ({
      id: t.id,
      nome: t.name,
      disciplina: t.department || 'Não definido',
    })) : [];
  }, [teachers]);

  // Carregar disciplinas de um curso
  const loadCourseSubjects = async (courseId: string) => {
    if (subjectsMap[courseId] || loadingSubjects[courseId]) return;
    
    setLoadingSubjects(prev => ({ ...prev, [courseId]: true }));
    try {
      const subjects = await courseService.getCourseSubjects(courseId);
      // Garantir que subjects seja sempre um array
      const subjectsArray = Array.isArray(subjects) ? subjects : [];
      setSubjectsMap(prev => ({
        ...prev,
        [courseId]: subjectsArray.map(s => ({
          id: s.id,
          nome: s.name,
          codigo: s.code || '',
        })),
      }));
    } catch (error: any) {
      toast.error(`Erro ao carregar disciplinas: ${error.message}`);
      // Em caso de erro, definir como array vazio
      setSubjectsMap(prev => ({
        ...prev,
        [courseId]: [],
      }));
    } finally {
      setLoadingSubjects(prev => ({ ...prev, [courseId]: false }));
    }
  };

  // Carregar estudantes matriculados de um curso
  const loadCourseEnrollments = async (courseId: string) => {
    if (enrollmentsMap[courseId] || loadingEnrollments[courseId]) return;
    
    setLoadingEnrollments(prev => ({ ...prev, [courseId]: true }));
    try {
      const data = await enrollmentService.listEnrollments(courseId, 'approved');
      const enrollments = data.enrollments || [];
      setEnrollmentsMap(prev => ({
        ...prev,
        [courseId]: enrollments.map(e => ({
          id: e.id, // enrollment_id
          nome: e.student_name || e.student?.name || 'N/A',
          numero: e.student_id || e.id,
          email: e.student_email || e.student?.email || 'N/A',
        })),
      }));
    } catch (error: any) {
      toast.error(`Erro ao carregar estudantes: ${error.message}`);
    } finally {
      setLoadingEnrollments(prev => ({ ...prev, [courseId]: false }));
    }
  };

  // Converter classes da API para Turma
  const turmas: Turma[] = useMemo(() => {
    return classes.map(cls => {
      const course = courses.find(c => c.id === cls.course_id);
      const teacherIds = Array.isArray(cls.teachers) ? cls.teachers.map(t => t.teacher_id) : [];
      const teacherNames = Array.isArray(cls.teachers) ? cls.teachers.map(t => {
        const teacher = teachers.find(te => te.id === t.teacher_id);
        return teacher?.name || 'N/A';
      }) : [];
      
      // Garantir que subjects seja sempre um array
      const subjectsArray = Array.isArray(cls.subjects) ? cls.subjects : [];
      const studentsArray = Array.isArray(cls.students) ? cls.students : [];
      
      return {
        id: cls.id,
        nome: cls.name,
        curso: cls.course_id,
        cursoNome: cls.course_name || course?.name || 'N/A',
        semestre: cls.semester,
        anoLetivo: cls.academic_year,
        docentes: teacherIds,
        docentesNomes: teacherNames,
        estudantes: studentsArray.map(s => s.enrollment_id || s.id).filter(Boolean),
        estado: cls.status === 'active' ? 'Ativa' : 'Concluída',
        disciplinas: subjectsArray.map(s => s.id).filter(Boolean),
        limiteEstudantes: cls.max_students,
        class: cls, // Guarda o objeto original
      } as Turma & { class?: any };
    });
  }, [classes, courses, teachers]);

  const estudantesOrdenados = useMemo(() => {
    // Combinar todos os estudantes de todos os cursos
    const allStudents = Object.values(enrollmentsMap).flat();
    return [...allStudents].sort((a, b) =>
      a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" })
    );
  }, [enrollmentsMap]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [turmaToDelete, setTurmaToDelete] = useState<string | null>(null);
  const [detailsDialog, setDetailsDialog] = useState<Turma | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCurso, setFilterCurso] = useState("todos");
  const [filterEstado, setFilterEstado] = useState("todos");

  const [formData, setFormData] = useState<Turma>({
    id: "",
    nome: "",
    curso: "",
    cursoNome: "",
    semestre: 1,
    anoLetivo: "",
    docentes: [],
    docentesNomes: [],
    estudantes: [],
    estado: "Ativa",
    disciplinas: [],
  });

  // Carregar disciplinas e estudantes quando o curso mudar no formulário
  useEffect(() => {
    if (formData.curso && isSheetOpen) {
      loadCourseSubjects(formData.curso);
      loadCourseEnrollments(formData.curso);
    }
  }, [formData.curso, isSheetOpen]);

  const handleCreateTurma = () => {
    setIsEditing(false);

    // Define nova turma
    setFormData({
      id: "",
      nome: "",
      curso: "",
      cursoNome: "",
      semestre: 1,
      anoLetivo:
        new Date().getFullYear() + "/" + (new Date().getFullYear() + 1),
      docentes: [],
      docentesNomes: [],
      estudantes: [],
      estado: "Ativa",
      disciplinas: [],
      limiteEstudantes: 30, // valor padrão inicial
    });

    setIsSheetOpen(true);
  };

  const handleEditTurma = async (turma: Turma) => {
    setIsEditing(true);
    
    // Carregar disciplinas e estudantes do curso se necessário
    if (turma.curso) {
      await loadCourseSubjects(turma.curso);
      await loadCourseEnrollments(turma.curso);
    }
    
    setFormData(turma);
    setIsSheetOpen(true);
  };

  const handleSaveTurma = async () => {
    if (!formData.nome || !formData.curso || !formData.anoLetivo) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    try {
      const classData = {
        name: formData.nome,
        course_id: formData.curso,
        semester: formData.semestre,
        academic_year: formData.anoLetivo,
        status: formData.estado === "Ativa" ? "active" : "completed",
        max_students: formData.limiteEstudantes || undefined,
        student_ids: formData.estudantes.length > 0 ? formData.estudantes : undefined,
        subject_ids: formData.disciplinas.length > 0 ? formData.disciplinas : undefined,
      };

      if (isEditing) {
        await updateClass(formData.id, classData);
      } else {
        await createClass(classData);
      }

      setIsSheetOpen(false);
      
      // Recarregar disciplinas e estudantes se necessário
      if (formData.curso) {
        await loadCourseSubjects(formData.curso);
        await loadCourseEnrollments(formData.curso);
      }
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleDeleteTurma = async (id: string) => {
    try {
      await deleteClass(id);
      setTurmaToDelete(null);
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const toggleDocente = (docenteId: string) => {
    setFormData((prev) => ({
      ...prev,
      docentes: prev.docentes.includes(docenteId)
        ? prev.docentes.filter((id) => id !== docenteId)
        : [...prev.docentes, docenteId],
    }));
  };

  const toggleEstudante = (estudanteId: string) => {
    setFormData((prev) => {
      const jaSelecionado = prev.estudantes.includes(estudanteId);

      // Se for tentar adicionar e já atingiu o limite
      if (
        !jaSelecionado &&
        prev.limiteEstudantes &&
        prev.estudantes.length >= prev.limiteEstudantes
      ) {
        alert(`Limite de ${prev.limiteEstudantes} estudantes atingido.`);
        return prev;
      }

      return {
        ...prev,
        estudantes: jaSelecionado
          ? prev.estudantes.filter((id) => id !== estudanteId)
          : [...prev.estudantes, estudanteId],
      };
    });
  };

  const toggleDisciplina = (disciplinaId: string) => {
    setFormData((prev) => ({
      ...prev,
      disciplinas: prev.disciplinas.includes(disciplinaId)
        ? prev.disciplinas.filter((id) => id !== disciplinaId)
        : [...prev.disciplinas, disciplinaId],
    }));
  };

  const turmasFiltradas = turmas.filter((turma) => {
    const matchSearch =
      turma.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.cursoNome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCurso = filterCurso === "todos" || turma.curso === filterCurso;
    const matchEstado =
      filterEstado === "todos" || turma.estado === filterEstado;

    return matchSearch && matchCurso && matchEstado;
  });

  const totalTurmas = turmas.length;
  const turmasAtivas = turmas.filter((t) => t.estado === "Ativa").length;
  const totalEstudantes = turmas.reduce(
    (acc, t) => acc + t.estudantes.length,
    0
  );

  return (
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
        {/* <SiteHeader /> */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <NavbarH />
            <div className="min-h-screen">
              <div className="max-w-7xl mx-auto p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold">Gestão de Turmas</h1>
                    <p className="text-gray-500 mt-1">
                      Gerencie turmas, docentes e estudantes
                    </p>
                  </div>
                  <Button onClick={handleCreateTurma} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Turma
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total de Turmas
                      </CardTitle>
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalTurmas}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Turmas Ativas
                      </CardTitle>
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{turmasAtivas}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total de Estudantes
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {totalEstudantes}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Pesquisar turmas..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select
                        value={filterCurso}
                        onValueChange={setFilterCurso}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrar por curso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os Cursos</SelectItem>
                          {cursos.map((curso) => (
                            <SelectItem key={curso.id} value={curso.id}>
                              {curso.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={filterEstado}
                        onValueChange={setFilterEstado}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrar por estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">
                            Todos os Estados
                          </SelectItem>
                          <SelectItem value="Ativa">Ativa</SelectItem>
                          <SelectItem value="Concluída">Concluída</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {turmasFiltradas.map((turma) => (
                    <Card
                      key={turma.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {turma.nome}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {turma.cursoNome}
                            </CardDescription>
                          </div>
                          <Badge
                            variant={
                              turma.estado === "Ativa" ? "default" : "secondary"
                            }
                          >
                            {turma.estado}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Ano Letivo:</span>
                            <span className="font-medium">
                              {turma.anoLetivo}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Semestre:</span>
                            <span className="font-medium">
                              {turma.semestre}º
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Estudantes:</span>
                            <span className="font-medium">
                              {turma.estudantes.length}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Docentes:</span>
                            <div className="mt-1 space-y-1">
                              {turma.docentesNomes
                                .slice(0, 2)
                                .map((nome, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs bg-transparent px-2 py-1 rounded"
                                  >
                                    {nome}
                                  </div>
                                ))}
                              {turma.docentesNomes.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{turma.docentesNomes.length - 2} mais
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setDetailsDialog(turma)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Detalhes
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTurma(turma)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setTurmaToDelete(turma.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {turmasFiltradas.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-gray-500">Nenhuma turma encontrada</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="sm:max-w-2xl overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      {isEditing ? "Editar Turma" : "Nova Turma"}
                    </SheetTitle>
                    <SheetDescription>
                      Preencha os dados da turma abaixo
                    </SheetDescription>
                  </SheetHeader>

                  <div className="space-y-4 py-4 pl-7 pr-5">
                    {/* 🧭 Dados principais da turma */}
                    <div className="space-y-4">
                      {/* Nome da Turma */}
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome da Turma *</Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) =>
                            setFormData({ ...formData, nome: e.target.value })
                          }
                          placeholder="Ex: 1º Ano - A"
                        />
                      </div>

                      {/* Curso, Semestre e Estado na mesma linha */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Curso */}
                        <div className="space-y-2">
                          <Label htmlFor="curso">Curso *</Label>
                          <Select
                            value={formData.curso}
                            onValueChange={(value) =>
                              setFormData({ ...formData, curso: value })
                            }
                          >
                            <SelectTrigger id="curso">
                              <SelectValue placeholder="Selecione o curso" />
                            </SelectTrigger>
                            <SelectContent>
                              {cursos.map((curso) => (
                                <SelectItem key={curso.id} value={curso.id}>
                                  {curso.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Semestre */}
                        <div className="space-y-2">
                          <Label htmlFor="semestre">Semestre *</Label>
                          <Select
                            value={formData.semestre.toString()}
                            onValueChange={(value) =>
                              setFormData({
                                ...formData,
                                semestre: parseInt(value),
                              })
                            }
                          >
                            <SelectTrigger id="semestre">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                <SelectItem key={sem} value={sem.toString()}>
                                  {sem}º
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Estado */}
                        <div className="space-y-2">
                          <Label htmlFor="estado">Estado</Label>
                          <Select
                            value={formData.estado}
                            onValueChange={(value: "Ativa" | "Concluída") =>
                              setFormData({ ...formData, estado: value })
                            }
                          >
                            <SelectTrigger id="estado">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ativa">Ativa</SelectItem>
                              <SelectItem value="Concluída">
                                Concluída
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Ano Letivo */}
                      <div className="space-y-2">
                        <Label htmlFor="anoLetivo">Ano Letivo *</Label>
                        <Input
                          id="anoLetivo"
                          value={formData.anoLetivo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              anoLetivo: e.target.value,
                            })
                          }
                          placeholder="Ex: 2024/2025"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="limiteEstudantes">
                        Número máximo de estudantes
                      </Label>
                      <Input
                        id="limiteEstudantes"
                        type="number"
                        min={1}
                        value={formData.limiteEstudantes || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            limiteEstudantes: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="Ex: 30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Disciplinas</Label>
                      {formData.curso ? (
                        <Card>
                          <CardContent className="pt-4 max-h-40 overflow-y-auto">
                            {loadingSubjects[formData.curso] ? (
                              <div className="text-center py-4 text-sm text-gray-500">
                                Carregando disciplinas...
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {Array.isArray(subjectsMap[formData.curso]) && subjectsMap[formData.curso].length > 0 ? (
                                  subjectsMap[formData.curso].map((disciplina) => (
                                    <label
                                      key={disciplina.id}
                                      className="flex items-center gap-2 p-2 hover:bg-gray-50 hover:text-[#09090b] rounded cursor-pointer"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={formData.disciplinas.includes(
                                          disciplina.id
                                        )}
                                        onChange={() =>
                                          toggleDisciplina(disciplina.id)
                                        }
                                        className="rounded"
                                      />
                                      <div className="flex-1">
                                        <div className="font-medium text-sm">
                                          {disciplina.nome}
                                        </div>
                                        {disciplina.codigo && (
                                          <div className="text-xs text-gray-500">
                                            {disciplina.codigo}
                                          </div>
                                        )}
                                      </div>
                                    </label>
                                  ))
                                ) : (
                                  <div className="text-center py-4 text-sm text-gray-500">
                                    Nenhuma disciplina disponível. Selecione um curso primeiro.
                                  </div>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ) : (
                        <Card>
                          <CardContent className="pt-4">
                            <div className="text-center py-4 text-sm text-gray-500">
                              Selecione um curso para ver as disciplinas
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Docentes Atribuídos</Label>
                      <Card>
                        <CardContent className="pt-4 max-h-48 overflow-y-auto">
                          <div className="space-y-2">
                            {formData.docentes.length > 0 ? (
                              formData.docentes.map((teacherId) => {
                                const teacher = teachers.find(t => t.id === teacherId);
                                return teacher ? (
                                  <div
                                    key={teacher.id}
                                    className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                                  >
                                    <div className="flex-1">
                                      <div className="font-medium text-sm">
                                        {teacher.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {teacher.department || 'Não definido'}
                                      </div>
                                    </div>
                                  </div>
                                ) : null;
                              })
                            ) : (
                              <div className="text-center py-4 text-sm text-gray-500">
                                Nenhum docente atribuído. Os docentes são atribuídos na página de "Atribuições de Professores".
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      <p className="text-xs text-gray-500">
                        Para atribuir docentes, use a página "Turmas e Docentes" no menu Docentes.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Estudantes ({formData.estudantes.length} selecionados)
                        {formData.limiteEstudantes && (
                          <span className="text-xs text-gray-500 ml-2">
                            (Limite: {formData.limiteEstudantes})
                          </span>
                        )}
                      </Label>
                      {formData.curso ? (
                        <Card>
                          <CardContent className="pt-4 max-h-64 overflow-y-auto">
                            {loadingEnrollments[formData.curso] ? (
                              <div className="text-center py-4 text-sm text-gray-500">
                                Carregando estudantes...
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {Array.isArray(enrollmentsMap[formData.curso]) && enrollmentsMap[formData.curso].length > 0 ? (
                                  enrollmentsMap[formData.curso]
                                    .sort((a, b) => a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" }))
                                    .map((estudante) => (
                                      <TooltipProvider key={estudante.id}>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <label className="flex items-center gap-2 p-2 hover:bg-gray-50 hover:text-[#09090b] rounded cursor-pointer">
                                              <input
                                                type="checkbox"
                                                checked={formData.estudantes.includes(
                                                  estudante.id
                                                )}
                                                onChange={() =>
                                                  toggleEstudante(estudante.id)
                                                }
                                                disabled={
                                                  !formData.estudantes.includes(estudante.id) &&
                                                  formData.limiteEstudantes !== undefined &&
                                                  formData.estudantes.length >= formData.limiteEstudantes
                                                }
                                                className="rounded"
                                              />
                                              <div className="flex-1 font-medium text-sm">
                                                {estudante.nome}
                                              </div>
                                            </label>
                                          </TooltipTrigger>

                                          <TooltipContent>
                                            <div className="text-xs">
                                              <p>
                                                <strong>Número:</strong>{" "}
                                                {estudante.numero}
                                              </p>
                                              <p>
                                                <strong>Email:</strong>{" "}
                                                {estudante.email}
                                              </p>
                                            </div>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    ))
                                ) : (
                                  <div className="text-center py-4 text-sm text-gray-500">
                                    Nenhum estudante matriculado neste curso
                                  </div>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ) : (
                        <Card>
                          <CardContent className="pt-4">
                            <div className="text-center py-4 text-sm text-gray-500">
                              Selecione um curso para ver os estudantes
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>

                  <SheetFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveTurma}>
                      {isEditing ? "Salvar Alterações" : "Criar Turma"}
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <Dialog
                open={!!detailsDialog}
                onOpenChange={async (open) => {
                  if (!open) {
                    setDetailsDialog(null);
                  } else if (detailsDialog?.curso) {
                    // Carregar disciplinas e estudantes quando o dialog abrir
                    await loadCourseSubjects(detailsDialog.curso);
                    await loadCourseEnrollments(detailsDialog.curso);
                  }
                }}
              >
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      Detalhes da Turma: {detailsDialog?.nome}
                    </DialogTitle>
                    <DialogDescription>
                      {detailsDialog?.cursoNome} • {detailsDialog?.anoLetivo}
                    </DialogDescription>
                  </DialogHeader>

                  {detailsDialog && (
                    <div className="space-y-6 py-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Informações Gerais
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-500">Semestre</Label>
                            <p className="font-medium">
                              {detailsDialog.semestre}º
                            </p>
                          </div>
                          <div>
                            <Label className="text-gray-500">Estado</Label>
                            <Badge
                              className="mt-1"
                              variant={
                                detailsDialog.estado === "Ativa"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {detailsDialog.estado}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-gray-500">
                              Nº de Estudantes
                            </Label>
                            <p className="font-medium">
                              {detailsDialog.estudantes.length}
                            </p>
                          </div>
                          <div>
                            <Label className="text-gray-500">
                              Nº de Docentes
                            </Label>
                            <p className="font-medium">
                              {detailsDialog.docentes.length}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Disciplinas</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {detailsDialog.disciplinas.length > 0 ? (
                              detailsDialog.disciplinas.map((discId) => {
                                const courseId = detailsDialog.curso;
                                const disc = subjectsMap[courseId]?.find(
                                  (d) => d.id === discId
                                );
                                return disc ? (
                                  <Badge key={discId} variant="outline">
                                    {disc.nome}
                                  </Badge>
                                ) : null;
                              })
                            ) : (
                              <p className="text-gray-500 text-sm">
                                Nenhuma disciplina atribuída
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Docentes Atribuídos
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {detailsDialog.docentesNomes.length > 0 ? (
                              detailsDialog.docentesNomes.map((nome, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 p-2 bg-transparent rounded"
                                >
                                  <Users className="h-4 w-4 text-gray-500" />
                                  <span>{nome}</span>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm">
                                Nenhum docente atribuído
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Lista de Estudantes
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {detailsDialog.estudantes.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Número</TableHead>
                                  <TableHead>Nome</TableHead>
                                  <TableHead>Email</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {detailsDialog.estudantes.map((enrollmentId) => {
                                  const courseId = detailsDialog.curso;
                                  const estudante = enrollmentsMap[courseId]?.find(
                                    (e) => e.id === enrollmentId
                                  );
                                  return estudante ? (
                                    <TableRow key={estudante.id}>
                                      <TableCell>{estudante.numero}</TableCell>
                                      <TableCell>{estudante.nome}</TableCell>
                                      <TableCell>{estudante.email}</TableCell>
                                    </TableRow>
                                  ) : null;
                                })}
                              </TableBody>
                            </Table>
                          ) : (
                            <p className="text-gray-500 text-sm">
                              Nenhum estudante matriculado
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <AlertDialog
                open={!!turmaToDelete}
                onOpenChange={() => setTurmaToDelete(null)}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir esta turma? Esta ação não
                      pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        turmaToDelete && handleDeleteTurma(turmaToDelete)
                      }
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
