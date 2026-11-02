'use client';

import * as React from 'react';
import { toast } from 'sonner';
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
import { Plus, Edit, Trash2, Download, DollarSign, AlertCircle, CheckCircle, Clock, FileText, Loader2 } from "lucide-react";
import { financeService } from "@/lib/api/services/finance.service";
import type { TuitionPlan, AdditionalFee, FeeCharge } from "@/lib/api/services/finance.service";

// === Helpers de data (strings ISO YYYY-MM-DD) ===
const paraISO = (value?: string | null): string => (value ? String(value).slice(0, 10) : "");

const hojeISO = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const formatarData = (iso: string): string => {
  const s = paraISO(iso);
  if (!s) return "-";
  const [ano, mes, dia] = s.split("-");
  return `${dia}/${mes}/${ano}`;
};

const somarMeses = (iso: string, meses: number): string => {
  const [ano, mes, dia] = paraISO(iso).split("-").map(Number);
  if (!ano || !mes || !dia) return "";
  const d = new Date(ano, mes - 1 + meses, dia);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// Tipos
type Moeda = "AOA" | "USD" | "EUR";
type Periodo = "mensal" | "trimestral" | "semestral" | "anual";
type TipoEstudante = "novo" | "recorrente" | "transferido";
type EstadoPagamento = "em dia" | "em atraso";

interface Parcela {
  numero: number;
  valor: number;
  dataVencimento: string;
}

interface PlanoPropina {
  id: string;
  nome: string;
  periodo: Periodo;
  valorTotal: number;
  numeroParcelas: number;
  moeda: string;
  descontoPercentual?: number;
  multaAtrasoPercentual?: number;
  multaAtrasoFixa?: number;
  dataInicio: string;
  dataFim: string;
  cursosAssociados: string[];
  turmasAssociadas: string[];
  anosLetivos: string[];
  tiposEstudante: string[];
}

interface Estudante {
  id: string;
  nome: string;
  numero: string;
  curso: string;
  turma: string;
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
  moeda: string;
}

const moedas: Moeda[] = ["AOA", "USD", "EUR"];
const periodos: Periodo[] = ["mensal", "trimestral", "semestral", "anual"];
const tiposEstudante: TipoEstudante[] = ["novo", "recorrente", "transferido"];

const numParcelasMap: Record<Periodo, number> = {
  mensal: 12,
  trimestral: 4,
  semestral: 2,
  anual: 1,
};

const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// === Mapeadores API -> UI ===
const mapPlano = (p: TuitionPlan): PlanoPropina => ({
  id: p.id,
  nome: p.name,
  periodo: p.period,
  valorTotal: Number(p.total_amount) || 0,
  numeroParcelas: Number(p.installments) || 1,
  moeda: p.currency || "AOA",
  descontoPercentual: p.discount_percent != null ? Number(p.discount_percent) : undefined,
  multaAtrasoPercentual: p.late_fee_percent != null ? Number(p.late_fee_percent) : undefined,
  multaAtrasoFixa: p.late_fee_fixed != null ? Number(p.late_fee_fixed) : undefined,
  dataInicio: paraISO(p.start_date),
  dataFim: paraISO(p.end_date),
  cursosAssociados: p.course_ids || [],
  turmasAssociadas: p.class_ids || [],
  anosLetivos: p.academic_years || [],
  tiposEstudante: p.student_types || [],
});

const mapTaxa = (t: AdditionalFee): TaxaAdicional => ({
  id: t.id,
  nome: t.name,
  valor: Number(t.amount) || 0,
  moeda: t.currency || "AOA",
});

const formVazio = (): Partial<PlanoPropina> => ({
  nome: "",
  periodo: "mensal",
  valorTotal: 0,
  moeda: "AOA",
  dataInicio: hojeISO(),
  dataFim: hojeISO(),
  cursosAssociados: [],
  turmasAssociadas: [],
  anosLetivos: [],
  tiposEstudante: [],
});

// Agrupa débitos de propina por estudante (dados reais da API)
const derivarEstudantes = (cobrancas: FeeCharge[]): Estudante[] => {
  const hoje = hojeISO();
  const mapa = new Map<string, Estudante>();

  cobrancas
    .filter((c) => c.kind === "tuition")
    .forEach((c) => {
      const chave = c.student_id || c.student_name;
      const valor = Number(c.amount) || 0;
      const vencido = c.status === "overdue" || (c.status === "pending" && paraISO(c.due_date) < hoje);
      const atual: Estudante = mapa.get(chave) || {
        id: chave,
        nome: c.student_name,
        numero: c.student_number || "-",
        curso: c.course_name || "-",
        turma: c.class_name || "-",
        planoId: c.tuition_plan_id || "",
        estado: "em dia",
        valorPago: 0,
        valorPendente: 0,
      };

      if (c.status === "paid") {
        atual.valorPago += valor;
      } else if (c.status !== "waived") {
        atual.valorPendente += valor;
        if (vencido) {
          atual.estado = "em atraso";
          const dias = Math.floor((new Date(hoje).getTime() - new Date(paraISO(c.due_date)).getTime()) / 86400000);
          atual.atrasoDias = Math.max(atual.atrasoDias || 0, dias);
        }
      }
      mapa.set(chave, atual);
    });

  return Array.from(mapa.values());
};

export default function PropinasPage() {
  const [planos, setPlanos] = React.useState<PlanoPropina[]>([]);
  const [taxasAdicionais, setTaxasAdicionais] = React.useState<TaxaAdicional[]>([]);
  const [cobrancas, setCobrancas] = React.useState<FeeCharge[]>([]);
  const [carregando, setCarregando] = React.useState(true);
  const [salvando, setSalvando] = React.useState(false);

  const [planoEditando, setPlanoEditando] = React.useState<PlanoPropina | null>(null);
  const [dialogAberto, setDialogAberto] = React.useState(false);
  const [dialogTaxaAberto, setDialogTaxaAberto] = React.useState(false);
  const [formTaxa, setFormTaxa] = React.useState<{ nome: string; valor: number; moeda: Moeda }>({ nome: "", valor: 0, moeda: "AOA" });
  const [abaAtiva, setAbaAtiva] = React.useState("planos");

  const [formPlano, setFormPlano] = React.useState<Partial<PlanoPropina>>(formVazio());

  const estudantes = React.useMemo(() => derivarEstudantes(cobrancas), [cobrancas]);

  // Parcelas calculadas a partir do formulário
  const parcelasPreview = React.useMemo<Parcela[]>(() => {
    if (!formPlano.valorTotal || !formPlano.periodo || !formPlano.dataInicio) return [];
    const total = numParcelasMap[formPlano.periodo];
    const valorParcela = formPlano.valorTotal / total;
    const passo = 12 / total;
    return Array.from({ length: total }, (_, i) => ({
      numero: i + 1,
      valor: valorParcela,
      dataVencimento: somarMeses(formPlano.dataInicio as string, i * passo),
    }));
  }, [formPlano.valorTotal, formPlano.periodo, formPlano.dataInicio]);

  const carregarDados = React.useCallback(async () => {
    try {
      const [listaPlanos, listaTaxas, listaCobrancas] = await Promise.all([
        financeService.listTuitionPlans(),
        financeService.listAdditionalFees(),
        financeService.listFeeCharges(),
      ]);
      setPlanos(listaPlanos.map(mapPlano));
      setTaxasAdicionais(listaTaxas.map(mapTaxa));
      setCobrancas(listaCobrancas);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao carregar dados de propinas");
    } finally {
      setCarregando(false);
    }
  }, []);

  React.useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const resetForm = () => {
    setFormPlano(formVazio());
    setPlanoEditando(null);
  };

  const handleCriarPlano = async () => {
    if (!formPlano.nome?.trim()) {
      toast.error("Indique o nome do plano");
      return;
    }
    if (!formPlano.valorTotal || formPlano.valorTotal <= 0) {
      toast.error("Indique um valor total válido");
      return;
    }
    if (!formPlano.dataInicio || !formPlano.dataFim) {
      toast.error("Indique as datas de início e fim");
      return;
    }

    const periodo = (formPlano.periodo || "mensal") as Periodo;
    const payload: Partial<TuitionPlan> = {
      name: formPlano.nome.trim(),
      period: periodo,
      total_amount: Number(formPlano.valorTotal),
      installments: numParcelasMap[periodo],
      currency: formPlano.moeda || "AOA",
      discount_percent: formPlano.descontoPercentual ?? null,
      late_fee_percent: formPlano.multaAtrasoPercentual ?? null,
      late_fee_fixed: formPlano.multaAtrasoFixa ?? null,
      start_date: formPlano.dataInicio,
      end_date: formPlano.dataFim,
      course_ids: formPlano.cursosAssociados || [],
      class_ids: formPlano.turmasAssociadas || [],
      academic_years: formPlano.anosLetivos || [],
      student_types: formPlano.tiposEstudante || [],
    };

    setSalvando(true);
    try {
      if (planoEditando) {
        await financeService.updateTuitionPlan(planoEditando.id, payload);
        toast.success("Plano actualizado com sucesso");
      } else {
        await financeService.createTuitionPlan(payload);
        toast.success("Plano criado com sucesso");
      }
      resetForm();
      setDialogAberto(false);
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.message || "Erro ao guardar plano");
    } finally {
      setSalvando(false);
    }
  };

  const handleEditarPlano = (plano: PlanoPropina) => {
    setPlanoEditando(plano);
    setFormPlano({ ...plano });
    setDialogAberto(true);
  };

  const handleExcluirPlano = async (id: string) => {
    if (!window.confirm("Eliminar este plano de propinas?")) return;
    try {
      await financeService.deleteTuitionPlan(id);
      toast.success("Plano eliminado");
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.message || "Erro ao eliminar plano");
    }
  };

  const handleCriarTaxa = async () => {
    if (!formTaxa.nome.trim() || !formTaxa.valor || formTaxa.valor <= 0) {
      toast.error("Indique o nome e um valor válido");
      return;
    }
    setSalvando(true);
    try {
      await financeService.createAdditionalFee({
        name: formTaxa.nome.trim(),
        amount: Number(formTaxa.valor),
        currency: formTaxa.moeda,
      });
      toast.success("Taxa criada com sucesso");
      setFormTaxa({ nome: "", valor: 0, moeda: "AOA" });
      setDialogTaxaAberto(false);
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.message || "Erro ao criar taxa");
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluirTaxa = async (id: string) => {
    if (!window.confirm("Eliminar esta taxa?")) return;
    try {
      await financeService.deleteAdditionalFee(id);
      toast.success("Taxa eliminada");
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.message || "Erro ao eliminar taxa");
    }
  };

  const exportarCSV = () => {
    if (estudantes.length === 0) {
      toast.info("Sem dados para exportar");
      return;
    }
    const header = ["Número", "Nome", "Curso", "Turma", "Pago", "Pendente", "Estado"];
    const rows = estudantes.map((e) => [e.numero, e.nome, e.curso, e.turma, e.valorPago, e.valorPendente, e.estado]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `propinas_${hojeISO()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Resumo financeiro
  const totalArrecadado = estudantes.reduce((acc, e) => acc + e.valorPago, 0);
  const totalPendente = estudantes.reduce((acc, e) => acc + e.valorPendente, 0);
  const emAtraso = estudantes.filter((e) => e.estado === "em atraso").length;
  const taxaInadimplencia = estudantes.length > 0 ? ((emAtraso / estudantes.length) * 100).toFixed(1) : "0";

  // Estatísticas derivadas das cobranças pagas
  const arrecadacaoPorMes = React.useMemo(() => {
    const mapa = new Map<string, number>();
    cobrancas
      .filter((c) => c.kind === "tuition" && c.status === "paid")
      .forEach((c) => {
        const ref = paraISO(c.paid_at || c.due_date).slice(0, 7);
        if (!ref) return;
        mapa.set(ref, (mapa.get(ref) || 0) + (Number(c.amount) || 0));
      });
    return Array.from(mapa.entries()).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 6);
  }, [cobrancas]);

  const resumoPorCurso = React.useMemo(() => {
    const mapa = new Map<string, { pago: number; total: number }>();
    cobrancas
      .filter((c) => c.kind === "tuition" && c.status !== "waived")
      .forEach((c) => {
        const curso = c.course_name || "Sem curso";
        const atual = mapa.get(curso) || { pago: 0, total: 0 };
        const valor = Number(c.amount) || 0;
        atual.total += valor;
        if (c.status === "paid") atual.pago += valor;
        mapa.set(curso, atual);
      });
    return Array.from(mapa.entries()).map(([curso, v]) => ({
      curso,
      percentagem: v.total > 0 ? Math.round((v.pago / v.total) * 100) : 0,
    }));
  }, [cobrancas]);

  if (carregando) {
    return (
      <div className="p-6 flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> A carregar propinas...
      </div>
    );
  }

  return (
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
            <p className="text-xs text-muted-foreground">Propinas pagas</p>
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
                <Dialog
                  open={dialogAberto}
                  onOpenChange={(open) => {
                    setDialogAberto(open);
                    if (!open) resetForm();
                  }}
                >
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
                            onChange={(e) => setFormPlano((prev) => ({ ...prev, nome: e.target.value }))}
                            placeholder="ex: Plano Anual - Licenciatura"
                          />
                        </div>
                        <div>
                          <Label>Período</Label>
                          <Select
                            value={formPlano.periodo}
                            onValueChange={(v) => setFormPlano((prev) => ({ ...prev, periodo: v as Periodo }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {periodos.map((p) => (
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
                            onChange={(e) => setFormPlano((prev) => ({ ...prev, valorTotal: Number(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label>Moeda</Label>
                          <Select
                            value={formPlano.moeda}
                            onValueChange={(v) => setFormPlano((prev) => ({ ...prev, moeda: v }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {moedas.map((m) => (
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
                            value={formPlano.dataInicio || ""}
                            onChange={(e) => setFormPlano((prev) => ({ ...prev, dataInicio: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Data de Fim</Label>
                          <Input
                            type="date"
                            value={formPlano.dataFim || ""}
                            onChange={(e) => setFormPlano((prev) => ({ ...prev, dataFim: e.target.value }))}
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
                            value={formPlano.descontoPercentual ?? ""}
                            onChange={(e) => setFormPlano((prev) => ({ ...prev, descontoPercentual: e.target.value === "" ? undefined : Number(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label>Multa Atraso (%)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={formPlano.multaAtrasoPercentual ?? ""}
                            onChange={(e) => setFormPlano((prev) => ({ ...prev, multaAtrasoPercentual: e.target.value === "" ? undefined : Number(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label>Multa Fixa</Label>
                          <Input
                            type="number"
                            min="0"
                            value={formPlano.multaAtrasoFixa ?? ""}
                            onChange={(e) => setFormPlano((prev) => ({ ...prev, multaAtrasoFixa: e.target.value === "" ? undefined : Number(e.target.value) }))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Tipos de Estudante</Label>
                        <div className="flex gap-2 mt-2">
                          {tiposEstudante.map((tipo) => (
                            <Button
                              key={tipo}
                              type="button"
                              variant={formPlano.tiposEstudante?.includes(tipo) ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                setFormPlano((prev) => ({
                                  ...prev,
                                  tiposEstudante: prev.tiposEstudante?.includes(tipo)
                                    ? prev.tiposEstudante.filter((t) => t !== tipo)
                                    : [...(prev.tiposEstudante || []), tipo],
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
                          onChange={(e) => setFormPlano((prev) => ({ ...prev, cursosAssociados: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
                        />
                      </div>

                      <div>
                        <Label>Turmas Associadas</Label>
                        <Input
                          placeholder="ex: INFO-2025-A, GEST-2025-B"
                          value={formPlano.turmasAssociadas?.join(", ") || ""}
                          onChange={(e) => setFormPlano((prev) => ({ ...prev, turmasAssociadas: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
                        />
                      </div>

                      <div>
                        <Label>Anos Letivos</Label>
                        <Input
                          placeholder="ex: 2025/2026"
                          value={formPlano.anosLetivos?.join(", ") || ""}
                          onChange={(e) => setFormPlano((prev) => ({ ...prev, anosLetivos: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
                        />
                      </div>

                      {parcelasPreview.length > 0 && (
                        <div>
                          <Label>Parcelas Geradas ({parcelasPreview.length})</Label>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Parcela</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Vencimento</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {parcelasPreview.map((p) => (
                                <TableRow key={p.numero}>
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
                      <Button variant="outline" onClick={() => { resetForm(); setDialogAberto(false); }} disabled={salvando}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCriarPlano} disabled={salvando}>
                        {salvando && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
                    {planos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Nenhum plano de propinas criado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      planos.map((plano) => (
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
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Taxas Adicionais */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Outras Taxas</CardTitle>
                  <CardDescription>Matrícula, cartão, declarações, etc.</CardDescription>
                </div>
                <Dialog open={dialogTaxaAberto} onOpenChange={setDialogTaxaAberto}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" /> Nova Taxa
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nova Taxa</DialogTitle>
                      <DialogDescription>Adicione uma taxa avulsa (matrícula, declaração, etc.)</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label>Nome</Label>
                        <Input
                          value={formTaxa.nome}
                          onChange={(e) => setFormTaxa((prev) => ({ ...prev, nome: e.target.value }))}
                          placeholder="ex: Taxa de Matrícula"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Valor</Label>
                          <Input
                            type="number"
                            min="0"
                            value={formTaxa.valor || ""}
                            onChange={(e) => setFormTaxa((prev) => ({ ...prev, valor: Number(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label>Moeda</Label>
                          <Select
                            value={formTaxa.moeda}
                            onValueChange={(v) => setFormTaxa((prev) => ({ ...prev, moeda: v as Moeda }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {moedas.map((m) => (
                                <SelectItem key={m} value={m}>{m}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDialogTaxaAberto(false)} disabled={salvando}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCriarTaxa} disabled={salvando}>
                        {salvando && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Criar Taxa
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {taxasAdicionais.length === 0 ? (
                  <p className="text-center py-6 text-muted-foreground">Nenhuma taxa adicional configurada.</p>
                ) : (
                  taxasAdicionais.map((taxa) => (
                    <div key={taxa.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{taxa.nome}</p>
                        <p className="text-sm text-muted-foreground">{taxa.valor.toLocaleString()} {taxa.moeda}</p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => handleExcluirTaxa(taxa.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))
                )}
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
                  <CardDescription>Calculado a partir dos débitos de propina</CardDescription>
                </div>
                <Button variant="outline" onClick={exportarCSV}>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estudantes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Sem débitos de propina registados.
                        </TableCell>
                      </TableRow>
                    ) : (
                      estudantes.map((est) => (
                        <TableRow key={est.id}>
                          <TableCell>{est.numero}</TableCell>
                          <TableCell className="font-medium">{est.nome}</TableCell>
                          <TableCell>{est.curso} / {est.turma}</TableCell>
                          <TableCell>{planos.find((p) => p.id === est.planoId)?.nome || "-"}</TableCell>
                          <TableCell>{est.valorPago.toLocaleString()} AOA</TableCell>
                          <TableCell>{est.valorPendente.toLocaleString()} AOA</TableCell>
                          <TableCell>
                            <Badge variant={est.estado === "em dia" ? "default" : "destructive"}>
                              {est.estado === "em dia" && <CheckCircle className="mr-1 h-3 w-3" />}
                              {est.estado === "em atraso" && <AlertCircle className="mr-1 h-3 w-3" />}
                              {est.estado}
                              {est.atrasoDias ? ` (${est.atrasoDias}d)` : ""}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
                {arrecadacaoPorMes.length === 0 ? (
                  <p className="text-center py-6 text-muted-foreground">Sem pagamentos de propinas registados.</p>
                ) : (
                  <div className="space-y-4">
                    {arrecadacaoPorMes.map(([ref, valor]) => {
                      const [ano, mes] = ref.split("-");
                      return (
                        <div key={ref} className="flex items-center justify-between">
                          <span>{mesesNomes[Number(mes) - 1]} {ano}</span>
                          <span className="font-medium">{valor.toLocaleString("pt-AO")} AOA</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo por Curso</CardTitle>
              </CardHeader>
              <CardContent>
                {resumoPorCurso.length === 0 ? (
                  <p className="text-center py-6 text-muted-foreground">Sem dados por curso.</p>
                ) : (
                  <div className="space-y-4">
                    {resumoPorCurso.map((r) => (
                      <div key={r.curso} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>{r.curso}</span>
                          <span className="font-medium">{r.percentagem}% pago</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${r.percentagem}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
