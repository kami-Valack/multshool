"use client";

import { useState, useRef } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Filter, Search, CheckCircle, XCircle, Clock, ArrowRightLeft, Printer } from "lucide-react";

// Função nativa de formatação de data
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

type RequestType = "transfer_in" | "transfer_out" | "recurrence" | "course_change";
type RequestStatus = "pending" | "approved" | "rejected";

interface Request {
  id: string;
  studentName: string;
  type: RequestType;
  status: RequestStatus;
  origin?: string;
  destination?: string;
  course?: string;
  class?: string;
  date: Date;
  reason: string;
  documents: string[];
  observations?: string;
}

export default function TransferenciasRecorrencias() {
  const [activeTab, setActiveTab] = useState<"transferencias" | "recorrencias" | "mudancas">("transferencias");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "transfer_in" | "transfer_out">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionNotes, setActionNotes] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  const mockRequests: Request[] = [
    {
      id: "TRF-001",
      studentName: "Maria Santos",
      type: "transfer_in",
      status: "pending",
      origin: "Universidade Agostinho Neto",
      destination: "Instituto Superior Politécnico",
      course: "Engenharia Informática",
      date: new Date(2025, 9, 15),
      reason: "Mudança de residência familiar",
      documents: ["carta_motivacao.pdf", "historico.pdf", "certificado.pdf"],
    },
    {
      id: "TRF-002",
      studentName: "João Mendes",
      type: "transfer_out",
      status: "approved",
      origin: "Instituto Superior Politécnico",
      destination: "Universidade Católica de Angola",
      course: "Gestão",
      date: new Date(2025, 8, 20),
      reason: "Aproximação ao local de trabalho",
      documents: ["declaracao.pdf"],
      observations: "Transferência aprovada com equivalência de 3 disciplinas",
    },
    {
      id: "REC-001",
      studentName: "Ana Costa",
      type: "recurrence",
      status: "pending",
      course: "Direito",
      class: "2º Ano - Turma B",
      date: new Date(2025, 10, 1),
      reason: "Retorno após interrupção por motivos de saúde",
      documents: ["requerimento.pdf", "comprovativo_medico.pdf"],
    },
    {
      id: "MUD-001",
      studentName: "Pedro Silva",
      type: "course_change",
      status: "rejected",
      course: "De: Contabilidade → Para: Gestão",
      date: new Date(2025, 9, 10),
      reason: "Interesse profissional",
      documents: ["plano_estudos.pdf"],
      observations: "Rejeitado: média insuficiente para mudança",
    },
  ];

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "pending": return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="w-3 h-3" /> Pendente</Badge>;
      case "approved": return <Badge className="bg-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Aprovado</Badge>;
      case "rejected": return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejeitado</Badge>;
    }
  };

  const getTypeLabel = (type: RequestType) => {
    switch (type) {
      case "transfer_in": return "Entrada";
      case "transfer_out": return "Saída";
      case "recurrence": return "Recorrência";
      case "course_change": return "Mudança de Curso/Turma";
    }
  };

  const filteredRequests = mockRequests.filter(req => {
    const matchesTab = 
      (activeTab === "transferencias" && (req.type === "transfer_in" || req.type === "transfer_out")) ||
      (activeTab === "recorrencias" && req.type === "recurrence") ||
      (activeTab === "mudancas" && req.type === "course_change");
    
    const matchesFilter = filterType === "all" || req.type === filterType;
    const matchesSearch = req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || req.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesFilter && matchesSearch;
  });

  const stats = {
    pending: mockRequests.filter(r => r.status === "pending").length,
    approved: mockRequests.filter(r => r.status === "approved").length,
    rejected: mockRequests.filter(r => r.status === "rejected").length,
    avgProcessingTime: "3.5 dias",
  };

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setDrawerOpen(true);
  };

  const handleApprove = () => {
    console.log("Aprovado:", selectedRequest?.id, actionNotes);
    setDrawerOpen(false);
    setActionNotes("");
  };

  const handleReject = () => {
    console.log("Rejeitado:", selectedRequest?.id, actionNotes);
    setDrawerOpen(false);
    setActionNotes("");
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${selectedRequest?.id} - Documento</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
            .logo { width: 80px; height: 80px; background: #f0f0f0; margin: 0 auto 10px; border-radius: 50%; }
            h1 { margin: 0; font-size: 24px; }
            h2 { margin: 20px 0 10px; font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .label { font-weight: bold; }
            .documents { margin: 20px 0; }
            .doc-item { display: flex; justify-content: space-between; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin: 5px 0; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
            @page { margin: 1cm; }
            @media print {
              body { print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo"></div>
            <h1>INSTITUTO SUPERIOR POLITÉCNICO</h1>
            <p>Direcção Académica</p>
          </div>

          <h2>DETALHES DO PEDIDO</h2>
          <div class="info-grid">
            <div><span class="label">ID do Pedido:</span> ${selectedRequest?.id}</div>
            <div><span class="label">Data:</span> ${formatDate(selectedRequest?.date || new Date())}</div>
            <div><span class="label">Estudante:</span> ${selectedRequest?.studentName}</div>
            <div><span class="label">Tipo:</span> ${getTypeLabel(selectedRequest?.type || "transfer_in")}</div>
            <div><span class="label">Estado:</span> ${selectedRequest?.status === "pending" ? "Pendente" : selectedRequest?.status === "approved" ? "Aprovado" : "Rejeitado"}</div>
          </div>

          ${selectedRequest?.type.includes("transfer") ? `
            <h2>INSTITUIÇÕES</h2>
            <div class="info-grid">
              <div><span class="label">Origem:</span> ${selectedRequest?.origin}</div>
              <div><span class="label">Destino:</span> ${selectedRequest?.destination}</div>
            </div>
          ` : ""}

          ${selectedRequest?.type === "recurrence" ? `
            <h2>REINTEGRAÇÃO</h2>
            <div class="info-grid">
              <div><span class="label">Curso:</span> ${selectedRequest?.course}</div>
              <div><span class="label">Turma:</span> ${selectedRequest?.class}</div>
            </div>
          ` : ""}

          ${selectedRequest?.type === "course_change" ? `
            <h2>MUDANÇA</h2>
            <div><span class="label">Solicitado:</span> ${selectedRequest?.course}</div>
          ` : ""}

          <h2>MOTIVO</h2>
          <p>${selectedRequest?.reason}</p>

          <h2>DOCUMENTOS ANEXADOS</h2>
          <div class="documents">
            ${selectedRequest?.documents.map(doc => `
              <div class="doc-item">
                <span>${doc}</span>
                <span>[Anexado]</span>
              </div>
            `).join("") || "<p>Nenhum documento anexado.</p>"}
          </div>

          ${selectedRequest?.observations ? `
            <h2>OBSERVAÇÕES ADMINISTRATIVAS</h2>
            <p>${selectedRequest.observations}</p>
          ` : ""}

          <div class="footer">
            <p>Documento gerado em ${formatDate(new Date())} às ${new Date().toLocaleTimeString('pt-AO')}</p>
            <p>Este é um documento oficial. Qualquer alteração invalida o mesmo.</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
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
            
            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Transferências e Recorrências</h1>
                <p className="text-muted-foreground">Gestão de transferências, reintegrações e mudanças de curso/turma</p>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Em Análise</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pending}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.approved}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recusados</CardTitle>
                    <XCircle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.rejected}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                    <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.avgProcessingTime}</div>
                  </CardContent>
                </Card>
              </div>

              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <TabsList>
                    <TabsTrigger value="transferencias">Transferências</TabsTrigger>
                    <TabsTrigger value="recorrencias">Recorrências</TabsTrigger>
                    <TabsTrigger value="mudancas">Mudanças de Curso/Turma</TabsTrigger>
                  </TabsList>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar estudante ou ID..."
                        className="pl-8 w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    {activeTab === "transferencias" && (
                      <Select value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="transfer_in">Entrada</SelectItem>
                          <SelectItem value="transfer_out">Saída</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Estudante</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="hidden md:table-cell">Instituição/Curso</TableHead>
                          <TableHead className="hidden sm:table-cell">Data</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRequests.map((req) => (
                          <TableRow key={req.id}>
                            <TableCell className="font-medium">{req.id}</TableCell>
                            <TableCell>{req.studentName}</TableCell>
                            <TableCell>{getTypeLabel(req.type)}</TableCell>
                            <TableCell>{getStatusBadge(req.status)}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {req.type.includes("transfer") ? `${req.origin || ""} → ${req.destination || ""}` : req.course}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{formatDate(req.date)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewDetails(req)}>
                                Ver detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {filteredRequests.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        Nenhum pedido encontrado.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Drawer com PDF embutido */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent className="max-h-[90vh]">
            {selectedRequest && (
              <>
                <DrawerHeader>
                  <DrawerTitle>Detalhes do Pedido - {selectedRequest.id}</DrawerTitle>
                </DrawerHeader>

                {/* Área de impressão (oculta na tela) */}
                <div className="hidden">
                  <div ref={printRef}>
                    {/* Conteúdo duplicado para impressão */}
                  </div>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto">
                  {/* Conteúdo visível no drawer */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div><Label>Estudante</Label><p className="font-medium">{selectedRequest.studentName}</p></div>
                    <div><Label>Tipo</Label><p className="font-medium">{getTypeLabel(selectedRequest.type)}</p></div>
                    <div><Label>Estado</Label><div>{getStatusBadge(selectedRequest.status)}</div></div>
                    <div><Label>Data do Pedido</Label><p>{formatDate(selectedRequest.date)}</p></div>
                  </div>

                  {selectedRequest.type.includes("transfer") && (
                    <>
                      <Separator />
                      <div className="grid gap-4 md:grid-cols-2">
                        <div><Label>Origem</Label><p>{selectedRequest.origin}</p></div>
                        <div><Label>Destino</Label><p>{selectedRequest.destination}</p></div>
                      </div>
                    </>
                  )}

                  {selectedRequest.type === "recurrence" && (
                    <>
                      <Separator />
                      <div className="grid gap-4 md:grid-cols-2">
                        <div><Label>Curso</Label><p>{selectedRequest.course}</p></div>
                        <div><Label>Turma</Label><p>{selectedRequest.class}</p></div>
                      </div>
                    </>
                  )}

                  {selectedRequest.type === "course_change" && (
                    <>
                      <Separator />
                      <div><Label>Mudança</Label><p className="font-medium">{selectedRequest.course}</p></div>
                    </>
                  )}

                  <Separator />
                  <div><Label>Motivo</Label><p className="text-sm text-muted-foreground mt-1">{selectedRequest.reason}</p></div>

                  <Separator />
                  <div>
                    <Label>Documentos</Label>
                    <div className="mt-2 space-y-2">
                      {selectedRequest.documents.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{doc}</span>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedRequest.observations && (
                    <>
                      <Separator />
                      <div><Label>Observações</Label><p className="text-sm mt-1">{selectedRequest.observations}</p></div>
                    </>
                  )}

                  {selectedRequest.status === "pending" && (
                    <>
                      <Separator />
                      <div>
                        <Label>Observações para Decisão</Label>
                        <Textarea
                          placeholder="Escreva aqui as observações..."
                          className="mt-2"
                          value={actionNotes}
                          onChange={(e) => setActionNotes(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>

                <DrawerFooter className="flex flex-col sm:flex-row gap-2">
                  {selectedRequest.status === "pending" ? (
                    <>
                      <Button variant="outline" onClick={handleReject} className="flex-1">
                        <XCircle className="mr-2 h-4 w-4" /> Rejeitar
                      </Button>
                      <Button onClick={handleApprove} className="flex-1">
                        <CheckCircle className="mr-2 h-4 w-4" /> Aprovar
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handlePrint} className="flex-1">
                      <Printer className="mr-2 h-4 w-4" /> Imprimir Documento
                    </Button>
                  )}
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </SidebarInset>
    </SidebarProvider>
  );
}