"use client";

import { useState, useEffect, useMemo } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import { useTeacherAssignments } from "@/hooks/useTeacherAssignments";
import { useTeachers } from "@/hooks/useTeachers";
import { useCourses } from "@/hooks/useCourses";
import { courseService } from "@/lib/api/services/course.service";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  BookOpen,
  Clock,
  GraduationCap,
  Download,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Atribuicao {
  id: string;
  docente: string;
  curso: string;
  disciplina: string;
  turma: string;
  carga: number;
  tipo: "principal" | "substituto";
  assignment?: any; // Guarda o objeto original da API
}

interface LinhaForm {
  key: string;
  disciplina: string;
  turma: string;
  carga: string;
  tipo: "principal" | "substituto";
}

interface CursoForm {
  key: string;
  curso: string;
  linhas: LinhaForm[];
  collapsed: boolean;
}

export default function Academica() {
  const { teachers, loading: teachersLoading } = useTeachers();
  const { courses, loading: coursesLoading } = useCourses();
  const { assignments, loading: assignmentsLoading, bulkCreateAssignments, deleteAssignment, fetchAssignments } = useTeacherAssignments();
  
  // Converter assignments da API para Atribuicao
  const atribuicoes = useMemo(() => {
    return assignments.map((assignment) => {
      const teacher = teachers.find(t => t.id === assignment.teacher_id);
      return {
        id: assignment.id,
        docente: teacher?.name || assignment.teacher_name || 'N/A',
        curso: assignment.course_name || 'N/A',
        disciplina: assignment.subject_name || 'N/A',
        turma: assignment.class,
        carga: assignment.workload_hours,
        tipo: assignment.assignment_type,
        // Guardar dados originais para edição
        assignment: assignment,
      } as Atribuicao & { assignment?: any };
    });
  }, [assignments, teachers]);
  const [open, setOpen] = useState(false);
  const [editingDocente, setEditingDocente] = useState<string | null>(null);
  const [filtroCurso, setFiltroCurso] = useState("todos");
  const [filtroDocente, setFiltroDocente] = useState("");

  // Formulário
  const [docente, setDocente] = useState("");
  const [cursos, setCursos] = useState<CursoForm[]>([
    {
      key: "1",
      curso: "",
      collapsed: false,
      linhas: [
        { key: "1-1", disciplina: "", turma: "", carga: "", tipo: "principal" as const },
      ],
    },
  ]);

  // Reset ao abrir
  useEffect(() => {
    if (open) {
      if (editingDocente) {
        setDocente(editingDocente);
        const cursosDoDocente = Array.from(
          new Set(
            atribuicoes
              .filter((a) => a.docente === editingDocente)
              .map((a) => a.curso)
          )
        );

        const novosCursos: CursoForm[] = cursosDoDocente.map((curso, i) => {
          const linhasDoCurso = atribuicoes
            .filter((a) => a.docente === editingDocente && a.curso === curso)
            .map((a, j) => ({
              key: `${i}-${j}`,
              disciplina: a.disciplina,
              turma: a.turma,
              carga: String(a.carga),
              tipo: a.tipo as "principal" | "substituto",
            }));

          return {
            key: String(i + 1),
            curso,
            collapsed: false,
            linhas:
              linhasDoCurso.length > 0
                ? linhasDoCurso
                : ([
                    {
                      key: `${i + 1}-1`,
                      disciplina: "",
                      turma: "",
                      carga: "",
                      tipo: "principal" as const,
                    },
                  ] as LinhaForm[]),
          };
        });

        setCursos(
          novosCursos.length > 0
            ? novosCursos
            : ([
                {
                  key: "1",
                  curso: "",
                  collapsed: false,
                  linhas: [
                    {
                      key: "1-1",
                      disciplina: "",
                      turma: "",
                      carga: "",
                      tipo: "principal" as const,
                    },
                  ],
                },
              ] as CursoForm[])
        );
      } else {
        setDocente("");
        setCursos([
          {
            key: "1",
            curso: "",
            collapsed: false,
            linhas: [
              {
                key: "1-1",
                disciplina: "",
                turma: "",
                carga: "",
                tipo: "principal" as const,
              },
            ],
          },
        ]);
      }
    }
  }, [open, editingDocente, atribuicoes]);

  const adicionarCurso = () => {
    setCursos((prev) => [
      ...prev,
      {
        key: String(Date.now()),
        curso: "",
        collapsed: false,
        linhas: [
          {
            key: `${Date.now()}-1`,
            disciplina: "",
            turma: "",
            carga: "",
            tipo: "principal" as const,
          },
        ],
      },
    ]);
  };

  const removerCurso = (key: string) => {
    setCursos((prev) => prev.filter((c) => c.key !== key));
  };

  const toggleCollapse = (key: string) => {
    setCursos((prev) =>
      prev.map((c) => (c.key === key ? { ...c, collapsed: !c.collapsed } : c))
    );
  };

  const atualizarCurso = (key: string, curso: string) => {
    setCursos((prev) => prev.map((c) => (c.key === key ? { ...c, curso } : c)));
  };

  const adicionarLinha = (cursoKey: string) => {
    setCursos((prev) =>
      prev.map((c) =>
        c.key === cursoKey
          ? {
              ...c,
              linhas: [
                ...c.linhas,
                {
                  key: `${cursoKey}-${Date.now()}`,
                  disciplina: "",
                  turma: "",
                  carga: "",
                  tipo: "principal" as const,
                },
              ],
            }
          : c
      )
    );
  };

  const removerLinha = (cursoKey: string, linhaKey: string) => {
    setCursos((prev) =>
      prev.map((c) =>
        c.key === cursoKey
          ? { ...c, linhas: c.linhas.filter((l) => l.key !== linhaKey) }
          : c
      )
    );
  };

  const atualizarLinha = (
    cursoKey: string,
    linhaKey: string,
    campo: keyof LinhaForm,
    valor: string | "principal" | "substituto"
  ) => {
    setCursos((prev) =>
      prev.map((c) =>
        c.key === cursoKey
          ? {
              ...c,
              linhas: c.linhas.map((l) =>
                l.key === linhaKey ? { ...l, [campo]: valor } : l
              ),
            }
          : c
      )
    );
  };

  const handleSave = async () => {
    if (!docente) {
      toast.error("Selecione um docente.");
      return;
    }

    // Encontrar o ID do professor pelo nome
    const teacher = teachers.find(t => t.name === docente);
    if (!teacher) {
      toast.error("Professor não encontrado.");
      return;
    }

    const assignments: Array<{
      course_id: string;
      subject_id: string;
      class: string;
      workload_hours: number;
      assignment_type: "principal" | "substituto";
    }> = [];

    for (const cursoForm of cursos) {
      if (!cursoForm.curso) continue;

      // Encontrar o curso pelo nome
      const course = courses.find(c => c.name === cursoForm.curso);
      if (!course) {
        toast.error(`Curso "${cursoForm.curso}" não encontrado.`);
        continue;
      }

      for (const linha of cursoForm.linhas) {
        if (!linha.disciplina || !linha.turma || !linha.carga) continue;

        // Buscar disciplina do curso
        try {
          const subjects = await courseService.getCourseSubjects(course.id);
          const subject = subjects.find(s => s.name === linha.disciplina);
          
          if (!subject) {
            toast.error(`Disciplina "${linha.disciplina}" não encontrada no curso "${cursoForm.curso}".`);
            continue;
          }

          assignments.push({
            course_id: course.id,
            subject_id: subject.id,
            class: linha.turma,
            workload_hours: Number(linha.carga),
            assignment_type: linha.tipo,
          });
        } catch (error: any) {
          toast.error(`Erro ao buscar disciplinas: ${error.message}`);
          continue;
        }
      }
    }

    if (assignments.length === 0) {
      toast.error("Nenhuma atribuição válida para salvar.");
      return;
    }

    try {
      await bulkCreateAssignments({
        teacher_id: teacher.id,
        assignments,
      });
      setOpen(false);
      setEditingDocente(null);
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleEdit = (docente: string) => {
    setEditingDocente(docente);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAssignment(id);
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  // Filtros
  const dadosFiltrados = atribuicoes.filter((item) => {
    const matchCurso = filtroCurso === "todos" || item.curso === filtroCurso;
    const matchDocente =
      !filtroDocente ||
      item.docente.toLowerCase().includes(filtroDocente.toLowerCase());
    return matchCurso && matchDocente;
  });

  // Estatísticas
  const totalTurmas = new Set(atribuicoes.map((a) => a.turma)).size;
  const totalDocentes = new Set(atribuicoes.map((a) => a.docente)).size;
  const mediaTurmasPorDocente =
    totalDocentes > 0 ? (atribuicoes.length / totalDocentes).toFixed(1) : 0;
  const cargaTotal = atribuicoes.reduce((acc, a) => acc + a.carga, 0);
  const mediaCarga =
    totalDocentes > 0 ? (cargaTotal / totalDocentes).toFixed(1) : 0;
  const cursoMaisCarga =
    Object.entries(
      atribuicoes.reduce((acc, a) => {
        acc[a.curso] = (acc[a.curso] || 0) + a.carga;
        return acc;
      }, {} as Record<string, number>)
    )
      .sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  const exportToCSV = () => {
    const headers = ["Docente", "Curso", "Disciplina", "Turma", "Carga (h)", "Tipo"];
    const rows = dadosFiltrados.map((item) => [
      item.docente,
      item.curso,
      item.disciplina,
      item.turma,
      item.carga,
      item.tipo === "principal" ? "Principal" : "Substituto",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `atribuicoes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <div className="flex flex-1 flex-col">
          <NavbarH />
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Turmas e Docentes
                </h1>
                <p className="text-muted-foreground">
                  Atribua um docente a múltiplos cursos e disciplinas de uma vez.
                </p>
              </div>
              <Button onClick={exportToCSV} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar CSV
              </Button>
            </div>

            {/* Estatísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Turmas Ativas
                  </CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTurmas}</div>
                  <p className="text-xs text-muted-foreground">Turmas únicas</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Média de Turmas/Docente
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mediaTurmasPorDocente}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Baseado em {totalDocentes} docentes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Carga Horária Média
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mediaCarga} h</div>
                  <p className="text-xs text-muted-foreground">Por semana</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Curso com Mais Carga
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cursoMaisCarga}</div>
                  <p className="text-xs text-muted-foreground">
                    Maior carga atribuída
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="docentes" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="docentes">Por Docente</TabsTrigger>
                <TabsTrigger value="cursos">Por Curso</TabsTrigger>
                <TabsTrigger value="mapa">Mapa</TabsTrigger>
              </TabsList>

              {/* TAB: Por Docente */}
              <TabsContent value="docentes" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Atribuições por Docente</CardTitle>
                      <Button
                        onClick={() => {
                          setEditingDocente(null);
                          setOpen(true);
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Nova Atribuição
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex-1 min-w-[200px]">
                        <Label>Curso</Label>
                        <Select value={filtroCurso} onValueChange={setFiltroCurso}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            {Array.from(new Set(atribuicoes.map((a) => a.curso)))
                              .sort()
                              .map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <Label>Docente</Label>
                        <Input
                          placeholder="Buscar docente..."
                          value={filtroDocente}
                          onChange={(e) => setFiltroDocente(e.target.value)}
                        />
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Docente</TableHead>
                          <TableHead>Curso</TableHead>
                          <TableHead>Disciplina</TableHead>
                          <TableHead>Turma</TableHead>
                          <TableHead>Carga (h)</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dadosFiltrados.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.docente}
                            </TableCell>
                            <TableCell>{item.curso}</TableCell>
                            <TableCell>{item.disciplina}</TableCell>
                            <TableCell>{item.turma}</TableCell>
                            <TableCell>{item.carga}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  item.tipo === "principal" ? "default" : "secondary"
                                }
                              >
                                {item.tipo === "principal" ? "Principal" : "Substituto"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEdit(item.docente)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB: Por Curso */}
              <TabsContent value="cursos" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Atribuições por Curso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {Array.from(new Set(atribuicoes.map((a) => a.curso)))
                        .sort()
                        .map((curso) => {
                          const turmasDoCurso = atribuicoes.filter(
                            (a) => a.curso === curso
                          );
                          return (
                            <AccordionItem key={curso} value={curso}>
                              <AccordionTrigger>
                                {curso} ({turmasDoCurso.length} atribuições)
                              </AccordionTrigger>
                              <AccordionContent>
                                <Accordion type="single" collapsible>
                                  {Array.from(
                                    new Set(
                                      turmasDoCurso.map((a) => a.disciplina)
                                    )
                                  )
                                    .sort()
                                    .map((disciplina) => {
                                      const itens = turmasDoCurso.filter(
                                        (a) => a.disciplina === disciplina
                                      );
                                      return (
                                        <AccordionItem
                                          key={disciplina}
                                          value={disciplina}
                                        >
                                          <AccordionTrigger>
                                            {disciplina}
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <div className="space-y-2 ml-4">
                                              {itens.map((item) => (
                                                <div
                                                  key={item.id}
                                                  className="flex justify-between items-center py-1"
                                                >
                                                  <span className="font-medium">
                                                    {item.turma}
                                                  </span>
                                                  <div className="flex items-center gap-2">
                                                    <span className="text-sm text-muted-foreground">
                                                      {item.docente}
                                                    </span>
                                                    <Badge
                                                      variant={
                                                        item.tipo === "principal"
                                                          ? "default"
                                                          : "secondary"
                                                      }
                                                      className="text-xs"
                                                    >
                                                      {item.tipo}
                                                    </Badge>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </AccordionContent>
                                        </AccordionItem>
                                      );
                                    })}
                                </Accordion>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB: Mapa */}
              <TabsContent value="mapa" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mapa de Atribuições</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Cards proporcionais à carga horária • Cores por docente
                    </p>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                      {Array.from(new Set(atribuicoes.map((a) => a.curso)))
                        .sort()
                        .map((curso) => {
                          const itensCurso = atribuicoes.filter(
                            (a) => a.curso === curso
                          );
                          const cargaCurso = itensCurso.reduce(
                            (s, i) => s + i.carga,
                            0
                          );

                          return (
                            <div
                              key={curso}
                              className="rounded-lg border bg-card p-4 shadow-sm"
                              style={{ flexGrow: cargaCurso }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-lg">{curso}</h3>
                                <Badge variant="outline">{cargaCurso}h</Badge>
                              </div>
                              <div className="space-y-3">
                                {Array.from(
                                  new Set(itensCurso.map((i) => i.disciplina))
                                )
                                  .sort()
                                  .map((disciplina) => {
                                    const itensDisc = itensCurso.filter(
                                      (i) => i.disciplina === disciplina
                                    );
                                    const cargaDisc = itensDisc.reduce(
                                      (s, i) => s + i.carga,
                                      0
                                    );

                                    return (
                                      <div
                                        key={disciplina}
                                        className="rounded-md bg-muted/30 p-3"
                                        style={{ flexGrow: cargaDisc }}
                                      >
                                        <h4 className="font-medium text-sm">
                                          {disciplina}
                                        </h4>
                                        <div className="mt-2 space-y-1">
                                          {itensDisc.map((item) => {
                                            const hue =
                                              item.docente
                                                .split("")
                                                .reduce(
                                                  (a, c) => a + c.charCodeAt(0),
                                                  0
                                                ) % 360;
                                            const bgColor = `hsl(${hue}, 70%, 90%)`;
                                            const textColor = `hsl(${hue}, 70%, 30%)`;

                                            return (
                                              <div
                                                key={item.id}
                                                className="flex items-center justify-between text-xs"
                                              >
                                                <div className="flex items-center gap-2">
                                                  <span className="font-medium">
                                                    {item.turma}
                                                  </span>
                                                  <span
                                                    className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                                                    style={{
                                                      backgroundColor: bgColor,
                                                      color: textColor,
                                                    }}
                                                  >
                                                    {item.docente}
                                                  </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                  <span>{item.carga}h</span>
                                                  <Badge
                                                    variant={
                                                      item.tipo === "principal"
                                                        ? "default"
                                                        : "secondary"
                                                    }
                                                    className="text-[10px]"
                                                  >
                                                    {item.tipo}
                                                  </Badge>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDocente ? "Editar" : "Nova"} Atribuição
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div>
                <Label>Docente</Label>
                {docente === "Novo Docente" ? (
                  <Input
                    placeholder="Nome do docente"
                    value={docente}
                    onChange={(e) => setDocente(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <Select value={docente} onValueChange={setDocente}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione ou crie novo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(new Set(atribuicoes.map((a) => a.docente)))
                        .sort()
                        .map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      <SelectItem value="Novo Docente">+ Novo Docente</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Cursos e Disciplinas</Label>
                  <Button variant="outline" size="sm" onClick={adicionarCurso}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Curso
                  </Button>
                </div>

                {cursos.map((cursoForm) => (
                  <div
                    key={cursoForm.key}
                    className="rounded-lg border bg-muted/20 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => toggleCollapse(cursoForm.key)}
                        >
                          {cursoForm.collapsed ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronUp className="h-4 w-4" />
                          )}
                        </Button>
                        <Select
                          value={cursoForm.curso}
                          onValueChange={(v) => atualizarCurso(cursoForm.key, v)}
                        >
                          <SelectTrigger className="w-full max-w-xs">
                            <SelectValue placeholder="Selecione curso" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(new Set(atribuicoes.map((a) => a.curso)))
                              .sort()
                              .map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removerCurso(cursoForm.key)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {!cursoForm.collapsed && (
                      <div className="ml-10 space-y-2">
                        {cursoForm.linhas.map((linha) => (
                          <div
                            key={linha.key}
                            className="grid grid-cols-12 gap-2 items-end"
                          >
                            <Input
                              className="col-span-4"
                              placeholder="Disciplina"
                              value={linha.disciplina}
                              onChange={(e) =>
                                atualizarLinha(
                                  cursoForm.key,
                                  linha.key,
                                  "disciplina",
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              className="col-span-2"
                              placeholder="Turma"
                              value={linha.turma}
                              onChange={(e) =>
                                atualizarLinha(
                                  cursoForm.key,
                                  linha.key,
                                  "turma",
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              className="col-span-2"
                              type="number"
                              min="1"
                              placeholder="Carga"
                              value={linha.carga}
                              onChange={(e) =>
                                atualizarLinha(
                                  cursoForm.key,
                                  linha.key,
                                  "carga",
                                  e.target.value
                                )
                              }
                            />
                            <Select
                              value={linha.tipo}
                              onValueChange={(v: "principal" | "substituto") =>
                                atualizarLinha(
                                  cursoForm.key,
                                  linha.key,
                                  "tipo",
                                  v
                                )
                              }
                            >
                              <SelectTrigger className="col-span-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="principal">Principal</SelectItem>
                                <SelectItem value="substituto">Substituto</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                removerLinha(cursoForm.key, linha.key)
                              }
                              className="col-span-1"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => adicionarLinha(cursoForm.key)}
                          className="w-full"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar disciplina
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar Tudo</Button>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}