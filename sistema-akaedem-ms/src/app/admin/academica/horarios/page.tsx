"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import { useSchedules } from "@/hooks/useSchedules";
import { useClasses } from "@/hooks/useClasses";
import { useCourses } from "@/hooks/useCourses";
import { useTeachers } from "@/hooks/useTeachers";
import { courseService, CourseSubject } from "@/lib/api/services/course.service";
import { Schedule } from "@/lib/api/services/schedule.service";
import { toast } from "sonner";

interface Disciplina {
  id: string;
  nome: string;
  cor: string;
  codigo: string;
}

interface BaseItem {
  id: string;
  scheduleId: string; // ID do schedule na API
  disciplina: Disciplina;
  turma: string;
  sala: string;
  dia: string;
  horaInicio: string;
  horaFim: string;
  curso: string;
  cursoId: string;
  ano: string;
}

interface Aula extends BaseItem {
  docente: string;
  teacherId?: string;
}

interface Prova extends BaseItem {
  tipo: string;
  data: string;
}

type Item = Aula | Prova;

interface FormData {
  disciplina: Disciplina | null;
  turma: string;
  classId?: string;
  docente?: string;
  teacherId?: string;
  sala: string;
  dia: string;
  horaInicio: string;
  horaFim: string;
  curso: string;
  cursoId: string;
  ano: string;
  tipo?: string;
  data?: string;
  academicYear: string;
  semester?: number;
}

// Cores para disciplinas (geradas dinamicamente)
const CORES_DISCIPLINAS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899",
  "#06b6d4", "#84cc16", "#f97316", "#a855f7", "#e11d48", "#14b8a6"
];

const HORAS: string[] = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

const DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const DIAS_API = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const TIPOS_PROVA: Record<string, string> = {
  "test": "Teste",
  "final_exam": "Exame Final",
  "recovery_exam": "Exame Recorrência",
  "practical_exam": "Prova Prática",
  "oral_exam": "Prova Oral",
};

const TIPOS_PROVA_REVERSO: Record<string, string> = {
  "Teste": "test",
  "Exame Final": "final_exam",
  "Exame Recorrência": "recovery_exam",
  "Prova Prática": "practical_exam",
  "Prova Oral": "oral_exam",
};

// Função para mapear dia da API para português
const mapDayToPortuguese = (day: string): string => {
  const mapping: Record<string, string> = {
    monday: "Segunda",
    tuesday: "Terça",
    wednesday: "Quarta",
    thursday: "Quinta",
    friday: "Sexta",
    saturday: "Sábado",
    sunday: "Domingo",
  };
  return mapping[day] || day;
};

