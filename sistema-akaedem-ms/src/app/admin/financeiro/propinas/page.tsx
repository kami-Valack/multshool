'use client';

import * as React from 'react';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Edit, Trash2, Download, DollarSign, AlertCircle, CheckCircle, Clock, Users, FileText } from "lucide-react";

// === Funções de formatação de data sem date-fns ===
const formatarData = (date: Date): string => {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const dataParaInput = (date: Date): string => {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

// Tipos
type Moeda = "AOA" | "USD" | "EUR";
type Periodo = "mensal" | "trimestral" | "semestral" | "anual";
type TipoEstudante = "novo" | "recorrente" | "transferido";
type EstadoPagamento = "em dia" | "em atraso" | "isento" | "bolseiro";

interface Parcela {
  numero: number;
  valor: number;
  dataVencimento: Date;
  paga?: boolean;
  dataPagamento?: Date;
}

interface PlanoPropina {
  id: string;
  nome: string;
  periodo: Periodo;
  valorTotal: number;
  numeroParcelas: number;
  parcelas: Parcela[];
  moeda: Moeda;
  descontoPercentual?: number;
  multaAtrasoPercentual?: number;
  multaAtrasoFixa?: number;
  dataInicio: Date;
  dataFim: Date;
  cursosAssociados: string[];
  turmasAssociadas: string[];
  anosLetivos: string[];
  tiposEstudante: TipoEstudante[];
}

interface Estudante {
  id: string;
  nome: string;
  numero: string;
  curso: string;
  turma: string;
  anoLetivo: string;
  tipo: TipoEstudante;
  planoId: string;
  estado: EstadoPagamento;
  valorPago: number;
  valorPendente: number;
  atrasoDias?: number;
}

interface TaxaAdicional {
  id: string;
  nome: string;
  valor: number;
  moeda: Moeda;
}

// Dados iniciais
const moedas: Moeda[] = ["AOA", "USD", "EUR"];
const periodos: Periodo[] = ["mensal", "trimestral", "semestral", "anual"];
const tiposEstudante: TipoEstudante[] = ["novo", "recorrente", "transferido"];

const planosIniciais: PlanoPropina[] = [
  {
    id: "1",
    nome: "Plano Anual - Licenciatura",
    periodo: "anual",
    valorTotal: 450000,
    numeroParcelas: 1,
    parcelas: [{ numero: 1, valor: 450000, dataVencimento: new Date(2025, 8, 15) }],
    moeda: "AOA",
    dataInicio: new Date(2025, 8, 1),
    dataFim: new Date(2026, 7, 31),
    cursosAssociados: ["Licenciatura em Informática"],
    turmasAssociadas: ["INFO-2025-A"],
    anosLetivos: ["2025/2026"],
    tiposEstudante: ["novo", "recorrente"]
  }
];

const estudantesIniciais: Estudante[] = [
  { id: "1", nome: "Maria Santos", numero: "2025001", curso: "Licenciatura em Informática", turma: "INFO-2025-A", anoLetivo: "2025/2026", tipo: "novo", planoId: "1", estado: "em dia", valorPago: 450000, valorPendente: 0 },
  { id: "2", nome: "João Pedro", numero: "2025002", curso: "Licenciatura em Informática", turma: "INFO-2025-A", anoLetivo: "2025/2026", tipo: "recorrente", planoId: "1", estado: "em atraso", valorPago: 200000, valorPendente: 250000, atrasoDias: 15 },
  { id: "3", nome: "Ana Lima", numero: "2025003", curso: "Licenciatura em Informática", turma: "INFO-2025-A", anoLetivo: "2025/2026", tipo: "novo", planoId: "1", estado: "bolseiro", valorPago: 0, valorPendente: 0 },
];

const taxasAdicionaisIniciais: TaxaAdicional[] = [
  { id: "1", nome: "Matrícula", valor: 25000, moeda: "AOA" },
  { id: "2", nome: "Cartão de Estudante", valor: 5000, moeda: "AOA" },
  { id: "3", nome: "Declaração", valor: 3000, moeda: "AOA" },
];

export default function PropinasPage() {
  const [planos, setPlanos] = React.useState<PlanoPropina[]>(planosIniciais);
  const [estudantes, setEstudantes] = React.useState<Estudante[]>(estudantesIniciais);
  const [taxasAdicionais, setTaxasAdicionais] = React.useState<TaxaAdicional[]>(taxasAdicionaisIniciais);
  const [planoEditando, setPlanoEditando] = React.useState<PlanoPropina | null>(null);
  const [dialogAberto, setDialogAberto] = React.useState(false);
  const [abaAtiva, setAbaAtiva] = React.useState("planos");

  const [formPlano, setFormPlano] = React.useState<Partial<PlanoPropina>>({
    nome: "",
    periodo: "mensal",
    valorTotal: 0,
    moeda: "AOA",
    dataInicio: new Date(),
    dataFim: new Date(),
    cursosAssociados: [],
    turmasAssociadas: [],
    anosLetivos: [],
    tiposEstudante: []
  });

  // Geração automática de parcelas
  React.useEffect(() => {
    if (!formPlano.valorTotal || !formPlano.periodo || !formPlano.dataInicio) return;

    const numParcelasMap: Record<Periodo, number> = {
      mensal: 12,
      trimestral: 4,
      semestral: 2,
      anual: 1
    };

    const numParcelas = numParcelasMap[formPlano.periodo];
    const valorParcela = formPlano.valorTotal / numParcelas;
    const parcelas: Parcela[] = [];
    let dataAtual = new Date(formPlano.dataInicio);

    for (let i = 1; i <= numParcelas; i++) {
      parcelas.push({
        numero: i,
        valor: valorParcela,
        dataVencimento: new Date(dataAtual)
      });
      dataAtual = new Date(dataAtual);
      dataAtual.setMonth(dataAtual.getMonth() + (12 / numParcelas));
    }

    setFormPlano(prev => ({ ...prev, numeroParcelas: numParcelas, parcelas }));
  }, [formPlano.valorTotal, formPlano.periodo, formPlano.dataInicio]);

  const handleCriarPlano = () => {
    const novoPlano: PlanoPropina = {
      id: planoEditando?.id || Date.now().toString(),
      nome: formPlano.nome || "",
      periodo: formPlano.periodo || "mensal",
      valorTotal: formPlano.valorTotal || 0,
      numeroParcelas: formPlano.numeroParcelas || 1,
      parcelas: formPlano.parcelas || [],
      moeda: formPlano.moeda || "AOA",
      descontoPercentual: formPlano.descontoPercentual,
      multaAtrasoPercentual: formPlano.multaAtrasoPercentual,
      multaAtrasoFixa: formPlano.multaAtrasoFixa,
      dataInicio: formPlano.dataInicio || new Date(),
      dataFim: formPlano.dataFim || new Date(),
      cursosAssociados: formPlano.cursosAssociados || [],
      turmasAssociadas: formPlano.turmasAssociadas || [],
      anosLetivos: formPlano.anosLetivos || [],
      tiposEstudante: formPlano.tiposEstudante || []
    };

    if (planoEditando) {
      setPlanos(prev => prev.map(p => p.id === planoEditando.id ? novoPlano : p));
    } else {
      setPlanos(prev => [...prev, novoPlano]);
    }

    resetForm();
    setDialogAberto(false);
  };

  const resetForm = () => {
    setFormPlano({
      nome: "",
      periodo: "mensal",
      valorTotal: 0,
      moeda: "AOA",
      dataInicio: new Date(),
      dataFim: new Date(),
      cursosAssociados: [],
      turmasAssociadas: [],
      anosLetivos: [],
      tiposEstudante: []
    });
    setPlanoEditando(null);
  };

  const handleEditarPlano = (plano: PlanoPropina) => {
    setPlanoEditando(plano);
    setFormPlano(plano);
    setDialogAberto(true);
  };

  const handleExcluirPlano = (id: string) => {
    setPlanos(prev => prev.filter(p => p.id !== id));
  };

  // Resumo financeiro
  const totalArrecadado = estudantes.reduce((acc, e) => acc + e.valorPago, 0);
  const totalPendente = estudantes.reduce((acc, e) => acc + e.valorPendente, 0);
  const emAtraso = estudantes.filter(e => e.estado === "em atraso").length;
  const taxaInadimplencia = estudantes.length > 0 ? ((emAtraso / estudantes.length) * 100).toFixed(1) : "0";

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
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Gestão de Propinas</h1>
                <p className="text-muted-foreground">Configure planos, acompanhe pagamentos e gere relatórios.</p>
              </div>

              {/* Cards de Resumo */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Arrecadado</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalArrecadado.toLocaleString()} AOA</div>
                    <p className="text-xs text-muted-foreground">Este mês</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pendente</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalPendente.toLocaleString()} AOA</div>
                    <p className="text-xs text-muted-foreground">A receber</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Em Atraso</CardTitle>
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{emAtraso}</div>
                    <p className="text-xs text-muted-foreground">estudantes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taxa de Inadimplência</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{taxaInadimplencia}%</div>
                    <p className="text-xs text-muted-foreground">dos estudantes</p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="planos">Planos e Configurações</TabsTrigger>
                  <TabsTrigger value="pagamentos">Gestão de Pagamentos</TabsTrigger>
                  <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
                </TabsList>

                {/* Aba: Planos e Configurações */}
                <TabsContent value="planos" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Planos de Propinas</CardTitle>
                          <CardDescription>Crie e gerencie planos de pagamento</CardDescription>
                        </div>
                        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                          <DialogTrigger asChild>
                            <Button onClick={() => { resetForm(); setDialogAberto(true); }}>
                              <Plus className="mr-2 h-4 w-4" /> Novo Plano
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{planoEditando ? "Editar" : "Criar"} Plano de Propinas</DialogTitle>
                              <DialogDescription>Preencha os dados do plano de pagamento</DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Nome do Plano</Label>
                                  <Input
                                    value={formPlano.nome || ""}
                                    onChange={(e) => setFormPlano(prev => ({ ...prev, nome: e.target.value }))}
                                    placeholder="ex: Plano Anual - Licenciatura"
                                  />
                                </div>
                                <div>
                                  <Label>Período</Label>
                                  <Select
                                    value={formPlano.periodo}
                                    onValueChange={(v) => setFormPlano(prev => ({ ...prev, periodo: v as Periodo }))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {periodos.map(p => (
                                        <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Valor Total</Label>
                                  <Input
                                    type="number"
                                    value={formPlano.valorTotal || ""}
                                    onChange={(e) => setFormPlano(prev => ({ ...prev, valorTotal: Number(e.target.value) }))}
                                  />
                                </div>
                                <div>
                                  <Label>Moeda</Label>
                                  <Select
                                    value={formPlano.moeda}
                                    onValueChange={(v) => setFormPlano(prev => ({ ...prev, moeda: v as Moeda }))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {moedas.map(m => (
                                        <SelectItem key={m} value={m}>{m}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Data de Início</Label>
                                  <Input
                                    type="date"
                                    value={formPlano.dataInicio ? dataParaInput(formPlano.dataInicio) : ""}
                                    onChange={(e) => setFormPlano(prev => ({ ...prev, dataInicio: new Date(e.target.value) }))}
                                  />
                                </div>
                                <div>
                                  <Label>Data de Fim</Label>
                                  <Input
                                    type="date"
                                    value={formPlano.dataFim ? dataParaInput(formPlano.dataFim) : ""}
                                    onChange={(e) => setFormPlano(prev => ({ ...prev, dataFim: new Date(e.target.value) }))}
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <Label>Desconto (%)</Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formPlano.descontoPercentual || ""}
                                    onChange={(e) => setFormPlano(prev => ({ ...prev, descontoPercentual: Number(e.target.value) || undefined }))}
                                  />
                                </div>
                                <div>
                                  <Label>Multa Atraso (%)</Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={formPlano.multaAtrasoPercentual || ""}
                                    onChange={(e) => setFormPlano(prev => ({ ...prev, multaAtrasoPercentual: Number(e.target.value) || undefined }))}
                                  />
                                </div>
                                <div>
                                  <Label>Multa Fixa</Label>
                                  <Input
                                    type="number"
                                    value={formPlano.multaAtrasoFixa || ""}
                                    onChange={(e) => setFormPlano(prev => ({ ...prev, multaAtrasoFixa: Number(e.target.value) || undefined }))}
                                  />
                                </div>
                              </div>

                              <div>
                                <Label>Tipos de Estudante</Label>
                                <div className="flex gap-2 mt-2">
                                  {tiposEstudante.map(tipo => (
                                    <Button
                                      key={tipo}
                                      variant={formPlano.tiposEstudante?.includes(tipo) ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => {
                                        setFormPlano(prev => ({
                                          ...prev,
                                          tiposEstudante: prev.tiposEstudante?.includes(tipo)
                                            ? prev.tiposEstudante.filter(t => t !== tipo)
                                            : [...(prev.tiposEstudante || []), tipo]
                                        }));
                                      }}
                                    >
                                      {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                                    </Button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <Label>Cursos Associados</Label>
                                <Input
                                  placeholder="ex: Licenciatura em Informática, Mestrado em Gestão"
                                  value={formPlano.cursosAssociados?.join(", ") || ""}
                                  onChange={(e) => setFormPlano(prev => ({ ...prev, cursosAssociados: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))}
                                />
                              </div>

                              <div>
                                <Label>Turmas Associadas</Label>
                                <Input
                                  placeholder="ex: INFO-2025-A, GEST-2025-B"
                                  value={formPlano.turmasAssociadas?.join(", ") || ""}
                                  onChange={(e) => setFormPlano(prev => ({ ...prev, turmasAssociadas: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))}
                                />
                              </div>

                              <div>
                                <Label>Anos Letivos</Label>
                                <Input
                                  placeholder="ex: 2025/2026"
                                  value={formPlano.anosLetivos?.join(", ") || ""}
                                  onChange={(e) => setFormPlano(prev => ({ ...prev, anosLetivos: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))}
                                />
                              </div>

                              {formPlano.parcelas && formPlano.parcelas.length > 0 && (
                                <div>
                                  <Label>Parcelas Geradas ({formPlano.parcelas.length})</Label>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Parcela</TableHead>
                                        <TableHead>Valor</TableHead>
                                        <TableHead>Vencimento</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {formPlano.parcelas.map((p, i) => (
                                        <TableRow key={i}>
                                          <TableCell>{p.numero}ª</TableCell>
                                          <TableCell>{p.valor.toFixed(2)} {formPlano.moeda}</TableCell>
                                          <TableCell>{formatarData(p.dataVencimento)}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              )}
                            </div>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => { resetForm(); setDialogAberto(false); }}>
                                Cancelar
                              </Button>
                              <Button onClick={handleCriarPlano}>
                                {planoEditando ? "Salvar Alterações" : "Criar Plano"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-96">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nome</TableHead>
                              <TableHead>Período</TableHead>
                              <TableHead>Valor Total</TableHead>
                              <TableHead>Parcelas</TableHead>
                              <TableHead>Moeda</TableHead>
                              <TableHead>Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {planos.map(plano => (
                              <TableRow key={plano.id}>
                                <TableCell className="font-medium">{plano.nome}</TableCell>
                                <TableCell>{plano.periodo}</TableCell>
                                <TableCell>{plano.valorTotal.toLocaleString()} {plano.moeda}</TableCell>
                                <TableCell>{plano.numeroParcelas}</TableCell>
                                <TableCell>{plano.moeda}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="ghost" onClick={() => handleEditarPlano(plano)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => handleExcluirPlano(plano.id)}>
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Taxas Adicionais */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Outras Taxas</CardTitle>
                      <CardDescription>Matrícula, cartão, declarações, etc.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {taxasAdicionais.map(taxa => (
                          <div key={taxa.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{taxa.nome}</p>
                              <p className="text-sm text-muted-foreground">{taxa.valor.toLocaleString()} {taxa.moeda}</p>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Aba: Gestão de Pagamentos */}
                <TabsContent value="pagamentos">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Estudantes e Estado de Pagamento</CardTitle>
                          <CardDescription>Lista completa com situação atual</CardDescription>
                        </div>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Exportar
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-96">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nº</TableHead>
                              <TableHead>Nome</TableHead>
                              <TableHead>Curso/Turma</TableHead>
                              <TableHead>Plano</TableHead>
                              <TableHead>Pago</TableHead>
                              <TableHead>Pendente</TableHead>
                              <TableHead>Estado</TableHead>
                              <TableHead>Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {estudantes.map(est => (
                              <TableRow key={est.id}>
                                <TableCell>{est.numero}</TableCell>
                                <TableCell className="font-medium">{est.nome}</TableCell>
                                <TableCell>{est.curso} / {est.turma}</TableCell>
                                <TableCell>{planos.find(p => p.id === est.planoId)?.nome || "-"}</TableCell>
                                <TableCell>{est.valorPago.toLocaleString()} AOA</TableCell>
                                <TableCell>{est.valorPendente.toLocaleString()} AOA</TableCell>
                                <TableCell>
                                  <Badge variant={
                                    est.estado === "em dia" ? "default" :
                                    est.estado === "em atraso" ? "destructive" :
                                    est.estado === "bolseiro" ? "secondary" : "outline"
                                  }>
                                    {est.estado === "em dia" && <CheckCircle className="mr-1 h-3 w-3" />}
                                    {est.estado === "em atraso" && <AlertCircle className="mr-1 h-3 w-3" />}
                                    {est.estado}
                                    {est.atrasoDias && ` (${est.atrasoDias}d)`}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Button size="sm" variant="ghost">Registar Pagamento</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Aba: Estatísticas */}
                <TabsContent value="estatisticas">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Arrecadação por Mês</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {["Setembro", "Outubro", "Novembro"].map(mes => (
                            <div key={mes} className="flex items-center justify-between">
                              <span>{mes} 2025</span>
                              <span className="font-medium">Kz {(Math.random() * 5000000 + 2000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Resumo por Curso</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>Licenciatura em Informática</span>
                            <span className="font-medium">85% pago</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}