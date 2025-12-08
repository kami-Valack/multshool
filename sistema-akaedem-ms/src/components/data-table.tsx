"use client"

import * as React from "react"
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns,
  GripVertical,
  MoreVertical,
  Plus,
  Search,
  User,
  XCircle,
} from "lucide-react"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ==================== TABELA ORIGINAL (para Estudantes/Candidaturas/Matrículas) ====================

export const schema = z.object({
  id: z.union([z.number(), z.string()]),
  photo: z.string(),
  name: z.string(),
  enrollmentNumber: z.string(),
  course: z.string(),
  class: z.string(),
  enrollmentDate: z.string(),
  status: z.string(),
  phone: z.string(),
  email: z.string(),
  enrollment: z.any().optional(), // Objeto completo de enrollment para uso interno
}).passthrough() // Permite propriedades extras

type DataItem = z.infer<typeof schema>

interface DynamicTableProps {
  title: string
  description: string
  addButtonText: string
  searchPlaceholder?: string
  data: DataItem[]
  onAddNew?: () => void
  onEdit?: (item: DataItem) => void
  onSave?: (item: DataItem, data: any) => Promise<void>
  onApprove?: (item: DataItem) => Promise<void> | void
  onReject?: (item: DataItem) => Promise<void> | void
  fieldLabels?: {
    name?: string
    enrollmentNumber?: string
    course?: string
    class?: string
    enrollmentDate?: string
    status?: string
    phone?: string
    email?: string
  }
}

const mockData: DataItem[] = [
  {
    id: 1,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    name: "Maria Silva Santos",
    enrollmentNumber: "2024001",
    course: "Engenharia Informática",
    class: "EI-3A",
    enrollmentDate: "2024-11-01",
    status: "Ativa",
    phone: "+244 923 456 789",
    email: "maria.santos@email.com",
  },
  {
    id: 2,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    name: "João Pedro Mendes",
    enrollmentNumber: "2024002",
    course: "Gestão de Empresas",
    class: "GE-2B",
    enrollmentDate: "2024-11-02",
    status: "Pendente",
    phone: "+244 924 567 890",
    email: "joao.mendes@email.com",
  },
  {
    id: 3,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    name: "Ana Carolina Ferreira",
    enrollmentNumber: "2024003",
    course: "Medicina",
    class: "MED-1A",
    enrollmentDate: "2024-11-03",
    status: "Ativa",
    phone: "+244 925 678 901",
    email: "ana.ferreira@email.com",
  },
  {
    id: 4,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    name: "Carlos Alberto Costa",
    enrollmentNumber: "2024004",
    course: "Direito",
    class: "DIR-4C",
    enrollmentDate: "2024-11-03",
    status: "Ativa",
    phone: "+244 926 789 012",
    email: "carlos.costa@email.com",
  },
  {
    id: 5,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia",
    name: "Patrícia Lopes Oliveira",
    enrollmentNumber: "2024005",
    course: "Arquitectura",
    class: "ARQ-2A",
    enrollmentDate: "2024-11-04",
    status: "Pendente",
    phone: "+244 927 890 123",
    email: "patricia.oliveira@email.com",
  },
]

function DragHandle({ id }: { id: string | number }) {
  const { attributes, listeners } = useSortable({ id })
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVertical className="size-3 text-muted-foreground" />
      <span className="sr-only">Arrastar para reordenar</span>
    </Button>
  )
}

