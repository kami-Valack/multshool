"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  DollarSign,
  AlertCircle,
  Clock,
  FileText,
  Receipt,
  RefreshCw,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
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
import { financeService } from "@/lib/api/services/finance.service";
import type { FinanceSummary } from "@/lib/api/services/finance.service";

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const formatarKz = (valor: number): string =>
  `${Number(valor || 0).toLocaleString("pt-AO")} AOA`;

export default function RelatoriosFinanceiros() {
  const [resumo, setResumo] = useState<FinanceSummary | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const carregar = useCallback(async (manual = false) => {
    if (manual) setAtualizando(true);
    try {
      const data = await financeService.getSummary();
      setResumo({
        payments_total: Number(data.payments_total) || 0,
        payments_count: Number(data.payments_count) || 0,
        pending_charges_total: Number(data.pending_charges_total) || 0,
        overdue_charges_total: Number(data.overdue_charges_total) || 0,
        charges_count: Number(data.charges_count) || 0,
        invoices_count: Number(data.invoices_count) || 0,
      });
      if (manual) toast.success("Relatório actualizado");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao carregar relatório financeiro");
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const exportToCSV = () => {
    if (!resumo) return;
    const csv = [
      ["Indicador", "Valor"],
      ["Total Recebido (AOA)", resumo.payments_total],
      ["Nº de Pagamentos", resumo.payments_count],
      ["Pendente (AOA)", resumo.pending_charges_total],
      ["Em Atraso (AOA)", resumo.overdue_charges_total],
      ["Nº de Débitos", resumo.charges_count],
      ["Nº de Faturas/Recibos", resumo.invoices_count],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `relatorio_financeiro_${formatDate(new Date())}.csv`);
  };

  if (carregando) {
    return (
      <div className="p-6 flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> A carregar relatório...
      </div>
    );
  }

  if (!resumo) {
    return (
      <div className="p-6 space-y-4 text-center py-24">
        <p className="text-muted-foreground">Não foi possível carregar o relatório financeiro.</p>
        <Button variant="outline" onClick={() => carregar(true)}>
          <RefreshCw className="w-4 h-4 mr-2" /> Tentar novamente
        </Button>
      </div>
    );
  }

  const totalEmAberto = resumo.pending_charges_total + resumo.overdue_charges_total;
  const totalFaturado = resumo.payments_total + totalEmAberto;
  const taxaCobranca = totalFaturado > 0 ? (resumo.payments_total / totalFaturado) * 100 : 0;

  const dadosBarras = [
    { nome: "Recebido", valor: resumo.payments_total },
    { nome: "Pendente", valor: resumo.pending_charges_total },
    { nome: "Em atraso", valor: resumo.overdue_charges_total },
  ];

  const dadosPie = [
    { name: "Recebido", value: resumo.payments_total, color: "#10b981" },
    { name: "Pendente", value: resumo.pending_charges_total, color: "#f59e0b" },
    { name: "Em atraso", value: resumo.overdue_charges_total, color: "#ef4444" },
  ].filter((d) => d.value > 0);

  const semDados =
    resumo.payments_count === 0 &&
    resumo.charges_count === 0 &&
    resumo.invoices_count === 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios Financeiros</h1>
          <p className="text-muted-foreground">Resumo geral de recebimentos, pendências e documentos.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => carregar(true)} disabled={atualizando}>
            <RefreshCw className={`w-4 h-4 mr-1 ${atualizando ? "animate-spin" : ""}`} /> Actualizar
          </Button>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-1" /> CSV
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarKz(resumo.payments_total)}</div>
            <p className="text-xs text-muted-foreground">{resumo.payments_count} pagamento(s)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarKz(resumo.pending_charges_total)}</div>
            <p className="text-xs text-muted-foreground">A receber</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Atraso</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatarKz(resumo.overdue_charges_total)}</div>
            <p className="text-xs text-muted-foreground">Débitos vencidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Cobrança</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxaCobranca.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Recebido / total cobrado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Débitos Registados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumo.charges_count}</div>
            <p className="text-xs text-muted-foreground">Total em aberto: {formatarKz(totalEmAberto)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturas e Recibos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumo.invoices_count}</div>
            <p className="text-xs text-muted-foreground">Documentos emitidos</p>
          </CardContent>
        </Card>
      </div>

      {semDados ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Ainda não existem dados financeiros para apresentar.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recebido vs Pendente</CardTitle>
              <CardDescription>Valores em AOA</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosBarras}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()} AOA`} />
                  <Legend />
                  <Bar dataKey="valor" name="Valor" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição</CardTitle>
              <CardDescription>Recebido, pendente e em atraso</CardDescription>
            </CardHeader>
            <CardContent>
              {dadosPie.length === 0 ? (
                <p className="text-center py-12 text-muted-foreground">Sem valores para apresentar.</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dadosPie}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {dadosPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} AOA`} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
