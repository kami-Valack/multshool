"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
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
import { Plus, Pencil, Trash2, Search, BookOpen, Users, Loader2 } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import {
  courseService,
  Course,
  CourseSubject,
  AdmissionExam,
} from "@/lib/api/services/course.service";
import { toast } from "sonner";

// Tipos adaptados para a API
interface CursoDisplay {
  id: string;
  nome: string;
  codigo?: string;
  duracao: number; // em semestres
  duracaoMeses: number; // em meses
  education_level?: 'medio' | 'superior';
  class_level?: number; // 10, 11, 12, 13 para ensino médio
  year_level?: number; // Ano para ensino superior
  grau: string;
  coordenador: string;
  coordenadorNome: string;
  estado: 'Ativo' | 'Inativo';
  disciplinas: string[];
  subjects?: CourseSubject[];
  description?: string;
  monthly_tuition?: number;
  price?: number;
  faculty?: string;
  image?: string;
  is_active?: boolean;
}

export default function Academica() {
  const { courses, loading: coursesLoading, error: coursesError, fetchCourses } = useCourses();
  const [subjectsMap, setSubjectsMap] = useState<Record<string, CourseSubject[]>>({});
  const [loadingSubjects, setLoadingSubjects] = useState<Record<string, boolean>>({});
  const [admissionExams, setAdmissionExams] = useState<AdmissionExam[]>([]);
  const [loadingExams, setLoadingExams] = useState(false);
  const [savingExam, setSavingExam] = useState(false);
  const [examForm, setExamForm] = useState({
    name: "",
    exam_date: "",
    registration_deadline: "",
    exam_fee: "",
    max_candidates: "",
    description: "",
  });

  // Estados
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cursoToDelete, setCursoToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrau, setFilterGrau] = useState('todos');
  const [filterEstado, setFilterEstado] = useState('todos');

  const [formData, setFormData] = useState<CursoDisplay>({
    id: '',
    nome: '',
    codigo: '',
    duracao: 6,
    duracaoMeses: 36,
    education_level: 'superior',
    class_level: undefined,
    year_level: 1,
    grau: '',
    coordenador: '',
    coordenadorNome: '',
    estado: 'Ativo',
    disciplinas: [],
    monthly_tuition: 0,
    price: 0,
    faculty: '',
    is_active: true,
  });

  // Carregar disciplinas de um curso
  const loadCourseExams = async (courseId: string) => {
    setLoadingExams(true);
    try {
      const exams = await courseService.getAdmissionExams(courseId);
      setAdmissionExams(exams);
    } catch (error: any) {
      toast.error(`Erro ao carregar exames: ${error.message}`);
      setAdmissionExams([]);
    } finally {
      setLoadingExams(false);
    }
  };

  const loadCourseSubjects = async (courseId: string) => {
    if (subjectsMap[courseId] || loadingSubjects[courseId]) return;
    
    setLoadingSubjects(prev => ({ ...prev, [courseId]: true }));
    try {
      const subjects = await courseService.getCourseSubjects(courseId);
      setSubjectsMap(prev => ({ ...prev, [courseId]: subjects }));
    } catch (error: any) {
      toast.error(`Erro ao carregar disciplinas: ${error.message}`);
    } finally {
      setLoadingSubjects(prev => ({ ...prev, [courseId]: false }));
    }
  };

  // Converter Course da API para CursoDisplay
  const convertCourseToDisplay = (course: Course): CursoDisplay => {
    const duracaoMeses = course.duration_months || 36;
    const duracaoSemestres = Math.ceil(duracaoMeses / 6);
    
    // Garantir que subjects seja sempre um array
    const subjects = Array.isArray(subjectsMap[course.id]) ? subjectsMap[course.id] : [];
    
    // Determinar grau baseado no education_level
    let grau = 'Não definido';
    if (course.education_level === 'medio') {
      grau = `Ensino Médio - Classe ${course.class_level || ''}`;
    } else if (course.education_level === 'superior') {
      grau = `Ensino Superior - ${course.year_level || ''}º Ano`;
    }
    
    return {
      id: course.id,
      nome: course.name,
      codigo: course.code || course.id.substring(0, 8).toUpperCase(),
      duracao: duracaoSemestres,
      duracaoMeses: duracaoMeses,
      education_level: course.education_level,
      class_level: course.class_level,
      year_level: course.year_level,
      grau: grau,
      coordenador: '',
      coordenadorNome: 'Não definido',
      estado: course.is_active ? 'Ativo' : 'Inativo',
      disciplinas: subjects.map(s => s.id),
      subjects: subjects,
      description: course.description,
      monthly_tuition: course.monthly_tuition,
      price: course.price,
      faculty: course.faculty,
      image: course.image || course.image_path,
      is_active: course.is_active,
    };
  };

  const cursosDisplay: CursoDisplay[] = Array.isArray(courses)
    ? courses.map(convertCourseToDisplay)
    : [];

  // Funções
  const [saving, setSaving] = useState(false);

  const handleCreateCurso = () => {
    setIsEditing(false);
    setFormData({
      id: '',
      nome: '',
      codigo: '',
      duracao: 6,
      duracaoMeses: 36,
      education_level: 'superior',
      class_level: undefined,
      year_level: 1,
      grau: '',
      coordenador: '',
      coordenadorNome: '',
      estado: 'Ativo',
      disciplinas: [],
      monthly_tuition: 0,
      price: 0,
      faculty: '',
      is_active: true,
    });
    setAdmissionExams([]);
    setExamForm({
      name: "",
      exam_date: "",
      registration_deadline: "",
      exam_fee: "",
      max_candidates: "",
      description: "",
    });
    setIsSheetOpen(true);
  };

  const handleEditCurso = (curso: CursoDisplay) => {
    setIsEditing(true);
    setFormData(curso);
    // Carregar disciplinas se ainda não foram carregadas
    if (!subjectsMap[curso.id]) {
      loadCourseSubjects(curso.id);
    }
    loadCourseExams(curso.id);
    setIsSheetOpen(true);
  };

  const handleAddExam = async () => {
    if (!formData.id) return;
    if (!examForm.name.trim()) {
      toast.error("Informe o nome do exame");
      return;
    }
    if (!examForm.exam_date) {
      toast.error("Informe a data do exame");
      return;
    }
    const fee = parseFloat(examForm.exam_fee);
    if (Number.isNaN(fee) || fee < 0) {
      toast.error("Informe a taxa de exame (0 se gratuita)");
      return;
    }

    setSavingExam(true);
    try {
      await courseService.createAdmissionExam(formData.id, {
        name: examForm.name.trim(),
        exam_date: new Date(examForm.exam_date).toISOString(),
        registration_deadline: examForm.registration_deadline
          ? new Date(examForm.registration_deadline).toISOString()
          : new Date(examForm.exam_date).toISOString(),
        exam_fee: fee,
        max_candidates: examForm.max_candidates
          ? parseInt(examForm.max_candidates, 10)
          : undefined,
        description: examForm.description || undefined,
        status: "scheduled",
        is_active: true,
      });
      toast.success("Exame de admissão criado");
      setExamForm({
        name: "",
        exam_date: "",
        registration_deadline: "",
        exam_fee: "",
        max_candidates: "",
        description: "",
      });
      await loadCourseExams(formData.id);
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar exame");
    } finally {
      setSavingExam(false);
    }
  };

  const handleDeleteExam = async (examId: string) => {
    if (!formData.id) return;
    try {
      await courseService.deleteAdmissionExam(formData.id, examId);
      toast.success("Exame removido");
      await loadCourseExams(formData.id);
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover exame");
    }
  };

  const handleSaveCurso = async () => {
    if (!formData.nome) {
      toast.error('Por favor, preencha o nome do curso');
      return;
    }

    if (!formData.education_level) {
      toast.error('Por favor, selecione o nível de ensino');
      return;
    }

    if (formData.education_level === 'medio' && !formData.class_level) {
      toast.error('Por favor, selecione a classe para ensino médio');
      return;
    }

    if (formData.education_level === 'superior' && !formData.year_level) {
      toast.error('Por favor, informe o ano para ensino superior');
      return;
    }

    if (!formData.monthly_tuition || formData.monthly_tuition <= 0) {
      toast.error('Por favor, informe a propina mensal');
      return;
    }

    setSaving(true);

    try {
      const courseData: any = {
        name: formData.nome,
        description: formData.description || undefined,
        code: formData.codigo || undefined,
        education_level: formData.education_level,
        monthly_tuition: formData.monthly_tuition,
        is_active: formData.estado === 'Ativo',
        faculty: formData.faculty || undefined,
        price: formData.price || undefined,
      };

      // Campos específicos por nível de ensino
      if (formData.education_level === 'medio') {
        courseData.class_level = formData.class_level;
        // duration_months será sempre 9 para ensino médio (definido no backend)
      } else if (formData.education_level === 'superior') {
        courseData.year_level = formData.year_level;
        courseData.duration_months = formData.duracaoMeses;
      }

      if (isEditing && formData.id) {
        // Atualizar curso existente
        await courseService.updateCourse(formData.id, courseData);
        toast.success('Curso atualizado com sucesso!');
      } else {
        // Criar novo curso
        const newCourse = await courseService.createCourse(courseData);
        toast.success('Curso criado com sucesso!');
        
        if (newCourse.tuition_info) {
          toast.info(
            `Propina total: ${newCourse.tuition_info.total_tuition.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}`
          );
        }
      }

      // Recarregar lista de cursos
      await fetchCourses();
      setIsSheetOpen(false);
    } catch (error: any) {
      console.error('Erro ao salvar curso:', error);
      toast.error(error.message || 'Erro ao salvar curso. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCurso = async (id: string) => {
    try {
      await courseService.deleteCourse(id);
      toast.success('Curso eliminado com sucesso!');
      await fetchCourses();
      setCursoToDelete(null);
    } catch (error: any) {
      console.error('Erro ao eliminar curso:', error);
      toast.error(error.message || 'Erro ao eliminar curso. Tente novamente.');
      setCursoToDelete(null);
    }
  };

  // Filtros
  const cursosFiltrados = cursosDisplay.filter(curso => {
    const matchSearch = curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (curso.codigo?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchGrau = filterGrau === 'todos' || curso.grau === filterGrau;
    const matchEstado = filterEstado === 'todos' || curso.estado === filterEstado;
    
    return matchSearch && matchGrau && matchEstado;
  });

  return (
    <>
      <div className="flex-1 p-6 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Gestão de Cursos</h1>
                  <p className="text-gray-500 mt-1">Gerencie os cursos, disciplinas e coordenadores</p>
                </div>
                <Button onClick={handleCreateCurso} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Curso
                </Button>
              </div>

              {/* Filtros */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Pesquisar cursos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={filterGrau} onValueChange={setFilterGrau}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por grau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os Graus</SelectItem>
                        <SelectItem value="Licenciatura">Licenciatura</SelectItem>
                        <SelectItem value="Técnico">Técnico</SelectItem>
                        <SelectItem value="Mestrado">Mestrado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterEstado} onValueChange={setFilterEstado}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os Estados</SelectItem>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Loading State */}
              {coursesLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Carregando cursos...</span>
                </div>
              )}

              {/* Error State */}
              {coursesError && !coursesLoading && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-destructive">Erro ao carregar cursos: {coursesError}</p>
                    <Button onClick={fetchCourses} className="mt-4">
                      Tentar novamente
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Lista de Cursos */}
              {!coursesLoading && !coursesError && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cursosFiltrados.map(curso => (
                      <Card key={curso.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{curso.nome}</CardTitle>
                              <CardDescription className="mt-1">
                                Código: {curso.codigo || 'N/A'}
                              </CardDescription>
                            </div>
                            <Badge variant={curso.estado === 'Ativo' ? 'default' : 'secondary'}>
                              {curso.estado}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {curso.description && (
                              <div className="text-sm text-gray-600 line-clamp-2">
                                {curso.description}
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm">
                              <BookOpen className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">Nível:</span>
                              <span className="font-medium">{curso.grau}</span>
                            </div>
                            {curso.faculty && (
                              <div className="flex items-center gap-2 text-sm">
                                <BookOpen className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-600">Faculdade:</span>
                                <span className="font-medium">{curso.faculty}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">Coordenador:</span>
                              <span className="font-medium">{curso.coordenadorNome}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Duração:</span>
                              <span className="font-medium ml-2">
                                {curso.duracaoMeses} meses ({curso.duracao} semestres)
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Disciplinas:</span>
                              <span className="font-medium ml-2">
                                {curso.subjects ? curso.subjects.length : (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="h-auto p-0"
                                    onClick={() => loadCourseSubjects(curso.id)}
                                    disabled={loadingSubjects[curso.id]}
                                  >
                                    {loadingSubjects[curso.id] ? (
                                      <Loader2 className="h-3 w-3 animate-spin" />
                                    ) : (
                                      'Carregar'
                                    )}
                                  </Button>
                                )}
                                {curso.subjects && ` ${curso.subjects.length} associadas`}
                              </span>
                            </div>
                            {curso.monthly_tuition && (
                              <div className="text-sm">
                                <span className="text-gray-600">Propina mensal:</span>
                                <span className="font-medium ml-2">
                                  {curso.monthly_tuition.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 mt-4 pt-4 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleEditCurso(curso)}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setCursoToDelete(curso.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {cursosFiltrados.length === 0 && (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-gray-500">Nenhum curso encontrado</p>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
      </div>

      {/* Sheet de Criação/Edição */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {isEditing ? 'Editar Curso' : 'Novo Curso'}
            </SheetTitle>
            <SheetDescription>
              Preencha os dados do curso abaixo
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Curso *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: Engenharia Informática"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição do curso..."
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                value={formData.codigo || ''}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                placeholder="Ex: EI-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education_level">Nível de Ensino *</Label>
              <Select
                value={formData.education_level || ''}
                onValueChange={(value: 'medio' | 'superior') => {
                  setFormData({ 
                    ...formData, 
                    education_level: value,
                    class_level: value === 'medio' ? 10 : undefined,
                    year_level: value === 'superior' ? 1 : undefined,
                    duracaoMeses: value === 'medio' ? 9 : formData.duracaoMeses,
                    duracao: value === 'medio' ? 2 : Math.ceil((formData.duracaoMeses || 36) / 6)
                  });
                }}
              >
                <SelectTrigger id="education_level">
                  <SelectValue placeholder="Selecione o nível de ensino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medio">Ensino Médio</SelectItem>
                  <SelectItem value="superior">Ensino Superior</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.education_level === 'medio' && (
              <div className="space-y-2">
                <Label htmlFor="class_level">Classe *</Label>
                <Select
                  value={formData.class_level?.toString() || ''}
                  onValueChange={(value) => setFormData({ ...formData, class_level: parseInt(value) })}
                >
                  <SelectTrigger id="class_level">
                    <SelectValue placeholder="Selecione a classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10ª Classe</SelectItem>
                    <SelectItem value="11">11ª Classe</SelectItem>
                    <SelectItem value="12">12ª Classe</SelectItem>
                    <SelectItem value="13">13ª Classe</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Duração fixa: 9 meses (definido automaticamente)
                </p>
              </div>
            )}

            {formData.education_level === 'superior' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="year_level">Ano *</Label>
                  <Input
                    id="year_level"
                    type="number"
                    min="1"
                    value={formData.year_level || ''}
                    onChange={(e) => setFormData({ ...formData, year_level: parseInt(e.target.value) || 1 })}
                    placeholder="Ex: 1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duracao">Duração (meses) *</Label>
                  <Input
                    id="duracao"
                    type="number"
                    min="1"
                    value={formData.duracaoMeses}
                    onChange={(e) => {
                      const meses = parseInt(e.target.value) || 0;
                      setFormData({ 
                        ...formData, 
                        duracaoMeses: meses,
                        duracao: Math.ceil(meses / 6)
                      });
                    }}
                  />
                  <p className="text-sm text-gray-500">
                    {formData.duracaoMeses} meses = {formData.duracao} semestres
                  </p>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="faculty">Faculdade/Departamento</Label>
              <Input
                id="faculty"
                value={formData.faculty || ''}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                placeholder="Ex: Faculdade de Engenharia"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly_tuition">Propina Mensal (AOA) *</Label>
              <Input
                id="monthly_tuition"
                type="number"
                min="0"
                step="0.01"
                value={formData.monthly_tuition || ''}
                onChange={(e) => setFormData({ ...formData, monthly_tuition: parseFloat(e.target.value) || 0 })}
                placeholder="Ex: 50000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço Total (AOA) - Opcional</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || undefined })}
                placeholder="Ex: 500000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select
                value={formData.estado}
                onValueChange={(value: 'Ativo' | 'Inativo') => setFormData({ ...formData, estado: value, is_active: value === 'Ativo' })}
              >
                <SelectTrigger id="estado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isEditing && formData.id && (
              <div className="space-y-3 border-t pt-4">
                <Label>Exames de admissão</Label>
                <p className="text-sm text-gray-500">
                  Defina a taxa de exame exigida antes da matrícula no portal do estudante.
                </p>
                {loadingExams ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    A carregar exames...
                  </div>
                ) : (
                  <div className="space-y-2">
                    {admissionExams.length === 0 && (
                      <p className="text-sm text-gray-500">Nenhum exame configurado.</p>
                    )}
                    {admissionExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="flex items-start justify-between gap-2 rounded-md border border-border bg-card p-3 text-sm text-card-foreground"
                      >
                        <div>
                          <p className="font-medium">{exam.name}</p>
                          <p className="text-muted-foreground">
                            Taxa:{" "}
                            {Number(exam.exam_fee ?? 0).toLocaleString("pt-AO", {
                              style: "currency",
                              currency: "AOA",
                            })}
                          </p>
                          {exam.exam_date && (
                            <p className="text-muted-foreground">
                              Data:{" "}
                              {new Date(exam.exam_date).toLocaleDateString("pt-PT")}
                            </p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteExam(exam.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-3 rounded-md border border-border p-4 bg-muted/40">
                  <p className="text-sm font-medium text-foreground">Novo exame</p>
                  <div className="space-y-2">
                    <Label htmlFor="exam_name">Nome do exame</Label>
                    <Input
                      id="exam_name"
                      className="bg-background text-foreground"
                      placeholder="Ex.: Exame de Admissão 2026"
                      value={examForm.name}
                      onChange={(e) => setExamForm({ ...examForm, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="exam_date">Data do exame</Label>
                      <Input
                        id="exam_date"
                        type="datetime-local"
                        className="bg-background text-foreground dark:[color-scheme:dark]"
                        value={examForm.exam_date}
                        onChange={(e) =>
                          setExamForm({ ...examForm, exam_date: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exam_deadline">Prazo de inscrição</Label>
                      <Input
                        id="exam_deadline"
                        type="datetime-local"
                        className="bg-background text-foreground dark:[color-scheme:dark]"
                        value={examForm.registration_deadline}
                        onChange={(e) =>
                          setExamForm({
                            ...examForm,
                            registration_deadline: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="exam_fee">Taxa (AOA)</Label>
                      <Input
                        id="exam_fee"
                        type="number"
                        min="0"
                        step="0.01"
                        className="bg-background text-foreground"
                        placeholder="Ex.: 5000"
                        value={examForm.exam_fee}
                        onChange={(e) =>
                          setExamForm({ ...examForm, exam_fee: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exam_max">Máx. candidatos (opcional)</Label>
                      <Input
                        id="exam_max"
                        type="number"
                        min="1"
                        className="bg-background text-foreground"
                        placeholder="Ex.: 100"
                        value={examForm.max_candidates}
                        onChange={(e) =>
                          setExamForm({ ...examForm, max_candidates: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={savingExam}
                    onClick={handleAddExam}
                  >
                    {savingExam ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        A guardar...
                      </>
                    ) : (
                      "Adicionar exame"
                    )}
                  </Button>
                </div>
              </div>
            )}

            {isEditing && formData.subjects && formData.subjects.length > 0 && (
              <div className="space-y-2">
                <Label>Disciplinas Associadas</Label>
                <Card>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {formData.subjects.map(subject => (
                        <div key={subject.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                          <span>{subject.name}</span>
                          {subject.code && (
                            <Badge variant="outline" className="ml-auto">
                              {subject.code}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setIsSheetOpen(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleSaveCurso} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isEditing ? 'Salvando...' : 'Criando...'}
                </>
              ) : (
                isEditing ? 'Salvar Alterações' : 'Criar Curso'
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={!!cursoToDelete} onOpenChange={() => setCursoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja eliminar este curso? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cursoToDelete && handleDeleteCurso(cursoToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