// Função para mapear dia em português para API
const mapDayToAPI = (day: string): string => {
  const mapping: Record<string, string> = {
    "Segunda": "monday",
    "Terça": "tuesday",
    "Quarta": "wednesday",
    "Quinta": "thursday",
    "Sexta": "friday",
    "Sábado": "saturday",
    "Domingo": "sunday",
  };
  return mapping[day] || day;
};
export default function HorariosPage() {
  // Hooks para buscar dados da API
  const { schedules, loading: schedulesLoading, createSchedule, updateSchedule, deleteSchedule, fetchSchedules } = useSchedules({ autoFetch: true });
  const { classes, loading: classesLoading } = useClasses();
  const { courses, loading: coursesLoading } = useCourses();
  const { teachers, loading: teachersLoading } = useTeachers();
  
  // Debug: Log dos dados carregados
  useEffect(() => {
    console.log('[HorariosPage] Schedules carregados:', schedules.length);
    console.log('[HorariosPage] Classes carregadas:', classes.length);
    console.log('[HorariosPage] Courses carregados:', courses.length);
  }, [schedules, classes, courses]);
  
  // Estados para disciplinas e salas
  const [subjectsMap, setSubjectsMap] = useState<Record<string, CourseSubject[]>>({});
  const [loadingSubjects, setLoadingSubjects] = useState<Record<string, boolean>>({});
  const [rooms, setRooms] = useState<string[]>([]);
  
  const [view, setView] = useState<"horarios" | "provas">("horarios");
  const [filtroTipo, setFiltroTipo] = useState<"turma" | "curso" | "docente" | "ano">("turma");
  const [filtroValor, setFiltroValor] = useState<string>("");
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [selectedProva, setSelectedProva] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  
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
  
  // Extrair salas únicas dos horários
  useEffect(() => {
    const uniqueRooms = Array.from(new Set(schedules.filter(s => s.room).map(s => s.room!)));
    setRooms(uniqueRooms.sort());
  }, [schedules]);
  
  // Mapear Schedule da API para Item da UI
  const mapScheduleToItem = useCallback((schedule: Schedule, subjectColor: string): Item => {
    const disciplina: Disciplina = {
      id: schedule.subject_id,
      nome: schedule.subject?.name || "N/A",
      codigo: schedule.subject?.code || "",
      cor: subjectColor,
    };
    
    // Buscar nome do professor
    const teacher = schedule.teacher_id ? teachers.find(t => t.id === schedule.teacher_id) : null;
    const teacherName = teacher?.name || (schedule.teacher_id ? "N/A" : "Não atribuído");
    
    const baseItem: BaseItem = {
      id: `item-${schedule.id}`,
      scheduleId: schedule.id,
      disciplina,
      turma: schedule.class_name,
      sala: schedule.room || "N/A",
      dia: mapDayToPortuguese(schedule.day_of_week),
      horaInicio: schedule.start_time,
      horaFim: schedule.end_time,
      curso: schedule.course?.name || "N/A",
      cursoId: schedule.course_id,
      ano: schedule.semester ? `${schedule.semester}º Semestre` : "N/A",
    };
    
    if (schedule.type === "exam") {
      return {
        ...baseItem,
        tipo: schedule.exam_type_portuguese || TIPOS_PROVA[schedule.exam_type || ""] || schedule.exam_type || "N/A",
        data: schedule.exam_date || "",
      } as Prova;
    } else {
      return {
        ...baseItem,
        docente: teacherName,
        teacherId: schedule.teacher_id,
      } as Aula;
    }
  }, [teachers]);
  
  // Converter schedules para itens
  const aulas: Aula[] = useMemo(() => {
    return schedules
      .filter(s => s.type === "class" && s.is_active)
      .map((schedule, index) => {
        const color = CORES_DISCIPLINAS[index % CORES_DISCIPLINAS.length];
        return mapScheduleToItem(schedule, color) as Aula;
      });
  }, [schedules, mapScheduleToItem]);
  
  const provas: Prova[] = useMemo(() => {
    return schedules
      .filter(s => s.type === "exam" && s.is_active)
      .map((schedule, index) => {
        const color = CORES_DISCIPLINAS[index % CORES_DISCIPLINAS.length];
        return mapScheduleToItem(schedule, color) as Prova;
      });
  }, [schedules, mapScheduleToItem]);
  
  // Dados derivados
  const turmas = useMemo(() => {
    return Array.from(new Set(classes.map(c => c.name))).sort();
  }, [classes]);
  
  const cursos = useMemo(() => {
    return courses.map(c => ({ id: c.id, nome: c.name }));
  }, [courses]);
  
  const turmaInfo = useMemo(() => {
    const info: Record<string, { curso: string; cursoId: string; ano: string }> = {};
    classes.forEach(cls => {
      const course = courses.find(c => c.id === cls.course_id);
      info[cls.name] = {
        curso: course?.name || "N/A",
        cursoId: cls.course_id,
        ano: cls.semester ? `${cls.semester}º Semestre` : cls.academic_year,
      };
    });
    return info;
  }, [classes, courses]);
  
  // Form data inicial - DEVE ser declarado ANTES do useMemo que o usa
  const [formData, setFormData] = useState<FormData>({
    disciplina: null,
    turma: "",
    classId: undefined,
    docente: "",
    teacherId: undefined,
    sala: "",
    dia: DIAS_SEMANA[0],
    horaInicio: HORAS[0],
    horaFim: HORAS[2],
    curso: "",
    cursoId: "",
    ano: "",
    tipo: "Teste",
    data: "",
    academicYear: new Date().getFullYear() + "/" + (new Date().getFullYear() + 1),
    semester: 1,
  });
  
  // Disciplinas filtradas pelo curso selecionado
  const disciplinas = useMemo(() => {
    if (!formData.cursoId) {
      return [];
    }
    
    const courseSubjects = subjectsMap[formData.cursoId] || [];
    return courseSubjects.map((subject, index) => ({
      id: subject.id,
      nome: subject.name,
      codigo: subject.code || "",
      cor: CORES_DISCIPLINAS[index % CORES_DISCIPLINAS.length],
    }));
  }, [subjectsMap, formData.cursoId]);
  
  // Carregar disciplinas quando curso for selecionado
  useEffect(() => {
    if (formData.cursoId) {
      loadCourseSubjects(formData.cursoId);
    }
  }, [formData.cursoId]);
  
  // Atualizar formData quando turma for selecionada
  useEffect(() => {
    if (formData.turma && turmaInfo[formData.turma]) {
      const info = turmaInfo[formData.turma];
      setFormData(prev => ({
        ...prev,
        curso: info.curso,
        cursoId: info.cursoId,
        ano: info.ano,
      }));
    }
  }, [formData.turma, turmaInfo]);
  
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
      const schedule = schedules.find(s => s.id === item.scheduleId);
      const base: FormData = {
        disciplina: item.disciplina,
        turma: item.turma,
        classId: schedule?.class_id,
        sala: item.sala,
        dia: item.dia,
        horaInicio: item.horaInicio,
        horaFim: item.horaFim,
        curso: item.curso,
        cursoId: item.cursoId,
        ano: item.ano,
        academicYear: schedule?.academic_year || formData.academicYear,
        semester: schedule?.semester || formData.semester,
      };
      if ("docente" in item) {
        base.docente = item.docente;
        base.teacherId = item.teacherId;
        // Se tiver teacherId, garantir que está no formData
        if (item.teacherId) {
          const teacher = teachers.find(t => t.id === item.teacherId);
          if (teacher) {
            base.docente = teacher.name;
          }
        }
      }
      if ("tipo" in item) {
        base.tipo = item.tipo;
        base.data = item.data;
      }
      setFormData(base);
      
      // Carregar disciplinas do curso ao editar
      if (base.cursoId) {
        loadCourseSubjects(base.cursoId);
      }
    } else {
      // Quando criar novo horário, usar a turma selecionada ou a primeira disponível
      const turmaSelecionada = selectedHorario || selectedProva || filtroValor || (turmas.length > 0 ? turmas[0] : "");
      const info = turmaInfo[turmaSelecionada] || { curso: "", cursoId: "", ano: "" };
      const selectedClass = classes.find(c => c.name === turmaSelecionada);
      
      // Se não tiver cursoId, tentar pegar do primeiro curso disponível
      let cursoIdFinal = info.cursoId;
      let cursoFinal = info.curso;
      if (!cursoIdFinal && courses.length > 0) {
        cursoIdFinal = courses[0].id;
        cursoFinal = courses[0].name;
      }
      
      setFormData({
        disciplina: null,
        turma: turmaSelecionada,
        classId: selectedClass?.id,
        docente: "",
        teacherId: undefined,
        sala: rooms[0] || "",
        dia: DIAS_SEMANA[0],
        horaInicio: HORAS[0],
        horaFim: HORAS[2],
        curso: cursoFinal,
        cursoId: cursoIdFinal,
        ano: info.ano || (selectedClass?.semester ? `${selectedClass.semester}º Semestre` : ""),
        tipo: "Teste",
        data: "",
        academicYear: selectedClass?.academic_year || new Date().getFullYear() + "/" + (new Date().getFullYear() + 1),
        semester: selectedClass?.semester || 1,
      });
      
      // Carregar disciplinas se tiver cursoId
      if (cursoIdFinal) {
        loadCourseSubjects(cursoIdFinal);
      }
    }
    setShowModal(true);
  };
  const confirmarDeletar = async () => {
    if (deletingId !== null) {
      try {
        await deleteSchedule(deletingId);
    setShowDeleteModal(false);
    setDeletingId(null);
      } catch (error) {
        // Erro já é tratado no hook
      }
    }
  };
  
  const abrirDeletar = (scheduleId: string) => {
    setDeletingId(scheduleId);
    setShowDeleteModal(true);
  };
  
  const salvarItem = async () => {
    if (!formData.disciplina || !formData.cursoId || !formData.turma) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      console.error("[salvarItem] Campos faltando:", {
        disciplina: !!formData.disciplina,
        cursoId: !!formData.cursoId,
        turma: !!formData.turma,
        formData
      });
      return;
    }
    
    try {
      const selectedClass = classes.find(c => c.name === formData.turma);
      const scheduleData = {
        class_id: selectedClass?.id,
        class_name: formData.turma,
        course_id: formData.cursoId,
        subject_id: formData.disciplina.id,
        teacher_id: formData.teacherId || undefined,
        day_of_week: mapDayToAPI(formData.dia) as any,
        start_time: formData.horaInicio,
        end_time: formData.horaFim,
        room: formData.sala || undefined,
        type: view === "horarios" ? "class" as const : "exam" as const,
        exam_type: view === "provas" ? (TIPOS_PROVA_REVERSO[formData.tipo || ""] as any) : undefined,
        exam_date: view === "provas" ? formData.data : undefined,
        academic_year: formData.academicYear,
        semester: formData.semester,
        is_active: true,
      };
      
      console.log("[salvarItem] Dados a enviar:", scheduleData);
      
      if (editingItem) {
        await updateSchedule(editingItem.scheduleId, scheduleData);
      } else {
        await createSchedule(scheduleData);
      }
      
    setShowModal(false);
      setEditingItem(null);
    } catch (error: any) {
      // Erro já é tratado no hook
      console.error("Erro ao salvar horário:", error);
    }
  };
  const getOpcoesValor = (): string[] => {
    switch (filtroTipo) {
      case "turma":
        return turmas;
      case "curso":
        return cursos.map(c => c.nome);
      case "docente":
        // TODO: Buscar professores da API
        return [];
      case "ano":
        return Array.from(new Set(classes.map(c => c.academic_year))).sort();
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
              abrirDeletar(item.scheduleId);
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
          {DIAS_SEMANA.map((dia) => (
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
              {DIAS_SEMANA.map((dia) => {
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
                  const turmasComCount = turmas.map((t: string) => ({
                    turma: t,
                    ...(turmaInfo[t] || { curso: "N/A", cursoId: "", ano: "N/A" }),
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
                                  <strong>{turmaInfo[currentSelected]?.curso || "N/A"}</strong>
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
                                  <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                                  onClick={() => abrirModal(null)}
                                  >
                                    <Plus className="mr-2" size={20} />
                                    {isHorarios ? "Nova Aula" : "Nova Prova"}
                                  </Button>
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
                          <CardContent>
                            {itensFiltrados.length === 0 ? (
                              <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">Nenhum horário cadastrado para esta turma.</p>
                                <p className="text-sm text-gray-400">Clique em "Nova Aula" para adicionar horários.</p>
                              </div>
                            ) : (
                              renderGrade()
                            )}
                          </CardContent>
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
                          value={formData.disciplina?.id || ""}
                          onValueChange={(val) => {
                            const disciplina = disciplinas.find(d => d.id === val);
                            setFormData({
                              ...formData,
                              disciplina: disciplina || null,
                            });
                          }}
                          disabled={!formData.cursoId || loadingSubjects[formData.cursoId]}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={
                              !formData.cursoId 
                                ? "Selecione um curso primeiro" 
                                : loadingSubjects[formData.cursoId]
                                ? "Carregando disciplinas..."
                                : disciplinas.length === 0
                                ? "Nenhuma disciplina encontrada para este curso"
                                : "Selecione a disciplina"
                            } />
                          </SelectTrigger>
                          <SelectContent>
                            {disciplinas.length === 0 && formData.cursoId ? (
                              <div className="px-2 py-1.5 text-sm text-gray-500">
                                {loadingSubjects[formData.cursoId]
                                  ? "Carregando disciplinas..."
                                  : "Nenhuma disciplina disponível para este curso"}
                              </div>
                            ) : (
                              disciplinas.map((d) => (
                                <SelectItem
                                  key={d.id}
                                  value={d.id}
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: d.cor }}
                                    ></div>
                                    {d.nome} {d.codigo && `(${d.codigo})`}
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        {formData.cursoId && !loadingSubjects[formData.cursoId] && disciplinas.length === 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Este curso não possui disciplinas cadastradas. Adicione disciplinas na página de Cursos.
                          </p>
                        )}
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
                              {Object.values(TIPOS_PROVA).map((t) => (
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
                              {turmas.map((t) => (
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
                            value={formData.cursoId}
                            onValueChange={(val) => {
                              const curso = cursos.find(c => c.id === val);
                              setFormData({ 
                                ...formData, 
                                cursoId: val,
                                curso: curso?.nome || "",
                                disciplina: null // Limpar disciplina ao mudar curso
                              });
                              // Carregar disciplinas do novo curso
                              if (val) {
                                loadCourseSubjects(val);
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {cursos.map((c) => (
                                <SelectItem key={c.id} value={c.id}>
                                  {c.nome}
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
                              {Array.from(new Set(classes.map(c => c.academic_year))).sort().map((a) => (
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
                          <Label htmlFor="docente">Docente (opcional)</Label>
                          <Select
                            value={formData.teacherId || "__none__"}
                            onValueChange={(val) => {
                              if (val === "__none__") {
                                setFormData({ 
                                  ...formData, 
                                  teacherId: undefined,
                                  docente: ""
                                });
                              } else {
                                const teacher = teachers.find(t => t.id === val);
                                setFormData({ 
                                  ...formData, 
                                  teacherId: val,
                                  docente: teacher?.name || ""
                                });
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o docente (opcional)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none__">Nenhum docente</SelectItem>
                              {teachers.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.id}>
                                  {teacher.name} {teacher.department && `- ${teacher.department}`}
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
                            {rooms.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                            <SelectItem value="__new__">+ Adicionar nova sala</SelectItem>
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
                            {DIAS_SEMANA.map((d) => (
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