// app/academica/page.tsx
"use client";

import * as React from "react";
import {
  mockStudents,
  mockPayments,
  mockDocuments,
  mockGrades,
  mockHistory,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  User,
  Users,
  UserX,
  GraduationCap,
  GripVertical,
  MoreVertical,
  Search,
  ChevronLeft,
  ChevronRight,
  Upload,
  Download,
  Mail,
  Key,
  FileText,
  CheckCircle2,
} from "lucide-react";
import jsPDF from "jspdf";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";

type Student = (typeof mockStudents)[0];

const formatDate = (date: string) => new Date(date).toLocaleDateString("pt-AO");

// === COMPONENTES AUXILIARES ===
const DragHandle = React.memo(({ id }: { id: number }) => {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7"
    >
      <GripVertical className="size-3" />
    </Button>
  );
});

const QuickView = React.memo(
  ({ student, onOpen }: { student: Student; onOpen: () => void }) => {
    return (
      <Button
        variant="ghost"
        className="flex h-auto w-full items-center gap-3 px-2 py-1.5 text-left"
        onClick={onOpen}
      >
        <div className="size-9 rounded-full bg-muted overflow-hidden">
          {student.photo ? (
            <img
              src={student.photo}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <User className="size-5 text-muted-foreground" />
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-medium">{student.name}</div>
          <div className="text-xs text-muted-foreground">
            {student.studentNumber}
          </div>
        </div>
      </Button>
    );
  }
);

const Actions = React.memo(({ onOpen }: { onOpen: () => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onOpen}>Ver perfil</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

const DraggableRow = React.memo(({ row }: { row: Row<Student> }) => {
  const { transform, transition, setNodeRef } = useSortable({
    id: row.original.id,
  });
  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
});

export default function GerirEstudantes() {
  const [students] = React.useState(mockStudents);
  const [search, setSearch] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("all");
  const [selectedClass, setSelectedClass] = React.useState("all");
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(
    null
  );
  const [isEditing, setIsEditing] = React.useState(false);
  const [showResetDialog, setShowResetDialog] = React.useState(false);
  const [showNotifyDialog, setShowNotifyDialog] = React.useState(false);
  const [resetSuccess, setResetSuccess] = React.useState(false);
  const [notifyTitle, setNotifyTitle] = React.useState("");
  const [notifyMessage, setNotifyMessage] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // === FILTROS ===
  const courses = React.useMemo(
    () => Array.from(new Set(students.map((s) => s.course))),
    [students]
  );
  const classesInCourse = React.useMemo(() => {
    if (selectedCourse === "all")
      return Array.from(new Set(students.map((s) => s.class)));
    return Array.from(
      new Set(
        students.filter((s) => s.course === selectedCourse).map((s) => s.class)
      )
    );
  }, [students, selectedCourse]);

  const filtered = React.useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.studentNumber.includes(search);
      const matchCourse =
        selectedCourse === "all" || s.course === selectedCourse;
      const matchClass = selectedClass === "all" || s.class === selectedClass;
      return matchSearch && matchCourse && matchClass;
    });
  }, [students, search, selectedCourse, selectedClass]);

  const stats = React.useMemo(() => {
    const active = filtered.filter((s) => s.status === "ativo").length;
    const suspended = filtered.filter((s) => s.status === "suspenso").length;
    const graduated = filtered.filter((s) => s.status === "formado").length;
    return { active, suspended, graduated, total: filtered.length };
  }, [filtered]);

  // === TABELA ===
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );
  const dataIds = React.useMemo(() => filtered.map((s) => s.id), [filtered]);

  const columns: ColumnDef<Student>[] = React.useMemo(
    () => [
      { id: "drag", cell: ({ row }) => <DragHandle id={row.original.id} /> },
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
          />
        ),
      },
      {
        accessorKey: "student",
        header: "Estudante",
        cell: ({ row }) => (
          <QuickView
            student={row.original}
            onOpen={() => setSelectedStudent(row.original)}
          />
        ),
      },
      {
        accessorKey: "studentNumber",
        header: "Nº Estudante",
        cell: ({ row }) => (
          <span className="font-mono text-sm">
            {row.original.studentNumber}
          </span>
        ),
      },
      {
        accessorKey: "course",
        header: "Curso",
        cell: ({ row }) => (
          <div className="max-w-[180px] truncate">{row.original.course}</div>
        ),
      },
      {
        accessorKey: "class",
        header: "Turma",
        cell: ({ row }) => (
          <Badge variant="outline">{row.original.class}</Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
          <Badge
            variant={row.original.status === "ativo" ? "default" : "secondary"}
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <Actions onOpen={() => setSelectedStudent(row.original)} />
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    state: { pagination: { pageIndex: 0, pageSize: 10 } },
  });

  // === FUNÇÕES ===
  const handleReset = () => setShowResetDialog(true);
  const confirmReset = () => {
    setResetSuccess(true);
    setTimeout(() => {
      setShowResetDialog(false);
      setResetSuccess(false);
    }, 2500);
  };

  const handleNotify = () => {
    setNotifyTitle("");
    setNotifyMessage("");
    setShowNotifyDialog(true);
  };

  const sendNotification = () => {
    console.log("Notificação enviada:", {
      title: notifyTitle,
      message: notifyMessage,
      to: selectedStudent?.name,
    });
    setShowNotifyDialog(false);
  };

  const generatePDF = () => {
    if (!selectedStudent) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO DE MATRÍCULA", 105, 30, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Nome: ${selectedStudent.name}`, 20, 50);
    doc.text(`Nº: ${selectedStudent.studentNumber}`, 20, 60);
    doc.text(`Curso: ${selectedStudent.course}`, 20, 70);
    doc.text(`Turma: ${selectedStudent.class}`, 20, 80);
    doc.text(`Data: ${new Date().toLocaleDateString("pt-AO")}`, 20, 100);
    doc.save(`declaracao_${selectedStudent.studentNumber}.pdf`);
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
          {/* <SiteHeader /> */}
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <NavbarH />
              <div className="flex-1 p-6 space-y-6">
                {/* HEADER */}
                <div>
                  <h1 className="text-3xl font-bold">Gerir Estudantes</h1>
                  <p className="text-muted-foreground">
                    Acompanhamento académico por curso e turma
                  </p>
                </div>

                {/* FILTROS (CARD NO CONTEÚDO) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filtros</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Pesquisa</Label>
                      <Input
                        placeholder="Nome ou nº"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Curso</Label>
                      <Select
                        value={selectedCourse}
                        onValueChange={(v) => {
                          setSelectedCourse(v);
                          setSelectedClass("all");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os cursos</SelectItem>
                          {courses.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Turma</Label>
                      <Select
                        value={selectedClass}
                        onValueChange={setSelectedClass}
                        disabled={selectedCourse === "all"}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as turmas</SelectItem>
                          {classesInCourse.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* ESTATÍSTICAS */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Ativos
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.active}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Suspensos
                      </CardTitle>
                      <UserX className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {stats.suspended}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Formados
                      </CardTitle>
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {stats.graduated}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* TABELA */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar na tabela..."
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      modifiers={[restrictToVerticalAxis]}
                    >
                      <Table>
                        <TableHeader>
                          {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                              {hg.headers.map((h) => (
                                <TableHead key={h.id}>
                                  {h.isPlaceholder
                                    ? null
                                    : flexRender(
                                        h.column.columnDef.header,
                                        h.getContext()
                                      )}
                                </TableHead>
                              ))}
                            </TableRow>
                          ))}
                        </TableHeader>
                        <TableBody>
                          {table.getRowModel().rows.length ? (
                            <SortableContext
                              items={dataIds}
                              strategy={verticalListSortingStrategy}
                            >
                              {table.getRowModel().rows.map((row) => (
                                <DraggableRow key={row.id} row={row} />
                              ))}
                            </SortableContext>
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                              >
                                Nenhum estudante encontrado.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </DndContext>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                      {table.getFilteredSelectedRowModel().rows.length} de{" "}
                      {table.getFilteredRowModel().rows.length} selecionados
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(v) => table.setPageSize(Number(v))}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[10, 20, 30].map((s) => (
                            <SelectItem key={s} value={`${s}`}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div>
                        Página {table.getState().pagination.pageIndex + 1} de{" "}
                        {table.getPageCount()}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* SHEET PERFIL (TODAS AS ABAS) */}
                <Sheet
                  open={!!selectedStudent}
                  onOpenChange={(open) => !open && setSelectedStudent(null)}
                >
                  <SheetContent className="w-full sm:max-w-3xl overflow-y-auto p-6">
                    {selectedStudent && (
                      <>
                        <SheetHeader className="mb-6">
                          <SheetTitle className="text-2xl">
                            {isEditing
                              ? "Editar Estudante"
                              : selectedStudent.name}
                          </SheetTitle>
                        </SheetHeader>

                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="size-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                              {selectedStudent.photo ? (
                                <img
                                  src={selectedStudent.photo}
                                  alt=""
                                  className="size-full object-cover"
                                />
                              ) : (
                                <User className="size-10 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">
                                {selectedStudent.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {selectedStudent.studentNumber}
                              </p>
                            </div>
                          </div>

                          <Tabs defaultValue="geral">
                            <TabsList className="grid w-full grid-cols-5">
                              <TabsTrigger value="geral">Geral</TabsTrigger>
                              <TabsTrigger value="academico">
                                Acadêmico
                              </TabsTrigger>
                              <TabsTrigger value="financeiro">
                                Financeiro
                              </TabsTrigger>
                              <TabsTrigger value="documentos">
                                Documentos
                              </TabsTrigger>
                              <TabsTrigger value="historico">
                                Histórico
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent
                              value="geral"
                              className="space-y-4 mt-6"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm">Nome</Label>
                                  <Input
                                    defaultValue={selectedStudent.name}
                                    readOnly={!isEditing}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm">Nº</Label>
                                  <Input
                                    value={selectedStudent.studentNumber}
                                    readOnly
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm">Telefone</Label>
                                  <Input
                                    defaultValue={selectedStudent.phone}
                                    readOnly={!isEditing}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm">Email</Label>
                                  <Input
                                    defaultValue={selectedStudent.email}
                                    readOnly={!isEditing}
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent
                              value="academico"
                              className="space-y-4 mt-6"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm">Curso</Label>
                                  <Input
                                    value={selectedStudent.course}
                                    readOnly
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm">Turma</Label>
                                  <Badge variant="outline" className="mt-1">
                                    {selectedStudent.class}
                                  </Badge>
                                </div>
                                <div>
                                  <Label className="text-sm">Ano</Label>
                                  <Input
                                    value={selectedStudent.year}
                                    readOnly
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm">Matrícula</Label>
                                  <Input
                                    value={formatDate(
                                      selectedStudent.enrollmentDate
                                    )}
                                    readOnly
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="financeiro" className="mt-6">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead>Vencimento</TableHead>
                                    <TableHead>Estado</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {mockPayments.map((p) => (
                                    <TableRow key={p.id}>
                                      <TableCell>{p.description}</TableCell>
                                      <TableCell>
                                        {p.amount.toLocaleString()} AOA
                                      </TableCell>
                                      <TableCell>
                                        {formatDate(p.dueDate)}
                                      </TableCell>
                                      <TableCell>
                                        <Badge
                                          variant={
                                            p.status === "pago"
                                              ? "default"
                                              : "secondary"
                                          }
                                        >
                                          {p.status}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TabsContent>

                            <TabsContent
                              value="documentos"
                              className="space-y-4 mt-6"
                            >
                              <Button
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2" /> Carregar
                                Documento
                              </Button>
                              <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                  e.target.files?.[0] &&
                                  alert(
                                    `"${e.target.files[0].name}" carregado!`
                                  )
                                }
                              />
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Data</TableHead>
                                    <TableHead></TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {mockDocuments.map((d) => (
                                    <TableRow key={d.id}>
                                      <TableCell>{d.name}</TableCell>
                                      <TableCell>{d.type}</TableCell>
                                      <TableCell>
                                        {formatDate(d.uploadedAt)}
                                      </TableCell>
                                      <TableCell>
                                        <Button size="sm" variant="ghost">
                                          <Download className="h-4 w-4" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TabsContent>

                            <TabsContent
                              value="historico"
                              className="space-y-4 mt-6"
                            >
                              <div>
                                <h4 className="font-medium mb-2">Notas</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Disciplina</TableHead>
                                      <TableHead>Nota</TableHead>
                                      <TableHead>Data</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {mockGrades.map((g, i) => (
                                      <TableRow key={i}>
                                        <TableCell>{g.subject}</TableCell>
                                        <TableCell>{g.grade}/20</TableCell>
                                        <TableCell>
                                          {formatDate(g.date)}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Eventos</h4>
                                {mockHistory.map((h) => (
                                  <div
                                    key={h.id}
                                    className="flex items-center gap-2 text-sm py-1"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span>{h.description}</span>
                                    <span className="ml-auto text-muted-foreground">
                                      {formatDate(h.date)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>

                        <SheetFooter className="mt-8 flex gap-2 flex-wrap">
                          <Button onClick={handleReset}>
                            <Key className="h-4 w-4 mr-2" /> Resetar Senha
                          </Button>
                          <Button onClick={handleNotify}>
                            <Mail className="h-4 w-4 mr-2" /> Notificar
                          </Button>
                          <Button onClick={generatePDF}>
                            <FileText className="h-4 w-4 mr-2" /> Declaração
                          </Button>
                          {isEditing ? (
                            <Button onClick={() => setIsEditing(false)}>
                              Guardar
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => setIsEditing(true)}
                            >
                              Editar
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            onClick={() => setSelectedStudent(null)}
                          >
                            Fechar
                          </Button>
                        </SheetFooter>
                      </>
                    )}
                  </SheetContent>
                </Sheet>

                {/* DIÁLOGO RESET */}
                <AlertDialog
                  open={showResetDialog}
                  onOpenChange={setShowResetDialog}
                >
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Resetar Senha</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      {resetSuccess ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="h-5 w-5" />
                          Senha resetada com sucesso! O aluno foi notificado.
                        </div>
                      ) : (
                        `Tem certeza que deseja resetar a senha de ${selectedStudent?.name}?`
                      )}
                    </AlertDialogDescription>
                    {!resetSuccess && (
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmReset}>
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    )}
                  </AlertDialogContent>
                </AlertDialog>

                {/* DIÁLOGO NOTIFICAR */}
                <Dialog
                  open={showNotifyDialog}
                  onOpenChange={setShowNotifyDialog}
                >
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        Notificar {selectedStudent?.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label>Título</Label>
                        <Input
                          placeholder="Ex: Aviso de pagamento"
                          value={notifyTitle}
                          onChange={(e) => setNotifyTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Mensagem</Label>
                        <textarea
                          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          placeholder="Escreva a mensagem..."
                          value={notifyMessage}
                          onChange={(e) => setNotifyMessage(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowNotifyDialog(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={sendNotification}
                        disabled={!notifyTitle || !notifyMessage}
                      >
                        Enviar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
