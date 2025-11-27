// src/app/(academica)/relatorios-financeiros/page.tsx
"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Download,
  Mail,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
} from "lucide-react";
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
} from "recharts";
import { saveAs } from "file-saver";

// Dados simulados
const financialData = {
  propinas: { recebido: 1250000, atraso: 320000, taxa: 79.6 },
  outrosServicos: { exames: 45000, declaracoes: 23000, eventos: 18000 },
  bolsasDescontos: { impacto: 12.4 },
  transferenciasMultas: { recuperado: 56000 },
  kpis: {
    totalReceitas: 1378000,
    totalPendencias: 320000,
    pagamentosOnline: 68,
    despesasOperacionais: 890000,
  },
  mensal: [
    { mes: "Jan", receita: 110000, atraso: 45000 },
    { mes: "Fev", receita: 118000, atraso: 38000 },
    { mes: "Mar", receita: 125000, atraso: 32000 },
    { mes: "Abr", receita: 132000, atraso: 29000 },
    { mes: "Mai", receita: 140000, atraso: 25000 },
    { mes: "Jun", receita: 145000, atraso: 22000 },
  ],
  anualComparativo: [
    { ano: "2023/24", receita: 1200000, atraso: 400000 },
    { ano: "2024/25", receita: 1378000, atraso: 320000 },
  ],
  categoriaPie: [
    { name: "Propinas", value: 1250000, color: "#3b82f6" },
    { name: "Exames", value: 45000, color: "#10b981" },
    { name: "Declarações", value: 23000, color: "#f59e0b" },
    { name: "Eventos", value: 18000, color: "#ef4444" },
    { name: "Multas", value: 56000, color: "#8b5cf6" },
  ],
};

