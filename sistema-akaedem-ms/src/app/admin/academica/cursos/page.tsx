"use client"

import React, { useState } from 'react';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
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
import { courseService, Course, CourseSubject } from "@/lib/api/services/course.service";
import { toast } from "sonner";

// Tipos adaptados para a API
interface CursoDisplay {
  id: string;
  nome: string;
  codigo: string;
  duracao: number; // em semestres
  duracaoMeses: number; // em meses
  grau: string;
  coordenador: string;
  coordenadorNome: string;
  estado: 'Ativo' | 'Inativo';
  disciplinas: string[];
  subjects?: CourseSubject[];
  description?: string;
  monthly_tuition?: number;
  image?: string;
}

export default function Academica() {
  const { courses, loading: coursesLoading, error: coursesError, fetchCourses } = useCourses();
  const [subjectsMap, setSubjectsMap] = useState<Record<string, CourseSubject[]>>({});
  const [loadingSubjects, setLoadingSubjects] = useState<Record<string, boolean>>({});

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
    grau: '',
    coordenador: '',
    coordenadorNome: '',
    estado: 'Ativo',
    disciplinas: []
  });

  // Carregar disciplinas de um curso
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
    
    return {
      id: course.id,
      nome: course.name,
      codigo: course.id.substring(0, 8).toUpperCase(), // Usa parte do ID como código
      duracao: duracaoSemestres,
      duracaoMeses: duracaoMeses,
      grau: 'Licenciatura', // Valor padrão, não existe na API
      coordenador: '',
      coordenadorNome: 'Não definido', // Valor padrão
      estado: 'Ativo', // Valor padrão
      disciplinas: subjects.map(s => s.id),
      subjects: subjects,
      description: course.description,
      monthly_tuition: course.monthly_tuition,
      image: course.image,
    };
  };

  const cursosDisplay: CursoDisplay[] = Array.isArray(courses)
    ? courses.map(convertCourseToDisplay)
    : [];

  // Funções
  const handleCreateCurso = () => {
    setIsEditing(false);
    setFormData({
      id: '',
      nome: '',
      codigo: '',
      duracao: 6,
      duracaoMeses: 36,
      grau: '',
      coordenador: '',
      coordenadorNome: '',
      estado: 'Ativo',
      disciplinas: []
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
    setIsSheetOpen(true);
  };

  const handleSaveCurso = () => {
    if (!formData.nome) {
      toast.error('Por favor, preencha o nome do curso');
      return;
    }

    // TODO: Implementar criação/edição via API
    toast.info('Funcionalidade de criação/edição será implementada em breve');
    setIsSheetOpen(false);
  };

  const handleDeleteCurso = (id: string) => {
    // TODO: Implementar exclusão via API
    toast.info('Funcionalidade de exclusão será implementada em breve');
    setCursoToDelete(null);
  };

  // Filtros
  const cursosFiltrados = cursosDisplay.filter(curso => {
    const matchSearch = curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       curso.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGrau = filterGrau === 'todos' || curso.grau === filterGrau;
    const matchEstado = filterEstado === 'todos' || curso.estado === filterEstado;
    
    return matchSearch && matchGrau && matchEstado;
  });

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="sidebar" />

      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <NavbarH />
            
            {/* Conteúdo Principal */}
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
                                Código: {curso.codigo}
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
                              <span className="text-gray-600">Grau:</span>
                              <span className="font-medium">{curso.grau}</span>
                            </div>
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
          </div>
        </div>
      </SidebarInset>

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
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                placeholder="Ex: EI-001"
                disabled={isEditing}
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

            <div className="space-y-2">
              <Label htmlFor="grau">Grau</Label>
              <Select
                value={formData.grau}
                onValueChange={(value) => setFormData({ ...formData, grau: value })}
              >
                <SelectTrigger id="grau">
                  <SelectValue placeholder="Selecione o grau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Licenciatura">Licenciatura</SelectItem>
                  <SelectItem value="Técnico">Técnico</SelectItem>
                  <SelectItem value="Mestrado">Mestrado</SelectItem>
                  <SelectItem value="Doutoramento">Doutoramento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select
                value={formData.estado}
                onValueChange={(value: 'Ativo' | 'Inativo') => setFormData({ ...formData, estado: value })}
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
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveCurso}>
              {isEditing ? 'Salvar Alterações' : 'Criar Curso'}
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
    </SidebarProvider>
  );
}
