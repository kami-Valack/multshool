"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import NavbarH from "@/components/ui/heroui/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Download,
  FileText,
  TrendingUp,
  Users,
  Star,
  Calendar,
} from "lucide-react"
import { useState } from "react"

// -------------------------------------------------
// Dados fictícios (substitua por API depois)
// -------------------------------------------------
const avaliacoes = [
  { id: 1, docente: "Ana Silva", criterio: "Pontualidade", nota: 4.8, semestre: "2025/1", data: "2025-10-20" },
  { id: 2, docente: "João Mendes", criterio: "Desempenho", nota: 4.2, semestre: "2025/1", data: "2025-10-18" },
  { id: 3, docente: "Maria Costa", criterio: "Pontualidade", nota: 4.9, semestre: "2025/1", data: "2025-10-15" },
  { id: 4, docente: "Pedro Santos", criterio: "Desempenho", nota: 3.9, semestre: "2025/1", data: "2025-10-12" },
]

const relatorioDocente = [
  { mes: "Jan", aulas: 28, notasLancadas: 100, aprovacao: 88 },
  { mes: "Fev", aulas: 24, notasLancadas: 95, aprovacao: 92 },
  { mes: "Mar", aulas: 30, notasLancadas: 98, aprovacao: 85 },
  { mes: "Abr", aulas: 22, notasLancadas: 100, aprovacao: 90 },
]

const ranking = [
  { pos: 1, docente: "Ana Silva", media: 4.8, badge: "gold" },
  { pos: 2, docente: "Maria Costa", media: 4.6, badge: "silver" },
  { pos: 3, docente: "Pedro Santos", media: 4.5, badge: "bronze" },
]

const pieData = [
  { name: "Aprovados", value: 78, color: "#22c55e" },
  { name: "Reprovados", value: 22, color: "#ef4444" },
]

// -------------------------------------------------
// Componente principal
// -------------------------------------------------
export default function AvaliacaoRelatorios() {
  const [tab, setTab] = useState("avaliacoes")
  const [openModal, setOpenModal] = useState(false)

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
          <NavbarH />
          <main className="flex-1 p-6 bg-muted/40">
            <div className="mx-auto max-w-7xl space-y-6">

              {/* ---------- Header ---------- */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Avaliação e Relatórios
                  </h1>
                  <p className="text-muted-foreground">
                    Acompanhe desempenho docente e gere relatórios institucionais
                  </p>
                </div>
                <Button onClick={() => setOpenModal(true)} className="gap-2">
                  <FileText className="w-4 h-4" />
                  Gerar Relatório
                </Button>
              </div>

              {/* ---------- Cards de métricas rápidas ---------- */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.6 / 5</div>
                    <p className="text-xs text-muted-foreground">+0.2 vs semestre anterior</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Aulas Lecionadas</CardTitle>
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.248</div>
                    <p className="text-xs text-muted-foreground">98% do calendário</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Notas Lançadas</CardTitle>
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">97%</div>
                    <p className="text-xs text-muted-foreground">Dentro do prazo</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Aprovação</CardTitle>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <p className="text-xs text-muted-foreground">+5% vs 2024</p>
                  </CardContent>
                </Card>
              </div>

              {/* ---------- Tabs ---------- */}
              <Tabs value={tab} onValueChange={setTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3 lg:w-auto">
                  <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                  <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>

                {/* ---- TAB Avaliações ---- */}
                <TabsContent value="avaliacoes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Avaliações Recebidas</CardTitle>
                      <CardDescription>
                        Avaliações anónimas dos estudantes + internas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Docente</TableHead>
                              <TableHead>Critério</TableHead>
                              <TableHead>Nota</TableHead>
                              <TableHead>Semestre</TableHead>
                              <TableHead>Data</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {avaliacoes.length > 0 ? (
                              avaliacoes.map((av) => (
                                <TableRow key={av.id}>
                                  <TableCell className="font-medium">{av.docente}</TableCell>
                                  <TableCell>{av.criterio}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < Math.floor(av.nota)
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                      <span className="ml-1 text-sm font-medium">
                                        {av.nota}/5
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell>{av.semestre}</TableCell>
                                  <TableCell>
                                    {new Date(av.data).toLocaleDateString("pt-PT")}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                  Nenhuma avaliação encontrada.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ---- TAB Relatórios ---- */}
                <TabsContent value="relatorios" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Evolução Mensal */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Evolução Mensal</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={relatorioDocente}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="aulas" stroke="#3b82f6" name="Aulas" />
                            <Line type="monotone" dataKey="aprovacao" stroke="#22c55e" name="Aprovação %" />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Taxa de Aprovação */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Taxa de Aprovação</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {pieData.map((entry, i) => (
                                <Cell key={`cell-${i}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Ranking */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ranking de Docentes 2025/1</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {ranking.map((r) => (
                          <div key={r.pos} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                {r.pos}º
                              </div>
                              <div>
                                <p className="font-medium">{r.docente}</p>
                                <p className="text-sm text-muted-foreground">
                                  Média {r.media}/5
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant={r.badge === "gold" ? "default" : "secondary"}
                            >
                              {r.badge === "gold"
                                ? "Primeiro"
                                : r.badge === "silver"
                                ? "Segundo"
                                : "Terceiro"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ---- TAB Feedback ---- */}
                <TabsContent value="feedback">
                  <Card>
                    <CardHeader>
                      <CardTitle>Feedback Consolidado</CardTitle>
                      <CardDescription>
                        Perceção geral dos estudantes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Ponto Forte</Label>
                          <Textarea
                            placeholder="Ex: Clareza nas explicações..."
                            className="mt-2"
                            defaultValue="Clareza nas explicações e disponibilidade para dúvidas."
                          />
                        </div>
                        <div>
                          <Label>Ponto a Melhorar</Label>
                          <Textarea
                            placeholder="Ex: Mais exercícios práticos..."
                            className="mt-2"
                            defaultValue="Mais exercícios práticos em aula."
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>
                          <Download className="w-4 h-4 mr-2" />
                          Exportar Feedback Completo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>

        {/* ---------- Modal Gerar Relatório ---------- */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Gerar Relatório</DialogTitle>
              <DialogDescription>
                Escolha filtros e formato de exportação
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <Select defaultValue="docente">
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="docente">Docente Individual</SelectItem>
                    <SelectItem value="turma">Turma</SelectItem>
                    <SelectItem value="departamento">Departamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="periodo" className="text-right">
                  Período
                </Label>
                <Select defaultValue="semestral">
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="semestral">Semestral</SelectItem>
                    <SelectItem value="anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="formato" className="text-right">
                  Formato
                </Label>
                <Select defaultValue="pdf">
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}