// Função simples de formatação de data (sem date-fns)
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export default function RelatoriosFinanceiros() {
  const [curso, setCurso] = useState<string>("todos");
  const [turma, setTurma] = useState<string>("todas");
  const [periodo, setPeriodo] = useState<string>("2024/25");

  const exportToCSV = () => {
    const prefix = `relatorio_${curso}_${turma}_${periodo.replace("/", "_")}`;
    const csv = [
      ["Filtros Aplicados"],
      [`Curso: ${curso === "todos" ? "Todos" : curso}`],
      [`Turma: ${turma === "todas" ? "Todas" : turma}`],
      [`Período: ${periodo}`],
      [""],
      ["Categoria", "Valor (AOA)"],
      ["Propinas Recebidas", financialData.propinas.recebido],
      ["Propinas em Atraso", financialData.propinas.atraso],
      ["Exames", financialData.outrosServicos.exames],
      ["Declarações", financialData.outrosServicos.declaracoes],
      ["Eventos", financialData.outrosServicos.eventos],
      ["Multas Recuperadas", financialData.transferenciasMultas.recuperado],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${prefix}_${formatDate(new Date())}.csv`);
  };

//   const exportToPDF = async () => {
//     const prefix = `relatorio_${curso}_${turma}_${periodo.replace("/", "_")}`;

//     try {
//       // Importação dinâmica correta
//       const { default: jsPDF } = await import("jspdf");
//       const { default: autoTable } = await import("jspdf-autotable");

//       // Criar nova instância
//       const doc = new jsPDF();

//       // Registrar o plugin ANTES de qualquer uso
//       (doc as any).autoTable = autoTable;

//       // Forçar inicialização interna do jsPDF (evita erro de getFontSize)
//       doc.setFont("helvetica");
//       doc.setFontSize(16);

//       // Cabeçalho
//       doc.text("Relatório Financeiro", 14, 20);
//       doc.setFontSize(10);
//       doc.text(
//         `Filtros: Curso: ${curso === "todos" ? "Todos" : curso}`,
//         14,
//         30
//       );
//       doc.text(`Turma: ${turma === "todas" ? "Todas" : turma}`, 14, 36);
//       doc.text(`Período: ${periodo}`, 14, 42);
//       doc.text(`Gerado em: ${new Date().toLocaleString("pt-AO")}`, 14, 48);

//       const tableData = [
//         [
//           "Propinas Recebidas",
//           `${financialData.propinas.recebido.toLocaleString()} AOA`,
//         ],
//         [
//           "Propinas em Atraso",
//           `${financialData.propinas.atraso.toLocaleString()} AOA`,
//         ],
//         ["Taxa de Pagamento", `${financialData.propinas.taxa}%`],
//         [
//           "Total Outros Serviços",
//           `${(
//             financialData.outrosServicos.exames +
//             financialData.outrosServicos.declaracoes +
//             financialData.outrosServicos.eventos
//           ).toLocaleString()} AOA`,
//         ],
//         [
//           "Multas Recuperadas",
//           `${financialData.transferenciasMultas.recuperado.toLocaleString()} AOA`,
//         ],
//         [
//           "Impacto Bolsas/Descontos",
//           `${financialData.bolsasDescontos.impacto}%`,
//         ],
//       ];

//       // Agora autoTable funciona
//       (doc as any).autoTable({
//         head: [["Indicador", "Valor"]],
//         body: tableData,
//         startY: 55,
//         theme: "grid",
//         styles: { fontSize: 10, cellPadding: 3 },
//         headStyles: {
//           fillColor: [59, 130, 246],
//           textColor: 255,
//           fontStyle: "bold",
//         },
//         alternateRowStyles: { fillColor: [245, 247, 250] },
//       });

//       doc.save(`${prefix}_${formatDate(new Date())}.pdf`);
//     } catch (error) {
//       console.error("Erro ao gerar PDF:", error);
//       alert("Falha ao gerar PDF. Verifique o console.");
//     }
//   };

  const enviarPorEmail = () => {
    alert("Relatório enviado por e-mail ao administrador! (simulado)");
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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <NavbarH />
            <div className="p-6 space-y-6">
              {/* Filtros Globais */}
              <div className="flex flex-wrap gap-4 items-end">
                <div className="space-y-1">
                  <Label>Curso</Label>
                  <Select value={curso} onValueChange={setCurso}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="engenharia">Engenharia</SelectItem>
                      <SelectItem value="direito">Direito</SelectItem>
                      <SelectItem value="medicina">Medicina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Turma</Label>
                  <Select value={turma} onValueChange={setTurma}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="1ano">1º Ano</SelectItem>
                      <SelectItem value="2ano">2º Ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Período Letivo</Label>
                  <Select value={periodo} onValueChange={setPeriodo}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023/24">2023/24</SelectItem>
                      <SelectItem value="2024/25">2024/25</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" size="sm" onClick={exportToCSV}>
                    <Download className="w-4 h-4 mr-1" /> CSV
                  </Button>
                  {/* <Button variant="outline" size="sm" onClick={exportToPDF}>
                    <Download className="w-4 h-4 mr-1" /> PDF
                  </Button> */}
                  <Button size="sm" onClick={enviarPorEmail}>
                    <Mail className="w-4 h-4 mr-1" /> Enviar
                  </Button>
                </div>
              </div>

              {/* KPIs no Topo */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Receitas
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {financialData.kpis.totalReceitas.toLocaleString()} AOA
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1 text-green-600" />{" "}
                      +14.8% vs ano anterior
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pendências
                    </CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {financialData.kpis.totalPendencias.toLocaleString()} AOA
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <TrendingDown className="w-3 h-3 mr-1 text-red-600" />{" "}
                      -20% vs último mês
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pagamentos Online
                    </CardTitle>
                    <Badge className="text-xs">Online</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {financialData.kpis.pagamentosOnline}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      vs {100 - financialData.kpis.pagamentosOnline}%
                      presenciais
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Despesas Operacionais
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {financialData.kpis.despesasOperacionais.toLocaleString()}{" "}
                      AOA
                    </div>
                    <p className="text-xs text-muted-foreground">
                      64.6% das receitas
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs de Navegação */}
              <Tabs defaultValue="categoria" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="categoria">Por Categoria</TabsTrigger>
                  <TabsTrigger value="tempo">Por Tempo</TabsTrigger>
                  <TabsTrigger value="comparativo">Comparativo</TabsTrigger>
                  <TabsTrigger value="exportacoes">Exportações</TabsTrigger>
                </TabsList>

                {/* Por Categoria */}
                <TabsContent value="categoria" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Receitas por Categoria</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={financialData.categoriaPie}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {financialData.categoriaPie.map(
                                (entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                )
                              )}
                            </Pie>
                            <Tooltip
                              formatter={(value: number) =>
                                `${value.toLocaleString()} AOA`
                              }
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Propinas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span>Recebido:</span>
                            <strong>
                              {financialData.propinas.recebido.toLocaleString()}{" "}
                              AOA
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Em Atraso:</span>
                            <strong className="text-red-600">
                              {financialData.propinas.atraso.toLocaleString()}{" "}
                              AOA
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxa de Pagamento:</span>
                            <Badge variant="secondary">
                              {financialData.propinas.taxa}%
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">
                            Outros Serviços
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Exames:</span>{" "}
                            <span>
                              {financialData.outrosServicos.exames.toLocaleString()}{" "}
                              AOA
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Declarações:</span>{" "}
                            <span>
                              {financialData.outrosServicos.declaracoes.toLocaleString()}{" "}
                              AOA
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Eventos:</span>{" "}
                            <span>
                              {financialData.outrosServicos.eventos.toLocaleString()}{" "}
                              AOA
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Por Tempo */}
                <TabsContent value="tempo" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Evolução Mensal de Receitas e Atrasos
                      </CardTitle>
                      <CardDescription>Últimos 6 meses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={financialData.mensal}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mes" />
                          <YAxis />
                          <Tooltip
                            formatter={(value: number) =>
                              `${value.toLocaleString()} AOA`
                            }
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="receita"
                            stroke="#3b82f6"
                            name="Receita"
                          />
                          <Line
                            type="monotone"
                            dataKey="atraso"
                            stroke="#ef4444"
                            name="Atraso"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Comparativo */}
                <TabsContent value="comparativo" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Comparação entre Anos Letivos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={financialData.anualComparativo}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="ano" />
                          <YAxis />
                          <Tooltip
                            formatter={(value: number) =>
                              `${value.toLocaleString()} AOA`
                            }
                          />
                          <Legend />
                          <Bar
                            dataKey="receita"
                            fill="#10b981"
                            name="Receita Total"
                          />
                          <Bar
                            dataKey="atraso"
                            fill="#ef4444"
                            name="Pendências"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Exportações */}
                {/* Exportações */}
                <TabsContent value="exportacoes" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Histórico de Exportações</CardTitle>
                      <CardDescription>
                        Relatórios gerados com os filtros atuais
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Relatório Completo */}
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">
                              Relatório Completo - {periodo.replace("/", "_")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Curso: {curso === "todos" ? "Todos" : curso} |
                              Turma: {turma === "todas" ? "Todas" : turma} |
                              Gerado em: {new Date().toLocaleString("pt-AO")}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {/* <Button
                              size="sm"
                              variant="outline"
                              onClick={async () => {
                                await exportToPDF();
                                alert("PDF gerado com sucesso!");
                              }}
                            >
                              <Download className="w-3.5 h-3.5 mr-1" /> PDF
                            </Button> */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                exportToCSV();
                                alert("CSV baixado com sucesso!");
                              }}
                            >
                              <Download className="w-3.5 h-3.5 mr-1" /> CSV
                            </Button>
                          </div>
                        </div>

                        {/* Relatório por Categoria */}
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">
                              Por Categoria - {periodo.replace("/", "_")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Inclui propinas, serviços, bolsas |{" "}
                              {new Date().toLocaleDateString("pt-AO")}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {/* <Button
                              size="sm"
                              variant="outline"
                              onClick={exportToPDF}
                            >
                              <Download className="w-3.5 h-3.5 mr-1" /> PDF
                            </Button> */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={exportToCSV}
                            >
                              <Download className="w-3.5 h-3.5 mr-1" /> CSV
                            </Button>
                          </div>
                        </div>

                        {/* Relatório Mensal */}
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">
                              Evolução Mensal - Últimos 6 meses
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Gráficos de receita e inadimplência |{" "}
                              {new Date().toLocaleDateString("pt-AO")}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {/* <Button
                              size="sm"
                              variant="outline"
                              onClick={exportToPDF}
                            >
                              <Download className="w-3.5 h-3.5 mr-1" /> PDF
                            </Button> */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={exportToCSV}
                            >
                              <Download className="w-3.5 h-3.5 mr-1" /> CSV
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
