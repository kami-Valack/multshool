"use client";
import React, { useState } from "react";
import {
  Plus,
  Filter,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Search,
  Edit,
  Trash2,
  Save,
  X,
  ChevronDown,
  GraduationCap,
  User,
  Home,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";

interface Disciplina {
  id: number;
  nome: string;
  cor: string;
  codigo: string;
}

interface BaseItem {
  id: number;
  disciplina: Disciplina;
  turma: string;
  sala: string;
  dia: string;
  horaInicio: string;
  horaFim: string;
  curso: string;
  ano: string;
}

interface Aula extends BaseItem {
  docente: string;
}

interface Prova extends BaseItem {
  tipo: string;
  data: string;
}

type Item = Aula | Prova;

interface FormData {
  disciplina: Disciplina;
  turma: string;
  docente?: string;
  sala: string;
  dia: string;
  horaInicio: string;
  horaFim: string;
  curso: string;
  ano: string;
  tipo?: string;
  data?: string;
}

// Dados de exemplo
const DISCIPLINAS: Disciplina[] = [
  { id: 1, nome: "Matemática I", cor: "#3b82f6", codigo: "MAT101" },
  { id: 2, nome: "Física I", cor: "#10b981", codigo: "FIS101" },
  { id: 3, nome: "Programação I", cor: "#f59e0b", codigo: "PROG101" },
  { id: 4, nome: "Química Geral", cor: "#ef4444", codigo: "QUI101" },
  { id: 5, nome: "Inglês Técnico", cor: "#8b5cf6", codigo: "ING101" },
  { id: 6, nome: "Cálculo I", cor: "#ec4899", codigo: "CAL101" },
];
const CURSOS: string[] = [
  "Engenharia Informática",
  "Engenharia Civil",
  "Medicina",
  "Direito",
];
const TURMAS: string[] = ["EI-1A", "EI-1B", "EC-1A", "MED-1A", "DIR-1A"];
const TURMA_INFO: Record<string, { curso: string; ano: string; }> = {
  "EI-1A": { curso: "Engenharia Informática", ano: "1º Ano" },
  "EI-1B": { curso: "Engenharia Informática", ano: "1º Ano" },
  "EC-1A": { curso: "Engenharia Civil", ano: "1º Ano" },
  "MED-1A": { curso: "Medicina", ano: "1º Ano" },
  "DIR-1A": { curso: "Direito", ano: "1º Ano" },
};
const DOCENTES: string[] = [
  "Dr. João Silva",
  "Dra. Maria Santos",
  "Prof. Carlos Costa",
  "Dra. Ana Ferreira",
  "Prof. Pedro Alves",
];
const SALAS: string[] = [
  "Sala 101",
  "Sala 102",
  "Lab 201",
  "Anfiteatro A",
  "Sala 305",
  "Lab 303",
];
const ANOS: string[] = ["1º Ano", "2º Ano", "3º Ano", "4º Ano"];
const HORAS: string[] = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];
const DIAS: string[] = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const TIPOS_PROVA: string[] = [
  "Teste",
  "Exame Final",
  "Exame Recorrência",
  "Prova Prática",
  "Prova Oral",
];
export default function HorariosPage() {
  const [view, setView] = useState<"horarios" | "provas">("horarios");
  const [filtroTipo, setFiltroTipo] = useState<"turma" | "curso" | "docente" | "ano">("turma");
  const [filtroValor, setFiltroValor] = useState<string>(TURMAS[0]);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [selectedProva, setSelectedProva] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [aulas, setAulas] = useState<Aula[]>([
    {
      id: 1,
      disciplina: DISCIPLINAS[0],
      turma: "EI-1A",
      docente: DOCENTES[0],
      sala: "Sala 101",
      dia: "Segunda",
      horaInicio: "08:00",
      horaFim: "10:00",
      curso: "Engenharia Informática",
      ano: "1º Ano",
    },
    {
      id: 2,
      disciplina: DISCIPLINAS[1],
      turma: "EI-1A",
      docente: DOCENTES[1],
      sala: "Lab 201",
      dia: "Terça",
      horaInicio: "10:00",
      horaFim: "12:00",
      curso: "Engenharia Informática",
      ano: "1º Ano",
    },
    {
      id: 3,
      disciplina: DISCIPLINAS[2],
      turma: "EI-1A",
      docente: DOCENTES[2],
      sala: "Sala 102",
      dia: "Quarta",
      horaInicio: "14:00",
      horaFim: "16:00",
      curso: "Engenharia Informática",
      ano: "1º Ano",
    },
    {
      id: 4,
      disciplina: DISCIPLINAS[3],
      turma: "EI-1A",
      docente: DOCENTES[0],
      sala: "Lab 303",
      dia: "Quinta",
      horaInicio: "09:00",
      horaFim: "11:00",
      curso: "Engenharia Informática",
      ano: "1º Ano",
    },
    {
      id: 5,
      disciplina: DISCIPLINAS[4],
      turma: "EI-1A",
      docente: DOCENTES[3],
      sala: "Sala 102",
      dia: "Sexta",
      horaInicio: "15:00",
      horaFim: "17:00",
      curso: "Engenharia Informática",
      ano: "1º Ano",
    },
  ]);
  const [provas, setProvas] = useState<Prova[]>([
    {
      id: 1,
      tipo: "Exame Final",
      disciplina: DISCIPLINAS[0],
      turma: "EI-1A",
      sala: "Anfiteatro A",
      dia: "Sexta",
      horaInicio: "09:00",
      horaFim: "11:00",
      data: "2025-12-15",
      curso: "Engenharia Informática",
      ano: "1º Ano",
    },
    {
      id: 2,
      tipo: "Teste",
      disciplina: DISCIPLINAS[2],
      turma: "EI-1A",
      sala: "Sala 101",
      dia: "Quarta",
      horaInicio: "08:00",
      horaFim: "10:00",
      data: "2025-11-20",
      curso: "Engenharia Informática",
      ano: "1º Ano",
    },
  ]);
  const [formData, setFormData] = useState<FormData>({
    disciplina: DISCIPLINAS[0],
    turma: TURMAS[0],
    docente: DOCENTES[0],
    sala: SALAS[0],
    dia: DIAS[0],
    horaInicio: HORAS[0],
    horaFim: HORAS[2],
    curso: CURSOS[0],
    ano: ANOS[0],
    tipo: TIPOS_PROVA[0],
    data: "",
  });
  const filtrarItens = (itens: Item[]): Item[] => {
    return itens.filter((item: Item) => {
      switch (filtroTipo) {
        case "turma":
          return item.turma === filtroValor;
        case "curso":
          return item.curso === filtroValor;
        case "docente":
          return "docente" in item && item.docente === filtroValor;
        case "ano":
          return item.ano === filtroValor;
        default:
          return true;
      }
    });
  };
  const itensFiltrados: Item[] =
    view === "horarios" ? filtrarItens(aulas) : filtrarItens(provas);
  const abrirModal = (item: Item | null = null) => {
    setEditingItem(item);
    if (item) {
      const base: FormData = {
        disciplina: item.disciplina,
        turma: item.turma,
        sala: item.sala,
        dia: item.dia,
        horaInicio: item.horaInicio,
        horaFim: item.horaFim,
        curso: item.curso,
        ano: item.ano,
      };
      if ("docente" in item) {
        base.docente = item.docente;
      }
      if ("tipo" in item) {
        base.tipo = item.tipo;
        base.data = item.data;
      }
      setFormData(base);
    } else {
      const turmaInfo = TURMA_INFO[filtroValor];
      setFormData({
        disciplina: DISCIPLINAS[0],
        turma: filtroValor,
        docente: DOCENTES[0],
        sala: SALAS[0],
        dia: DIAS[0],
        horaInicio: HORAS[0],
        horaFim: HORAS[2],
        curso: turmaInfo.curso,
        ano: turmaInfo.ano,
        tipo: TIPOS_PROVA[0],
        data: "",
      });
    }
    setShowModal(true);
  };
  const confirmarDeletar = () => {
    if (deletingId !== null) {
      if (view === "horarios") {
        setAulas(aulas.filter((a) => a.id !== deletingId));
      } else {
        setProvas(provas.filter((p) => p.id !== deletingId));
      }
    }
    setShowDeleteModal(false);
    setDeletingId(null);
  };
  const abrirDeletar = (id: number) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };
  const salvarItem = () => {
    if (view === "horarios") {
      const aulaData: Omit<Aula, "id"> = {
        disciplina: formData.disciplina,
        turma: formData.turma,
        docente: formData.docente!,
        sala: formData.sala,
        dia: formData.dia,
        horaInicio: formData.horaInicio,
        horaFim: formData.horaFim,
        curso: formData.curso,
        ano: formData.ano,
      };
      if (editingItem) {
        setAulas(
          aulas.map((a) =>
            a.id === editingItem.id ? { ...aulaData, id: a.id } : a
          )
        );
      } else {
        setAulas([...aulas, { ...aulaData, id: Date.now() }]);
      }
    } else {
      const provaData: Omit<Prova, "id"> = {
        tipo: formData.tipo!,
        disciplina: formData.disciplina,
        turma: formData.turma,
        sala: formData.sala,
        dia: formData.dia,
        horaInicio: formData.horaInicio,
        horaFim: formData.horaFim,
        data: formData.data!,
        curso: formData.curso,
        ano: formData.ano,
      };
      if (editingItem) {
        setProvas(
          provas.map((p) =>
            p.id === editingItem.id ? { ...provaData, id: p.id } : p
          )
        );
      } else {
        setProvas([...provas, { ...provaData, id: Date.now() }]);
      }
    }
    setShowModal(false);
  };
  const getOpcoesValor = (): string[] => {
    switch (filtroTipo) {
      case "turma":
        return TURMAS;
      case "curso":
        return CURSOS;
      case "docente":
        return DOCENTES;
      case "ano":
        return ANOS;
      default:
        return [];
    }
  };
  const renderAulaCard = (item: Item, duracao: number) => (
    <div
      className="rounded-lg p-3 mb-2 shadow-md hover:shadow-lg transition-all cursor-pointer group relative border-l-4"
      style={{
        backgroundColor: `${item.disciplina.cor}15`,
        borderLeftColor: item.disciplina.cor,
        minHeight: duracao > 1 ? `${duracao * 90}px` : "auto",
      }}
      onClick={() => abrirModal(item)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div
            className="font-bold text-sm mb-1"
            style={{ color: item.disciplina.cor }}
          >
            {item.disciplina.nome}
          </div>
          <Badge variant="outline" className="text-xs mb-1">
            {item.disciplina.codigo}
          </Badge>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              abrirModal(item);
            }}
          >
            <Edit size={14} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              abrirDeletar(item.id);
            }}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
      <div className="space-y-1 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Home size={12} />
          <span>{item.sala}</span>
        </div>
        {view === "horarios" && (
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{(item as Aula).docente}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span className="font-medium">
            {item.horaInicio} - {item.horaFim}
          </span>
        </div>
        {view === "provas" && (
          <Badge
            className="mt-2"
            style={{ backgroundColor: item.disciplina.cor }}
          >
            {(item as Prova).tipo}
          </Badge>
        )}
      </div>
    </div>
  );
  const renderGrade = () => (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="grid grid-cols-[120px_repeat(5,minmax(180px,1fr))] gap-0 border rounded-xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-{gradient-to-br} from-slate-800 to-slate-900 text-white p-4 font-bold flex items-center justify-center">
            <Clock className="mr-2" size={18} />
            Horário
          </div>
          {DIAS.map((dia) => (
            <div
              key={dia}
              className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4 font-bold text-center border-l border-slate-700"
            >
              <div className="text-lg">{dia}</div>
            </div>
          ))}
          {/* Grade */}
          {HORAS.map((hora, horaIdx) => (
            <React.Fragment key={hora}>
              <div className="bg-slate-50 p-4 font-semibold text-sm border-t border-r flex items-center justify-center text-slate-700">
                {hora}
              </div>
              {DIAS.map((dia) => {
                const aulasNaCelula: Item[] = itensFiltrados.filter((item: Item) => {
                  const horaInicioIdx = HORAS.indexOf(item.horaInicio);
                  return item.dia === dia && horaInicioIdx === horaIdx;
                });
                return (
                  <div
                    key={`${dia}-${hora}`}
                    className="border-t border-r p-2 min-h-[100px] bg-white hover:bg-slate-50 transition-colors"
                  >
                    {aulasNaCelula.map((aula: Item) => {
                      const duracao =
                        HORAS.indexOf(aula.horaFim) -
                        HORAS.indexOf(aula.horaInicio);
                      return (
                        <div key={aula.id}>{renderAulaCard(aula, duracao)}</div>
                      );
                    })}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
  const renderReadOnlyField = (label: string, value: string) => (
    <div className="col-span-1">
      <Label>{label}</Label>
      <div className="p-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700">
        {value}
      </div>
    </div>
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
            <div className="min-h-screen from-slate-50 to-slate-100 p-6">
              <div>
                <h1 className="text-4xl font-bold text-gray mb-2 flex items-center gap-3 ">
                  Gestão de Horários
                </h1>
                <p className="text-gray-500 text-lg pb-9">
                  Faça a gestão de horários de aulas, provas e exames de forma
                  eficiente
                </p>
              </div>
              <Dialog open={showModal} onOpenChange={setShowModal}>
                {(() => {
                  const isHorarios = view === "horarios";
                  const currentSelected = isHorarios ? selectedHorario : selectedProva;
                  const setCurrentSelected = isHorarios ? setSelectedHorario : setSelectedProva;
                  const data: Item[] = isHorarios ? aulas : provas;
                  const turmasComCount = TURMAS.map((t: string) => ({
                    turma: t,
                    ...TURMA_INFO[t],
                    count: data.filter((item: Item) => item.turma === t).length,
                  }));
                  return (
                    <div className="max-w-[1800px] mx-auto space-y-6">
                      <Card className="shadow-lg">
                        <CardHeader>
                          <Tabs value={view} onValueChange={(value) => setView(value as "horarios" | "provas")} className="w-full">
                            <TabsList className="grid w-full max-w-md grid-cols-2">
                              <TabsTrigger
                                value="horarios"
                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                              >
                                <Calendar className="mr-2" size={18} />
                                Horários de Aulas
                              </TabsTrigger>
                              <TabsTrigger
                                value="provas"
                                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                              >
                                <BookOpen className="mr-2" size={18} />
                                Provas e Exames
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </CardHeader>
                        <CardContent className="mt-6">
                          {!currentSelected ? (
                            <div>
                              <h2 className="text-2xl font-semibold mb-4">
                                Selecione uma turma para visualizar os horários
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {turmasComCount.map(({ turma, curso, ano, count }) => (
                                  <Card
                                    key={turma}
                                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-gray hover:border-blue-300"
                                    onClick={() => {
                                      setFiltroTipo("turma");
                                      setFiltroValor(turma);
                                      setCurrentSelected(turma);
                                    }}
                                  >
                                    <CardHeader>
                                      <CardTitle className="text-lg">{turma}</CardTitle>
                                      <CardDescription className="text-sm">
                                        {curso} - {ano}
                                      </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                      <div className="flex justify-between items-center">
                                        <Badge variant={count > 0 ? "default" : "secondary"}>
                                          {count} {isHorarios ? "aulas" : "provas"}
                                        </Badge>
                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-900 flex items-center gap-2">
                                  <Users size={14} />
                                  Visualizando: Turma <strong>{currentSelected}</strong> -{" "}
                                  <strong>{TURMA_INFO[currentSelected].curso}</strong>
                                </p>
                                <p className="text-xs text-green-700 mt-1">
                                  {itensFiltrados.length} {isHorarios ? "aulas" : "provas"} encontradas
                                </p>
                              </div>
                              <div className="flex justify-between items-center">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setCurrentSelected(null)}
                                >
                                  Voltar às turmas
                                </Button>
                                <DialogTrigger asChild>
                                  <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                                  >
                                    <Plus className="mr-2" size={20} />
                                    {isHorarios ? "Nova Aula" : "Nova Prova"}
                                  </Button>
                                </DialogTrigger>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      {currentSelected && (
                        <Card className="shadow-lg">
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span>Grade Horária Semestral</span>
                              <Badge variant="outline" className="text-sm">
                                Semestre 2025/1
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>{renderGrade()}</CardContent>
                        </Card>
                      )}
                    </div>
                  );
                })()}
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      {editingItem ? "Editar" : "Adicionar"}{" "}
                      {view === "horarios" ? "Aula" : "Prova"}
                    </DialogTitle>
                    <DialogDescription>
                      Preencha os campos abaixo para{" "}
                      {editingItem ? "atualizar" : "criar"} o registo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="disciplina">Disciplina</Label>
                        <Select
                          value={formData.disciplina.id.toString()}
                          onValueChange={(val) =>
                            setFormData({
                              ...formData,
                              disciplina: DISCIPLINAS.find(
                                (d) => d.id === parseInt(val)
                              )!,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DISCIPLINAS.map((d) => (
                              <SelectItem
                                key={d.id}
                                value={d.id.toString()}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: d.cor }}
                                  ></div>
                                  {d.nome} ({d.codigo})
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {view === "provas" && (
                        <div className="col-span-2">
                          <Label htmlFor="tipo">Tipo de Avaliação</Label>
                          <Select
                            value={formData.tipo || ""}
                            onValueChange={(val) =>
                              setFormData({ ...formData, tipo: val })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {TIPOS_PROVA.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {editingItem ? (
                        <div>
                          <Label htmlFor="turma">Turma</Label>
                          <Select
                            value={formData.turma}
                            onValueChange={(val) =>
                              setFormData({ ...formData, turma: val })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {TURMAS.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        renderReadOnlyField("Turma", formData.turma)
                      )}
                      {editingItem ? (
                        <div>
                          <Label htmlFor="curso">Curso</Label>
                          <Select
                            value={formData.curso}
                            onValueChange={(val) =>
                              setFormData({ ...formData, curso: val })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CURSOS.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        renderReadOnlyField("Curso", formData.curso)
                      )}
                      {editingItem ? (
                        <div>
                          <Label htmlFor="ano">Ano</Label>
                          <Select
                            value={formData.ano}
                            onValueChange={(val) =>
                              setFormData({ ...formData, ano: val })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ANOS.map((a) => (
                                <SelectItem key={a} value={a}>
                                  {a}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        renderReadOnlyField("Ano", formData.ano)
                      )}
                      {view === "horarios" && (
                        <div>
                          <Label htmlFor="docente">Docente</Label>
                          <Select
                            value={formData.docente || ""}
                            onValueChange={(val) =>
                              setFormData({ ...formData, docente: val })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DOCENTES.map((d) => (
                                <SelectItem key={d} value={d}>
                                  {d}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <div
                        className={view === "provas" ? "col-span-2" : ""}
                      >
                        <Label htmlFor="sala">Sala</Label>
                        <Select
                          value={formData.sala}
                          onValueChange={(val) =>
                            setFormData({ ...formData, sala: val })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SALAS.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="dia">Dia da Semana</Label>
                        <Select
                          value={formData.dia}
                          onValueChange={(val) =>
                            setFormData({ ...formData, dia: val })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DIAS.map((d) => (
                              <SelectItem key={d} value={d}>
                                {d}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="horaInicio">Hora Início</Label>
                        <Select
                          value={formData.horaInicio}
                          onValueChange={(val) =>
                            setFormData({ ...formData, horaInicio: val })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {HORAS.map((h) => (
                              <SelectItem key={h} value={h}>
                                {h}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="horaFim">Hora Fim</Label>
                        <Select
                          value={formData.horaFim}
                          onValueChange={(val) =>
                            setFormData({ ...formData, horaFim: val })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {HORAS.map((h) => (
                              <SelectItem key={h} value={h}>
                                {h}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {view === "provas" && (
                        <div>
                          <Label htmlFor="data">Data</Label>
                          <Input
                            type="date"
                            value={formData.data || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                data: e.target.value,
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                    <Separator />
                    <div className="flex gap-3">
                      <Button
                        onClick={salvarItem}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700"
                      >
                        <Save className="mr-2" size={18} />
                        Salvar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowModal(false)}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="text-red-600" size={24} />
                      Confirmar Eliminação
                    </DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja eliminar este item? Esta ação não pode ser desfeita.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowDeleteModal(false);
                        setDeletingId(null);
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={confirmarDeletar}
                    >
                      Eliminar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}