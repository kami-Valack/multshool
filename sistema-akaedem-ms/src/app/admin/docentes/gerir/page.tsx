"use client"

import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Edit, Trash2, UserX, UserCheck, Eye, Key, Users, UserCheck2, UserX2, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import { useTeachers } from "@/hooks/useTeachers";
import { Teacher } from "@/lib/api/services/teacher.service";
import { useCourses } from "@/hooks/useCourses";
import { toast } from "sonner";

interface Docente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  curso: string;
  departamento: string;
  cargo: string;
  contrato: string;
  estado: string;
  dataEntrada: string;
  ultimoAcesso: string;
  morada: string;
  bi: string;
  permissoes: string[];
  teacher?: Teacher; // Guarda o objeto Teacher original
}

const GestaoDocentes = () => {
  const { teachers, loading: teachersLoading, error: teachersError, createTeacher, updateTeacher, deleteTeacher, fetchTeachers } = useTeachers();
  const { courses, loading: coursesLoading } = useCourses();

  // Converter Teacher da API para Docente
  const convertTeacherToDocente = (teacher: Teacher): Docente => {
    const coursesArray = Array.isArray(courses) ? courses : [];
    const teacherCourse = coursesArray.find(c => c.id === teacher.course_id);
    
    return {
      id: teacher.id,
      nome: teacher.name,
      email: teacher.email,
      telefone: teacher.phone || 'N/A',
      curso: teacherCourse?.name || teacher.course?.name || 'Não definido',
      departamento: teacher.department || 'Não definido',
      cargo: teacher.position || 'Professor',
      contrato: teacher.contract_type || 'Efetivo',
      estado: teacher.status === 'active' ? 'ativo' : 'inativo',
      dataEntrada: teacher.created_at ? new Date(teacher.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      ultimoAcesso: '-', // Campo não existe na API
      morada: teacher.address || 'Não definido',
      bi: teacher.id_card || 'Não definido',
      permissoes: ['Docente'], // Campo não existe na API
      teacher: teacher, // Guarda o objeto original
    };
  };

  // Usar dados da API se disponíveis, senão usar dados mock
  const docentesFromAPI = teachers.map(convertTeacherToDocente);
  
  // Dados mock como fallback
  const mockDocentes: Docente[] = [
    {
      id: '1',
      nome: 'Dr. João Silva',
      email: 'joao.silva@univ.ao',
      telefone: '+244 923 456 789',
      curso: 'Engenharia Informática',
      departamento: 'Ciências Exatas',
      cargo: 'Professor Auxiliar',
      contrato: 'Efetivo',
      estado: 'ativo',
      dataEntrada: '2020-03-15',
      ultimoAcesso: '2025-11-05 14:30',
      morada: 'Luanda, Talatona',
      bi: '004567891LA042',
      permissoes: ['Docente', 'Orientador']
    },
  ];

  // Usar dados da API se houver, senão usar mock
  const docentes = docentesFromAPI.length > 0 ? docentesFromAPI : mockDocentes;

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCurso, setFilterCurso] = useState('todos');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [filterContrato, setFilterContrato] = useState('todos');
  const [selectedDocente, setSelectedDocente] = useState<Docente | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [docenteToDelete, setDocenteToDelete] = useState<Docente | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    curso: '',
    departamento: '',
    cargo: '',
    contrato: 'Efetivo',
    morada: '',
    bi: ''
  });

  const cursos = [...new Set(docentes.map(d => d.curso))];

  const stats = {
    total: docentes.length,
    ativos: docentes.filter(d => d.estado === 'ativo').length,
    inativos: docentes.filter(d => d.estado === 'inativo').length,
    convidados: docentes.filter(d => d.contrato === 'Convidado').length
  };

  const filteredDocentes = docentes.filter(docente => {
    const matchSearch = docente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       docente.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCurso = filterCurso === 'todos' || docente.curso === filterCurso;
    const matchEstado = filterEstado === 'todos' || docente.estado === filterEstado;
    const matchContrato = filterContrato === 'todos' || docente.contrato === filterContrato;
    
    return matchSearch && matchCurso && matchEstado && matchContrato;
  });

  const handleAddDocente = async () => {
    if (!formData.nome || !formData.email) {
      toast.error('Por favor, preencha pelo menos o nome e email');
      return;
    }

    try {
      await createTeacher({
        name: formData.nome,
        email: formData.email,
        phone: formData.telefone || undefined,
        course_id: formData.course_id || undefined,
        department: formData.departamento || undefined,
        position: formData.cargo || undefined,
        contract_type: formData.contrato || undefined,
        address: formData.morada || undefined,
        id_card: formData.bi || undefined,
      });
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleEditDocente = async () => {
    if (!selectedDocente) return;
    
    try {
      await updateTeacher(selectedDocente.id, {
        name: formData.nome,
        email: formData.email,
        phone: formData.telefone || undefined,
        course_id: formData.course_id || undefined,
        department: formData.departamento || undefined,
        position: formData.cargo || undefined,
        contract_type: formData.contrato || undefined,
        address: formData.morada || undefined,
        id_card: formData.bi || undefined,
        status: formData.estado === 'ativo' ? 'active' : 'inactive',
      });
      setIsEditDialogOpen(false);
      setIsDrawerOpen(false);
      resetForm();
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleDeleteDocente = async () => {
    if (!docenteToDelete) return;
    
    try {
      await deleteTeacher(docenteToDelete.id);
      setIsDeleteDialogOpen(false);
      setDocenteToDelete(null);
      setIsDrawerOpen(false);
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleToggleEstado = async (docente: Docente) => {
    const novoEstado = docente.estado === 'ativo' ? 'inativo' : 'ativo';
    
    try {
      await updateTeacher(docente.id, {
        status: novoEstado === 'ativo' ? 'active' : 'inactive',
      });
      
      if (selectedDocente && selectedDocente.id === docente.id) {
        setSelectedDocente({ ...selectedDocente, estado: novoEstado });
      }
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      curso: '',
      course_id: '',
      departamento: '',
      cargo: '',
      contrato: 'Efetivo',
      morada: '',
      bi: ''
    });
  };

  const openEditDialog = (docente: Docente) => {
    setFormData({
      nome: docente.nome,
      email: docente.email,
      telefone: docente.telefone,
      curso: docente.curso,
      course_id: docente.teacher?.course_id || '',
      departamento: docente.departamento,
      cargo: docente.cargo,
      contrato: docente.contrato,
      morada: docente.morada,
      bi: docente.bi
    });
    setIsEditDialogOpen(true);
  };

  const viewProfile = (docente: Docente) => {
    setSelectedDocente(docente);
    setIsDrawerOpen(true);
  };

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
          <div className="flex flex-1 flex-col gap-2">
            <NavbarH />
            
            <div className="min-h-screen  p-6">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-300">Gestão de Docentes</h1>
                    <p className="text-gray-500 mt-1">Gerir informações e perfis dos docentes da instituição</p>
                  </div>
                  <div className="flex gap-2">
                    {teachersError && (
                      <Button variant="outline" onClick={fetchTeachers} className="gap-2">
                        <Loader2 className="h-4 w-4" />
                        Tentar novamente
                      </Button>
                    )}
                    <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Novo Docente
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Total de Docentes</CardTitle>
                      <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Docentes Ativos</CardTitle>
                      <UserCheck2 className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{stats.ativos}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Docentes Inativos</CardTitle>
                      <UserX2 className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">{stats.inativos}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Docentes Convidados</CardTitle>
                      <UserPlus className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">{stats.convidados}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Pesquisar por nome ou email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9"
                        />
                      </div>

                      <Select value={filterCurso} onValueChange={setFilterCurso}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrar por curso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os cursos</SelectItem>
                          {cursos.map(curso => (
                            <SelectItem key={curso} value={curso}>{curso}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={filterEstado} onValueChange={setFilterEstado}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrar por estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os estados</SelectItem>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="inativo">Inativo</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={filterContrato} onValueChange={setFilterContrato}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrar por contrato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os contratos</SelectItem>
                          <SelectItem value="Efetivo">Efetivo</SelectItem>
                          <SelectItem value="Temporário">Temporário</SelectItem>
                          <SelectItem value="Convidado">Convidado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {teachersLoading ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">Carregando professores...</p>
                    </CardContent>
                  </Card>
                ) : teachersError && docentes.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-destructive mb-4">Erro ao carregar professores: {teachersError}</p>
                      <Button onClick={fetchTeachers}>Tentar novamente</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className=" border-b">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Curso</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Departamento</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contrato</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações Rápidas</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Mais</th>
                            </tr>
                          </thead>
                          <tbody className="bg- divide-y divide-gray-200">
                            {filteredDocentes.length === 0 ? (
                              <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                  Nenhum docente encontrado
                                </td>
                              </tr>
                            ) : (
                              filteredDocentes.map((docente) => (
                            <tr key={docente.id} className="hover:bg-[#202020]">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                    {docente.nome.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                                  </div>
                                  <div className="ml-4">
                                    <div 
                                      className="text-sm font-medium text-gray-300 hover:text-purple-300 cursor-pointer"
                                      onClick={() => viewProfile(docente)}
                                    >
                                      {docente.nome}
                                    </div>
                                    <div className="text-sm text-gray-500">{docente.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{docente.curso}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{docente.departamento}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant={docente.estado === 'ativo' ? 'default' : 'secondary'}>
                                  {docente.estado === 'ativo' ? 'Ativo' : 'Inativo'}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant="outline">{docente.contrato}</Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => viewProfile(docente)}
                                    title="Ver perfil"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => { setSelectedDocente(docente); openEditDialog(docente); }}
                                    title="Editar"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleToggleEstado(docente)}
                                    title={docente.estado === 'ativo' ? 'Desativar' : 'Reativar'}
                                  >
                                    {docente.estado === 'ativo' ? (
                                      <UserX className="h-4 w-4 text-red-600" />
                                    ) : (
                                      <UserCheck className="h-4 w-4 text-green-600" />
                                    )}
                                  </Button>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => viewProfile(docente)}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Ver perfil completo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setSelectedDocente(docente); openEditDialog(docente); }}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Editar dados
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Key className="mr-2 h-4 w-4" />
                                      Resetar senha
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600" onClick={() => { setDocenteToDelete(docente); setIsDeleteDialogOpen(true); }}>
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Eliminar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                              </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Docente</DialogTitle>
              <DialogDescription>Preencha os dados do novo docente</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bi">Bilhete de Identidade</Label>
                  <Input id="bi" value={formData.bi} onChange={(e) => setFormData({...formData, bi: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="curso">Curso</Label>
                  <Select 
                    value={formData.course_id} 
                    onValueChange={(value) => {
                      const coursesArray = Array.isArray(courses) ? courses : [];
                      const selectedCourse = coursesArray.find(c => c.id === value);
                      setFormData({
                        ...formData, 
                        course_id: value,
                        curso: selectedCourse?.name || ''
                      });
                    }}
                    disabled={coursesLoading}
                  >
                    <SelectTrigger id="curso">
                      <SelectValue placeholder="Selecione um curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {coursesLoading ? (
                        <SelectItem value="loading" disabled>Carregando cursos...</SelectItem>
                      ) : Array.isArray(courses) && courses.length > 0 ? (
                        courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-courses" disabled>Nenhum curso disponível</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departamento">Departamento</Label>
                  <Input id="departamento" value={formData.departamento} onChange={(e) => setFormData({...formData, departamento: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" value={formData.cargo} onChange={(e) => setFormData({...formData, cargo: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contrato">Tipo de Contrato</Label>
                  <Select value={formData.contrato} onValueChange={(value) => setFormData({...formData, contrato: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Efetivo">Efetivo</SelectItem>
                      <SelectItem value="Temporário">Temporário</SelectItem>
                      <SelectItem value="Convidado">Convidado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="morada">Morada</Label>
                <Input id="morada" value={formData.morada} onChange={(e) => setFormData({...formData, morada: e.target.value})} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }}>Cancelar</Button>
              <Button onClick={handleAddDocente}>Adicionar Docente</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Docente</DialogTitle>
              <DialogDescription>Atualize os dados do docente</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nome">Nome Completo</Label>
                  <Input id="edit-nome" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-telefone">Telefone</Label>
                  <Input id="edit-telefone" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-bi">Bilhete de Identidade</Label>
                  <Input id="edit-bi" value={formData.bi} onChange={(e) => setFormData({...formData, bi: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-curso">Curso</Label>
                  <Select 
                    value={formData.course_id} 
                    onValueChange={(value) => {
                      const coursesArray = Array.isArray(courses) ? courses : [];
                      const selectedCourse = coursesArray.find(c => c.id === value);
                      setFormData({
                        ...formData, 
                        course_id: value,
                        curso: selectedCourse?.name || ''
                      });
                    }}
                    disabled={coursesLoading}
                  >
                    <SelectTrigger id="edit-curso">
                      <SelectValue placeholder="Selecione um curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {coursesLoading ? (
                        <SelectItem value="loading" disabled>Carregando cursos...</SelectItem>
                      ) : Array.isArray(courses) && courses.length > 0 ? (
                        courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-courses" disabled>Nenhum curso disponível</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-departamento">Departamento</Label>
                  <Input id="edit-departamento" value={formData.departamento} onChange={(e) => setFormData({...formData, departamento: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-cargo">Cargo</Label>
                  <Input id="edit-cargo" value={formData.cargo} onChange={(e) => setFormData({...formData, cargo: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-contrato">Tipo de Contrato</Label>
                  <Select value={formData.contrato} onValueChange={(value) => setFormData({...formData, contrato: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Efetivo">Efetivo</SelectItem>
                      <SelectItem value="Temporário">Temporário</SelectItem>
                      <SelectItem value="Convidado">Convidado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-morada">Morada</Label>
                <Input id="edit-morada" value={formData.morada} onChange={(e) => setFormData({...formData, morada: e.target.value})} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); resetForm(); }}>Cancelar</Button>
              <Button onClick={handleEditDocente}>Guardar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Eliminação</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja eliminar o docente <strong>{docenteToDelete?.nome}</strong>? Esta ação não pode ser revertida.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsDeleteDialogOpen(false); setDocenteToDelete(null); }}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDeleteDocente}>Eliminar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            {selectedDocente && (
              <>
                <SheetHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
                      {selectedDocente.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                      <SheetTitle className="text-2xl">{selectedDocente.nome}</SheetTitle>
                      <SheetDescription>{selectedDocente.cargo}</SheetDescription>
                    </div>
                  </div>
                </SheetHeader>

                <Tabs defaultValue="dados" className="mt-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
                    <TabsTrigger value="institucional">Institucional</TabsTrigger>
                    <TabsTrigger value="permissoes">Permissões</TabsTrigger>
                  </TabsList>

                  <TabsContent value="dados" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label className="text-gray-500">Email</Label>
                          <p className="font-medium">{selectedDocente.email}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500">Telefone</Label>
                          <p className="font-medium">{selectedDocente.telefone}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500">Bilhete de Identidade</Label>
                          <p className="font-medium">{selectedDocente.bi}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500">Morada</Label>
                          <p className="font-medium">{selectedDocente.morada}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="institucional" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Dados Institucionais</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label className="text-gray-500">Curso</Label>
                          <p className="font-medium">{selectedDocente.curso}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500">Departamento</Label>
                          <p className="font-medium">{selectedDocente.departamento}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500">Cargo</Label>
                          <p className="font-medium">{selectedDocente.cargo}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500">Tipo de Contrato</Label>
                          <Badge variant="outline">{selectedDocente.contrato}</Badge>
                        </div>
                        <div>
                          <Label className="text-gray-500">Estado da Conta</Label>
                          <div className="mt-1">
                            <Badge variant={selectedDocente.estado === 'ativo' ? 'default' : 'secondary'}>
                              {selectedDocente.estado === 'ativo' ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <Label className="text-gray-500">Data de Entrada</Label>
                          <p className="font-medium">{new Date(selectedDocente.dataEntrada).toLocaleDateString('pt-AO')}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500">Último Acesso</Label>
                          <p className="font-medium">{selectedDocente.ultimoAcesso}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="permissoes" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Permissões e Acesso</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label className="text-gray-500 mb-2 block">Permissões Atribuídas</Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedDocente.permissoes.map((perm, idx) => (
                              <Badge key={idx} variant="outline">{perm}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="pt-4 space-y-2">
                          <Button variant="outline" className="w-full gap-2">
                            <Key className="h-4 w-4" />
                            Resetar Senha
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex gap-2">
                  <Button onClick={() => { openEditDialog(selectedDocente); }} className="flex-1 gap-2">
                    <Edit className="h-4 w-4" />
                    Editar Perfil
                  </Button>
                  <Button 
                    variant={selectedDocente.estado === 'ativo' ? 'outline' : 'default'}
                    onClick={() => { handleToggleEstado(selectedDocente); }}
                    className="flex-1 gap-2"
                  >
                    {selectedDocente.estado === 'ativo' ? (
                      <>
                        <UserX className="h-4 w-4" />
                        Desativar
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4" />
                        Reativar
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default GestaoDocentes;