function StudentViewerSheet({
  item,
  open,
  onOpenChange,
  initialEditMode = false,
  fieldLabels = {},
  onSave
}: {
  item: DataItem
  open?: boolean
  onOpenChange?: (open: boolean) => void
  initialEditMode?: boolean
  fieldLabels?: DynamicTableProps['fieldLabels']
  onSave?: (item: DataItem, data: any) => Promise<void>
}) {
  const [isEditing, setIsEditing] = React.useState(initialEditMode)
  const [formData, setFormData] = React.useState({
    class: item.class || '',
    student_phone: item.phone || '',
    student_name: item.name || '',
    student_email: item.email || '',
  })
  const [saving, setSaving] = React.useState(false)
  
  React.useEffect(() => {
    setIsEditing(initialEditMode)
    setFormData({
      class: item.class || '',
      student_phone: item.phone || '',
      student_name: item.name || '',
      student_email: item.email || '',
    })
  }, [initialEditMode, open, item])
  const labels = {
    name: fieldLabels?.name || "Nome Completo",
    enrollmentNumber: fieldLabels?.enrollmentNumber || "Número de Candidatura",
    course: fieldLabels?.course || "Curso",
    class: fieldLabels?.class || "Turma",
    enrollmentDate: fieldLabels?.enrollmentDate || "Data de Candidatura",
    status: fieldLabels?.status || "Estado",
    phone: fieldLabels?.phone || "Telefone",
    email: fieldLabels?.email || "Email",
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="gap-3 pb-4">
          <div>
            <SheetTitle>{isEditing ? "Editar Registro" : "Detalhes do Registro"}</SheetTitle>
            <SheetDescription className="mt-1.5">
              {isEditing ? "Editar informações" : "Informações completas"}
            </SheetDescription>
          </div>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto py-2">
          <div className="flex items-center gap-4">
            <div className="relative size-20 overflow-hidden rounded-full bg-muted">
              {item.photo ? (
                <img src={item.photo} alt={item.name} className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <User className="size-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.enrollmentNumber}</p>
            </div>
          </div>
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="name">{labels.name}</Label>
                <Input 
                  id="name" 
                  value={formData.student_name}
                  onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="enrollment">{labels.enrollmentNumber}</Label>
                <Input id="enrollment" value={item.enrollmentNumber} readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="course">{labels.course}</Label>
                  <Input id="course" value={item.course} readOnly />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="class">{labels.class}</Label>
                  <Input 
                    id="class" 
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    placeholder="Ex: EI-3A"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="phone">{labels.phone}</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={formData.student_phone}
                  onChange={(e) => setFormData({ ...formData, student_phone: e.target.value })}
                  placeholder="+244 923 456 789"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="email">{labels.email}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.student_email}
                  onChange={(e) => setFormData({ ...formData, student_email: e.target.value })}
                  placeholder="estudante@email.com"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">{labels.name}</Label>
                <p className="text-sm">{item.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">{labels.enrollmentNumber}</Label>
                <p className="font-mono text-sm">{item.enrollmentNumber}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">{labels.course}</Label>
                  <p className="text-sm">{item.course}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">{labels.class}</Label>
                  <Badge variant="outline" className="w-fit px-2 font-mono">{item.class}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">{labels.enrollmentDate}</Label>
                  <p className="text-sm">
                    {new Date(item.enrollmentDate).toLocaleDateString('pt-PT', {
                      day: '2-digit', month: 'long', year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">{labels.status}</Label>
                  <Badge variant={item.status === "Ativa" ? "default" : "secondary"} className="flex w-fit gap-1 px-2">
                    {item.status === "Ativa" && <CheckCircle className="size-3" />}
                    {item.status}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">{labels.phone}</Label>
                <p className="text-sm">{item.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">{labels.email}</Label>
                <p className="text-sm">{item.email}</p>
              </div>
            </div>
          )}
        </div>
        <SheetFooter className="mt-auto flex gap-2 pt-4 sm:flex-col sm:space-x-0">
          {isEditing ? (
            <>
              <Button 
                className="w-full" 
                onClick={async () => {
                  if (onSave) {
                    setSaving(true);
                    try {
                      await onSave(item, formData);
                      setIsEditing(false);
                    } catch (error) {
                      // Erro já é tratado na função onSave
                    } finally {
                      setSaving(false);
                    }
                  } else {
                    setIsEditing(false);
                  }
                }}
                disabled={saving}
              >
                {saving ? 'A guardar...' : 'Guardar Alterações'}
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    class: item.class || '',
                    student_phone: item.phone || '',
                    student_name: item.name || '',
                    student_email: item.email || '',
                  });
                }}
                disabled={saving}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
              <SheetClose asChild>
                <Button className="w-full">Fechar</Button>
              </SheetClose>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function StudentViewer({ item, fieldLabels }: { item: DataItem, fieldLabels?: DynamicTableProps['fieldLabels'] }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button
        variant="ghost"
        className="flex w-fit items-center gap-3 px-2"
        onClick={() => setOpen(true)}
      >
        <div className="relative size-10 overflow-hidden rounded-full bg-muted">
          {item.photo ? (
            <img src={item.photo} alt={item.name} className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center">
              <User className="size-5 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="text-left">
          <div className="font-medium">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.enrollmentNumber}</div>
        </div>
      </Button>
      <StudentViewerSheet
        item={item}
        fieldLabels={fieldLabels}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

function DraggableRow({ row, fieldLabels }: { row: Row<DataItem>, fieldLabels?: DynamicTableProps['fieldLabels'] }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({ id: row.original.id })
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

function NewRecordSheet({
  buttonText,
  fieldLabels = {},
  onSave
}: {
  buttonText: string
  fieldLabels?: DynamicTableProps['fieldLabels']
  onSave?: (data: Partial<DataItem>) => void
}) {
  const [open, setOpen] = React.useState(false)
  const labels = {
    name: fieldLabels?.name || "Nome Completo",
    enrollmentNumber: fieldLabels?.enrollmentNumber || "Número",
    course: fieldLabels?.course || "Curso",
    class: fieldLabels?.class || "Turma",
    enrollmentDate: fieldLabels?.enrollmentDate || "Data",
    status: fieldLabels?.status || "Estado",
    phone: fieldLabels?.phone || "Telefone",
    email: fieldLabels?.email || "Email",
  }
  const handleSave = () => {
    setOpen(false)
    onSave?.({})
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus />
          {buttonText}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="gap-3 pb-4">
          <div>
            <SheetTitle>{buttonText}</SheetTitle>
            <SheetDescription className="mt-1.5">Preencha os dados para criar um novo registro</SheetDescription>
          </div>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto py-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-name">{labels.name}</Label>
              <Input id="new-name" placeholder="Digite o nome completo" />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-enrollment">{labels.enrollmentNumber}</Label>
              <Input id="new-enrollment" placeholder="Digite o número" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="new-course">{labels.course}</Label>
                <Select>
                  <SelectTrigger id="new-course">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engenharia Informática">Engenharia Informática</SelectItem>
                    <SelectItem value="Gestão de Empresas">Gestão de Empresas</SelectItem>
                    <SelectItem value="Medicina">Medicina</SelectItem>
                    <SelectItem value="Direito">Direito</SelectItem>
                    <SelectItem value="Arquitectura">Arquitectura</SelectItem>
                    <SelectItem value="Engenharia Civil">Engenharia Civil</SelectItem>
                    <SelectItem value="Psicologia">Psicologia</SelectItem>
                    <SelectItem value="Economia">Economia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="new-class">{labels.class}</Label>
                <Input id="new-class" placeholder="Ex: EI-3A" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="new-date">{labels.enrollmentDate}</Label>
                <Input id="new-date" type="date" />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="new-status">{labels.status}</Label>
                <Select defaultValue="Pendente">
                  <SelectTrigger id="new-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativa">Ativa</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Suspensa">Suspensa</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-phone">{labels.phone}</Label>
              <Input id="new-phone" type="tel" placeholder="+244 923 456 789" />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-email">{labels.email}</Label>
              <Input id="new-email" type="email" placeholder="email@exemplo.com" />
            </div>
          </div>
        </div>
        <SheetFooter className="mt-auto flex gap-2 pt-4 sm:flex-col sm:space-x-0">
          <Button className="w-full" onClick={handleSave}>Criar Registro</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default function DynamicTable({
  title,
  description,
  addButtonText,
  searchPlaceholder = "Buscar por nome...",
  data: initialData,
  onAddNew,
  onSave,
  onApprove,
  onReject,
  fieldLabels = {},
}: DynamicTableProps) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )
  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data])
  const columns: ColumnDef<DataItem>[] = React.useMemo(() => [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todos"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "student",
      header: fieldLabels?.name || "Estudante",
      cell: ({ row }) => <StudentViewer item={row.original} fieldLabels={fieldLabels} key={`view-${row.original.id}`} />,
      enableHiding: false,
    },
    {
      accessorKey: "enrollmentNumber",
      header: fieldLabels?.enrollmentNumber || "Nº Candidatura",
      cell: ({ row }) => <div className="font-mono text-sm">{row.original.enrollmentNumber}</div>,
    },
    {
      accessorKey: "course",
      header: fieldLabels?.course || "Curso",
      cell: ({ row }) => <div className="max-w-[200px] truncate">{row.original.course}</div>,
    },
    {
      accessorKey: "class",
      header: fieldLabels?.class || "Turma",
      cell: ({ row }) => <Badge variant="outline" className="px-2 font-mono">{row.original.class}</Badge>,
    },
    {
      accessorKey: "enrollmentDate",
      header: fieldLabels?.enrollmentDate || "Data",
      cell: ({ row }) => {
        const date = new Date(row.original.enrollmentDate)
        return (
          <div className="text-sm">
            {date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: fieldLabels?.status || "Estado",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "Ativa" ? "default" : "secondary"} className="flex w-fit gap-1 px-2">
          {row.original.status === "Ativa" && <CheckCircle className="size-3" />}
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const [sheetOpen, setSheetOpen] = React.useState(false)
        const [editMode, setEditMode] = React.useState(false)
        const item = row.original
        const isPending = item.status === 'Pendente'
        const hasApproveAction = onApprove && isPending
        const hasRejectAction = onReject && isPending
        
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                  <MoreVertical />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => { setEditMode(false); setSheetOpen(true) }}>
                  Ver detalhes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setEditMode(true); setSheetOpen(true) }}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem>Imprimir ficha</DropdownMenuItem>
                {(hasApproveAction || hasRejectAction) && <DropdownMenuSeparator />}
                {hasApproveAction && (
                  <DropdownMenuItem 
                    onClick={async () => {
                      if (onApprove) {
                        await onApprove(item)
                      }
                    }}
                    className="text-green-600 focus:text-green-600"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Aprovar
                  </DropdownMenuItem>
                )}
                {hasRejectAction && (
                  <DropdownMenuItem 
                    onClick={async () => {
                      if (onReject) {
                        await onReject(item)
                      }
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Rejeitar
                  </DropdownMenuItem>
                )}
                {!isPending && <DropdownMenuSeparator />}
                {!isPending && (
                  <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <StudentViewerSheet
              item={row.original}
              open={sheetOpen}
              onOpenChange={setSheetOpen}
              initialEditMode={editMode}
              fieldLabels={fieldLabels}
              onSave={onSave}
              key={`sheet-${row.original.id}-${sheetOpen}`}
            />
          </>
        )
      },
    },
  ], [fieldLabels, onSave, onApprove, onReject])
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, pagination },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }
  return (
    <div className="flex h-screen w-full flex-col gap-6 bg-background p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold mt-12">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn("student")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("student")?.setFilterValue(event.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns />
                Colunas
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide()).map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <NewRecordSheet
            buttonText={addButtonText}
            fieldLabels={fieldLabels}
            onSave={onAddNew}
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} fieldLabels={fieldLabels} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Linhas por página
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="w-20" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden size-8 sm:flex"
              size="icon"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Primeira página</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Página anterior</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Próxima página</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 sm:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Última página</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Exemplo de uso do componente original
export function ExampleUsage() {
  return (
    <>
      {/* Exemplo 1: Candidaturas */}
      <DynamicTable
        title="Candidaturas Recentes"
        description="Gerencie e visualize as inscrições mais recentes"
        addButtonText="Nova Candidatura"
        searchPlaceholder="Buscar por nome ou candidatura..."
        data={mockData}
        fieldLabels={{
          name: "Nome Completo",
          enrollmentNumber: "Nº Candidatura",
          course: "Curso",
          class: "Turma",
          enrollmentDate: "Data de Candidatura",
          status: "Estado",
          phone: "Telefone",
          email: "Email"
        }}
        onAddNew={() => console.log("Nova candidatura")}
      />
      {/* Outros exemplos comentados como no original */}
    </>
  )
}

// ==================== TABELA VARIANTE (para Docentes) ====================

export const docentesSchema = z.object({
  id: z.number(),
  photo: z.string(),
  name: z.string(),
  employeeNumber: z.string(),
  department: z.string(),
  role: z.string(),
  hireDate: z.string(),
  status: z.string(),
  phone: z.string(),
  email: z.string(),
})

type DocenteItem = z.infer<typeof docentesSchema>

interface DynamicDocentesTableProps {
  title: string
  description: string
  addButtonText: string
  searchPlaceholder?: string
  data: DocenteItem[]
  onAddNew?: () => void
  fieldLabels?: {
    name?: string
    employeeNumber?: string
    department?: string
    role?: string
    hireDate?: string
    status?: string
    phone?: string
    email?: string
  }
}

const mockDocentesData: DocenteItem[] = [
  {
    id: 1,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariaDocente",
    name: "Maria Silva Santos",
    employeeNumber: "DOC-001",
    department: "Engenharia Informática",
    role: "Professor Assistente",
    hireDate: "2024-09-01",
    status: "Ativo",
    phone: "+244 923 456 789",
    email: "maria.santos@universidade.edu.ao",
  },
  {
    id: 2,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=JoaoDocente",
    name: "João Pedro Mendes",
    employeeNumber: "DOC-002",
    department: "Gestão de Empresas",
    role: "Professor Coordenador",
    hireDate: "2023-08-15",
    status: "Ativo",
    phone: "+244 924 567 890",
    email: "joao.mendes@universidade.edu.ao",
  },
  {
    id: 3,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnaDocente",
    name: "Ana Carolina Ferreira",
    employeeNumber: "DOC-003",
    department: "Medicina",
    role: "Professora Auxiliar",
    hireDate: "2024-10-01",
    status: "Pendente",
    phone: "+244 925 678 901",
    email: "ana.ferreira@universidade.edu.ao",
  },
  {
    id: 4,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosDocente",
    name: "Carlos Alberto Costa",
    employeeNumber: "DOC-004",
    department: "Direito",
    role: "Professor Titular",
    hireDate: "2022-07-20",
    status: "Ativo",
    phone: "+244 926 789 012",
    email: "carlos.costa@universidade.edu.ao",
  },
  {
    id: 5,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=PatriciaDocente",
    name: "Patrícia Lopes Oliveira",
    employeeNumber: "DOC-005",
    department: "Arquitectura",
    role: "Professora Convidada",
    hireDate: "2024-11-01",
    status: "Ativo",
    phone: "+244 927 890 123",
    email: "patricia.oliveira@universidade.edu.ao",
  },
]

function DocenteViewerSheet({
  item,
  open,
  onOpenChange,
  initialEditMode = false,
  fieldLabels = {}
}: {
  item: DocenteItem
  open?: boolean
  onOpenChange?: (open: boolean) => void
  initialEditMode?: boolean
  fieldLabels?: DynamicDocentesTableProps['fieldLabels']
}) {
  const [isEditing, setIsEditing] = React.useState(initialEditMode)
  React.useEffect(() => {
    setIsEditing(initialEditMode)
  }, [initialEditMode, open])
  const labels = {
    name: fieldLabels?.name || "Nome Completo",
    employeeNumber: fieldLabels?.employeeNumber || "Número de Funcionário",
    department: fieldLabels?.department || "Departamento",
    role: fieldLabels?.role || "Cargo",
    hireDate: fieldLabels?.hireDate || "Data de Admissão",
    status: fieldLabels?.status || "Estado",
    phone: fieldLabels?.phone || "Telefone",
    email: fieldLabels?.email || "Email",
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="gap-3 pb-4">
          <div>
            <SheetTitle>{isEditing ? "Editar Docente" : "Detalhes do Docente"}</SheetTitle>
            <SheetDescription className="mt-1.5">
              {isEditing ? "Editar informações do docente" : "Informações completas do docente"}
            </SheetDescription>
          </div>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto py-2">
          <div className="flex items-center gap-4">
            <div className="relative size-20 overflow-hidden rounded-full bg-muted">
              {item.photo ? (
                <img src={item.photo} alt={item.name} className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <User className="size-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.employeeNumber}</p>
            </div>
          </div>
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="name">{labels.name}</Label>
                <Input id="name" defaultValue={item.name} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="employee">{labels.employeeNumber}</Label>
                <Input id="employee" defaultValue={item.employeeNumber} readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="department">{labels.department}</Label>
                  <Select defaultValue={item.department}>
                    <SelectTrigger id="department">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engenharia Informática">Engenharia Informática</SelectItem>
                      <SelectItem value="Gestão de Empresas">Gestão de Empresas</SelectItem>
                      <SelectItem value="Medicina">Medicina</SelectItem>
                      <SelectItem value="Direito">Direito</SelectItem>
                      <SelectItem value="Arquitectura">Arquitectura</SelectItem>
                      <SelectItem value="Engenharia Civil">Engenharia Civil</SelectItem>
                      <SelectItem value="Psicologia">Psicologia</SelectItem>
                      <SelectItem value="Economia">Economia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="role">{labels.role}</Label>
                  <Input id="role" defaultValue={item.role} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date">{labels.hireDate}</Label>
                  <Input id="date" type="date" defaultValue={item.hireDate} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="status">{labels.status}</Label>
                  <Select defaultValue={item.status}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                      <SelectItem value="Aposentado">Aposentado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="phone">{labels.phone}</Label>
                <Input id="phone" type="tel" defaultValue={item.phone} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="email">{labels.email}</Label>
                <Input id="email" type="email" defaultValue={item.email} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">{labels.name}</Label>
                <p className="text-sm">{item.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">{labels.employeeNumber}</Label>
                <p className="font-mono text-sm">{item.employeeNumber}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">{labels.department}</Label>
                  <p className="text-sm">{item.department}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">{labels.role}</Label>
                  <Badge variant="outline" className="w-fit px-2 font-mono">{item.role}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">{labels.hireDate}</Label>
                  <p className="text-sm">
                    {new Date(item.hireDate).toLocaleDateString('pt-PT', {
                      day: '2-digit', month: 'long', year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">{labels.status}</Label>
                  <Badge variant={item.status === "Ativo" ? "default" : "secondary"} className="flex w-fit gap-1 px-2">
                    {item.status === "Ativo" && <CheckCircle className="size-3" />}
                    {item.status}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">{labels.phone}</Label>
                <p className="text-sm">{item.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">{labels.email}</Label>
                <p className="text-sm">{item.email}</p>
              </div>
            </div>
          )}
        </div>
        <SheetFooter className="mt-auto flex gap-2 pt-4 sm:flex-col sm:space-x-0">
          {isEditing ? (
            <>
              <Button className="w-full" onClick={() => setIsEditing(false)}>Guardar Alterações</Button>
              <Button variant="outline" className="w-full" onClick={() => setIsEditing(false)}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
              <SheetClose asChild>
                <Button className="w-full">Fechar</Button>
              </SheetClose>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function DocenteViewer({ item, fieldLabels }: { item: DocenteItem, fieldLabels?: DynamicDocentesTableProps['fieldLabels'] }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button
        variant="ghost"
        className="flex w-fit items-center gap-3 px-2"
        onClick={() => setOpen(true)}
      >
        <div className="relative size-10 overflow-hidden rounded-full bg-muted">
          {item.photo ? (
            <img src={item.photo} alt={item.name} className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center">
              <User className="size-5 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="text-left">
          <div className="font-medium">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.employeeNumber}</div>
        </div>
      </Button>
      <DocenteViewerSheet
        item={item}
        fieldLabels={fieldLabels}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

function DraggableDocenteRow({ row, fieldLabels }: { row: Row<DocenteItem>, fieldLabels?: DynamicDocentesTableProps['fieldLabels'] }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({ id: row.original.id })
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

function NewDocenteSheet({
  buttonText,
  fieldLabels = {},
  onSave
}: {
  buttonText: string
  fieldLabels?: DynamicDocentesTableProps['fieldLabels']
  onSave?: (data: Partial<DocenteItem>) => void
}) {
  const [open, setOpen] = React.useState(false)
  const labels = {
    name: fieldLabels?.name || "Nome Completo",
    employeeNumber: fieldLabels?.employeeNumber || "Número de Funcionário",
    department: fieldLabels?.department || "Departamento",
    role: fieldLabels?.role || "Cargo",
    hireDate: fieldLabels?.hireDate || "Data de Admissão",
    status: fieldLabels?.status || "Estado",
    phone: fieldLabels?.phone || "Telefone",
    email: fieldLabels?.email || "Email",
  }
  const handleSave = () => {
    setOpen(false)
    onSave?.({})
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus />
          {buttonText}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="gap-3 pb-4">
          <div>
            <SheetTitle>{buttonText}</SheetTitle>
            <SheetDescription className="mt-1.5">Preencha os dados para criar um novo docente</SheetDescription>
          </div>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto py-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-name">{labels.name}</Label>
              <Input id="new-name" placeholder="Digite o nome completo" />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-employee">{labels.employeeNumber}</Label>
              <Input id="new-employee" placeholder="Digite o número de funcionário" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="new-department">{labels.department}</Label>
                <Select>
                  <SelectTrigger id="new-department">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engenharia Informática">Engenharia Informática</SelectItem>
                    <SelectItem value="Gestão de Empresas">Gestão de Empresas</SelectItem>
                    <SelectItem value="Medicina">Medicina</SelectItem>
                    <SelectItem value="Direito">Direito</SelectItem>
                    <SelectItem value="Arquitectura">Arquitectura</SelectItem>
                    <SelectItem value="Engenharia Civil">Engenharia Civil</SelectItem>
                    <SelectItem value="Psicologia">Psicologia</SelectItem>
                    <SelectItem value="Economia">Economia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="new-role">{labels.role}</Label>
                <Input id="new-role" placeholder="Ex: Professor Assistente" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="new-date">{labels.hireDate}</Label>
                <Input id="new-date" type="date" />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="new-status">{labels.status}</Label>
                <Select defaultValue="Pendente">
                  <SelectTrigger id="new-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Aposentado">Aposentado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-phone">{labels.phone}</Label>
              <Input id="new-phone" type="tel" placeholder="+244 923 456 789" />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-email">{labels.email}</Label>
              <Input id="new-email" type="email" placeholder="email@universidade.edu.ao" />
            </div>
          </div>
        </div>
        <SheetFooter className="mt-auto flex gap-2 pt-4 sm:flex-col sm:space-x-0">
          <Button className="w-full" onClick={handleSave}>Criar Docente</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export function DynamicDocentesTable({
  title,
  description,
  addButtonText,
  searchPlaceholder = "Buscar por nome...",
  data: initialData,
  onAddNew,
  fieldLabels = {},
}: DynamicDocentesTableProps) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )
  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data])
  const columns: ColumnDef<DocenteItem>[] = React.useMemo(() => [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todos"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "docente",
      header: fieldLabels?.name || "Docente",
      cell: ({ row }) => <DocenteViewer item={row.original} fieldLabels={fieldLabels} key={`view-${row.original.id}`} />,
      enableHiding: false,
    },
    {
      accessorKey: "employeeNumber",
      header: fieldLabels?.employeeNumber || "Nº Funcionário",
      cell: ({ row }) => <div className="font-mono text-sm">{row.original.employeeNumber}</div>,
    },
    {
      accessorKey: "department",
      header: fieldLabels?.department || "Departamento",
      cell: ({ row }) => <div className="max-w-[200px] truncate">{row.original.department}</div>,
    },
    {
      accessorKey: "role",
      header: fieldLabels?.role || "Cargo",
      cell: ({ row }) => <Badge variant="outline" className="px-2 font-mono">{row.original.role}</Badge>,
    },
    {
      accessorKey: "hireDate",
      header: fieldLabels?.hireDate || "Data Admissão",
      cell: ({ row }) => {
        const date = new Date(row.original.hireDate)
        return (
          <div className="text-sm">
            {date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: fieldLabels?.status || "Estado",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "Ativo" ? "default" : "secondary"} className="flex w-fit gap-1 px-2">
          {row.original.status === "Ativo" && <CheckCircle className="size-3" />}
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const [sheetOpen, setSheetOpen] = React.useState(false)
        const [editMode, setEditMode] = React.useState(false)
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                  <MoreVertical />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => { setEditMode(false); setSheetOpen(true) }}>
                  Ver detalhes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setEditMode(true); setSheetOpen(true) }}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem>Imprimir ficha</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Desativar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DocenteViewerSheet
              item={row.original}
              open={sheetOpen}
              onOpenChange={setSheetOpen}
              initialEditMode={editMode}
              fieldLabels={fieldLabels}
              key={`sheet-${row.original.id}-${sheetOpen}`}
            />
          </>
        )
      },
    },
  ], [fieldLabels])
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, pagination },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }
  return (
    <div className="flex h-screen w-full flex-col gap-6 bg-background p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold mt-12">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn("docente")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("docente")?.setFilterValue(event.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns />
                Colunas
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide()).map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <NewDocenteSheet
            buttonText={addButtonText}
            fieldLabels={fieldLabels}
            onSave={onAddNew}
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                  {table.getRowModel().rows.map((row) => (
                    <DraggableDocenteRow key={row.id} row={row} fieldLabels={fieldLabels} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Nenhum docente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Linhas por página
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="w-20" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden size-8 sm:flex"
              size="icon"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Primeira página</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Página anterior</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Próxima página</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 sm:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Última página</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Exemplo de uso do componente para docentes
export function ExampleDocentesUsage() {
  return (
    <DynamicDocentesTable
      title="Gestão de Docentes"
      description="Gerencie e visualize o quadro docente da instituição"
      addButtonText="Novo Docente"
      searchPlaceholder="Buscar por nome ou departamento..."
      data={mockDocentesData}
      fieldLabels={{
        name: "Nome Completo",
        employeeNumber: "Nº Funcionário",
        department: "Departamento",
        role: "Cargo",
        hireDate: "Data de Admissão",
        status: "Estado",
        phone: "Telefone",
        email: "Email Institucional"
      }}
      onAddNew={() => console.log("Novo docente adicionado")}
    />
  )
}