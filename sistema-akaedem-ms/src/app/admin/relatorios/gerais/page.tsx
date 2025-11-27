"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { 
  CalendarIcon, Download, Eye, Trash2, Plus, Loader2, Mail, Clock, 
  X, FileText, DollarSign, Users, TrendingUp, AlertCircle
} from "lucide-react";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Função de formatação nativa
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

interface Report {
  id: string;
  name: string;
  type: string;
  date: Date;
  responsible: string;
  status: "Emitido" | "Pendente" | "Erro";
  data?: any;
}

export default function Relatorios() {
  // Estados
  const [reportType, setReportType] = useState<string>("");
  const [institution, setInstitution] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [exportFormat, setExportFormat] = useState<string>("PDF");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentReport, setCurrentReport] = useState<Report | null>(null);

  // Ref para impressão
  const printRef = useRef<HTMLDivElement>(null);

  // Histórico
  const [history, setHistory] = useState<Report[]>([
    {
      id: "1",
      name: "Relatório de Propinas - 1º Trimestre",
      type: "Financeiro",
      date: new Date(2025, 10, 4),
      responsible: "Ana Silva",
      status: "Emitido",
    },
  ]);

  // Dados simulados por tipo
  const generateReportData = (): Report | null => {
    if (!reportType) return null;

    const base = {
      id: String(Date.now()),
      name: `Relatório ${reportType} - ${formatDate(new Date())}`,
      type: reportType === "academico" ? "Académico" : reportType === "financeiro" ? "Financeiro" : "Docentes",
      date: new Date(),
      responsible: "Usuário Atual",
      status: "Emitido" as const,
    };

    if (reportType === "academico") {
      return {
        ...base,
        data: {
          title: "Desempenho Académico - 12ª Classe",
          period: "2º Semestre 2025",
          stats: { approved: 42, failed: 8, total: 50, average: 14.2 },
          students: [
            { name: "João Pedro", grade: 16, status: "Aprovado" },
            { name: "Maria Santos", grade: 12, status: "Reprovado" },
            { name: "Ana Costa", grade: 18, status: "Aprovado" },
          ],
        },
      };
    }

    if (reportType === "financeiro") {
      return {
        ...base,
        data: {
          title: "Relatório de Propinas",
          period: "Novembro 2025",
          stats: { paid: 45000, pending: 12000, total: 57000 },
          payments: [
            { student: "Carlos Mendes", value: 5000, status: "Pago" },
            { student: "Luísa Ferreira", value: 5000, status: "Pendente" },
          ],
        },
      };
    }

    if (reportType === "docentes") {
      return {
        ...base,
        data: {
          title: "Frequência Docente",
          period: "Novembro 2025",
          stats: { present: 28, absent: 2, total: 30 },
          teachers: [
            { name: "Prof. Manuel", classes: 20, absences: 0 },
            { name: "Prof. Isabel", classes: 18, absences: 1 },
          ],
        },
      };
    }

    return null;
  };

  // Gerar relatório
  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const report = generateReportData();
      if (report) {
        setCurrentReport(report);
        setHistory(prev => [report, ...prev]);
        setPreviewOpen(true);
      }
      setIsGenerating(false);
    }, 1500);
  };

  // Download PDF
  const handleDownloadPDF = () => {
    if (!currentReport?.data) return;

    const doc = new jsPDF();
    const { data } = currentReport;

    doc.setFontSize(16);
    doc.text(data.title, 20, 20);

    doc.setFontSize(12);
    doc.text(`Período: ${data.period}`, 20, 30);

    doc.setFontSize(10);
    let y = 45;
    if (data.stats) {
      Object.entries(data.stats).forEach(([key, value]) => {
        doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 20, y);
        y += 8;
      });
    }

    if (data.students || data.payments || data.teachers) {
      const rows = data.students || data.payments || data.teachers || [];
      const headers = Object.keys(rows[0] || {});
      const body = rows.map((r: any) => Object.values(r));

      autoTable(doc, {
        head: [headers],
        body,
        startY: y + 10,
      });
    }

    doc.save(`${currentReport.name}.pdf`);
  };

  // Download Excel/CSV
  const handleDownloadExcel = () => {
    if (!currentReport?.data) return;
    const csv = convertToCSV(currentReport.data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentReport.name}.csv`;
    a.click();
  };

  const convertToCSV = (data: any): string => {
    let csv = "";
    if (data.students) {
      csv += "Nome,Nota,Estado\n";
      data.students.forEach((s: any) => {
        csv += `${s.name},${s.grade},${s.status}\n`;
      });
    } else if (data.payments) {
      csv += "Aluno,Valor,Estado\n";
      data.payments.forEach((p: any) => {
        csv += `${p.student},${p.value},${p.status}\n`;
      });
    } else if (data.teachers) {
      csv += "Professor,Aulas,Faltas\n";
      data.teachers.forEach((t: any) => {
        csv += `${t.name},${t.classes},${t.absences}\n`;
      });
    }
    return csv;
  };

  // Impressão nativa
  const handlePrint = () => {
    if (!printRef.current) return;
    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head><title>${currentReport?.name}</title></head>
        <body style="font-family: sans-serif; padding: 20px;">
          ${printRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Emitido": return <Badge className="bg-green-500">Emitido</Badge>;
      case "Pendente": return <Badge className="bg-yellow-500">Pendente</Badge>;
      case "Erro": return <Badge className="bg-red-500">Erro</Badge>;
      default: return null;
    }
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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <NavbarH />

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Relatórios e Estatísticas</h1>
                  <p className="text-muted-foreground">
                    Gera e exporta relatórios académicos, financeiros ou administrativos.
                  </p>
                </div>
                <Button onClick={handleGenerateReport} disabled={isGenerating || !reportType}>
                  <Plus className="mr-2 h-4 w-4" />
                  {isGenerating ? "A gerar..." : "+ Novo Relatório"}
                </Button>
              </div>

              <Tabs defaultValue="gerar" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="gerar">Geração de Relatório</TabsTrigger>
                  <TabsTrigger value="historico">Histórico</TabsTrigger>
                </TabsList>

                <TabsContent value="gerar" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Filtros Avançados</CardTitle>
                      <CardDescription>Configure os parâmetros do relatório</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Tipo de Relatório</Label>
                          <Select value={reportType} onValueChange={setReportType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="academico">Académico</SelectItem>
                              <SelectItem value="financeiro">Financeiro</SelectItem>
                              <SelectItem value="docentes">Docentes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Período</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? formatDate(selectedDate) : "Selecione data"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label>Instituição</Label>
                          <Select value={institution} onValueChange={setInstitution}>
                            <SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todas</SelectItem>
                              <SelectItem value="escola1">Escola Secundária do Luena</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Curso / Turma</Label>
                          <Select value={course} onValueChange={setCourse}>
                            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12a">12ª Classe A</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Estado</Label>
                          <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="emitido">Emitido</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Formato de Exportação</Label>
                          <Select value={exportFormat} onValueChange={setExportFormat}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PDF">PDF</SelectItem>
                              <SelectItem value="Excel">Excel</SelectItem>
                              <SelectItem value="CSV">CSV</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {reportType && (
                        <div className="border-t pt-6 space-y-4">
                          <h4 className="font-medium">Parâmetros Específicos</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {reportType === "academico" && (
                              <>
                                <div className="space-y-2">
                                  <Label>Semestre</Label>
                                  <Select defaultValue="2">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1º Semestre</SelectItem>
                                      <SelectItem value="2">2º Semestre</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Tipo de Prova</Label>
                                  <Select defaultValue="exame">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="teste">Teste</SelectItem>
                                      <SelectItem value="exame">Exame</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </>
                            )}
                            {reportType === "financeiro" && (
                              <div className="space-y-2">
                                <Label>Categoria</Label>
                                <Select defaultValue="propinas">
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="propinas">Propinas</SelectItem>
                                    <SelectItem value="atrasos">Atrasos</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            {reportType === "docentes" && (
                              <div className="space-y-2">
                                <Label>Métrica</Label>
                                <Select defaultValue="freq">
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="freq">Frequência</SelectItem>
                                    <SelectItem value="desemp">Desempenho</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button onClick={handleGenerateReport} disabled={isGenerating || !reportType}>
                          {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />A gerar...</> : "Gerar Relatório"}
                        </Button>
                      </div>

                      <div className="border-t pt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch id="schedule" checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
                            <Label htmlFor="schedule">Agendar Relatório</Label>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setScheduleOpen(true)} disabled={!scheduleEnabled}>
                            <Clock className="mr-2 h-5 w-5" />Agendar
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="notify" 
                            checked={notifyEmail} 
                            onCheckedChange={(checked: boolean) => setNotifyEmail(checked)}
                          />
                          <Label htmlFor="notify">Notificar por e-mail</Label>
                          {notifyEmail && <Mail className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="historico">
                  <Card>
                    <CardHeader>
                      <CardTitle>Histórico de Relatórios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Responsável</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {history.map((report) => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{report.name}</TableCell>
                              <TableCell>{report.type}</TableCell>
                              <TableCell>{formatDate(report.date)}</TableCell>
                              <TableCell>{report.responsible}</TableCell>
                              <TableCell>{getStatusBadge(report.status)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button size="sm" variant="ghost" onClick={() => { setCurrentReport(report); setPreviewOpen(true); }}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => { setCurrentReport(report); exportFormat === "PDF" ? handleDownloadPDF() : handleDownloadExcel(); }}>
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-red-600" onClick={() => setHistory(prev => prev.filter(r => r.id !== report.id))}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Modal de Pré-visualização */}
        {previewOpen && currentReport?.data && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{currentReport.data.title}</CardTitle>
                  <CardDescription>{currentReport.data.period}</CardDescription>
                </div>
                <Button size="icon" variant="ghost" onClick={() => setPreviewOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent ref={printRef}>
                <div className="space-y-6">
                  {/* Estatísticas */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentReport.type === "Académico" && (
                      <>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{currentReport.data.stats.total}</div>
                          <div className="text-sm text-blue-600">Total Alunos</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{currentReport.data.stats.approved}</div>
                          <div className="text-sm text-green-600">Aprovados</div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">{currentReport.data.stats.failed}</div>
                          <div className="text-sm text-red-600">Reprovados</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{currentReport.data.stats.average}</div>
                          <div className="text-sm text-purple-600">Média</div>
                        </div>
                      </>
                    )}
                    {currentReport.type === "Financeiro" && (
                      <>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{currentReport.data.stats.paid.toLocaleString()} Kz</div>
                          <div className="text-sm text-green-600">Pago</div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">{currentReport.data.stats.pending.toLocaleString()} Kz</div>
                          <div className="text-sm text-red-600">Pendente</div>
                        </div>
                      </>
                    )}
                    {currentReport.type === "Docentes" && (
                      <>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{currentReport.data.stats.present}</div>
                          <div className="text-sm text-green-600">Presentes</div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">{currentReport.data.stats.absent}</div>
                          <div className="text-sm text-red-600">Faltas</div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Tabela */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {currentReport.type === "Académico" && (
                          <>
                            <TableHead>Nome</TableHead>
                            <TableHead>Nota</TableHead>
                            <TableHead>Estado</TableHead>
                          </>
                        )}
                        {currentReport.type === "Financeiro" && (
                          <>
                            <TableHead>Aluno</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Estado</TableHead>
                          </>
                        )}
                        {currentReport.type === "Docentes" && (
                          <>
                            <TableHead>Professor</TableHead>
                            <TableHead>Aulas</TableHead>
                            <TableHead>Faltas</TableHead>
                          </>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(currentReport.data.students || currentReport.data.payments || currentReport.data.teachers || []).map((row: any, i: number) => (
                        <TableRow key={i}>
                          <TableCell>{row.name || row.student || row.name}</TableCell>
                          <TableCell>{row.grade || row.value || row.classes}</TableCell>
                          <TableCell>{row.status || row.absences}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <div className="border-t p-4 flex justify-end gap-2">
                <Button variant="outline" onClick={handlePrint}>
                  <FileText className="mr-2 h-4 w-4" />Imprimir
                </Button>
                <Button onClick={exportFormat === "PDF" ? handleDownloadPDF : handleDownloadExcel}>
                  <Download className="mr-2 h-4 w-4" />
                  Download {exportFormat}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Modal de Agendamento */}
        {scheduleOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Agendar Relatório</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Frequência</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>E-mail para envio</Label>
                  <input type="email" className="w-full px-3 py-2 border rounded-md" placeholder="exemplo@escola.ao" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setScheduleOpen(false)}>Cancelar</Button>
                  <Button>Confirmar Agendamento</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}