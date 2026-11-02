'use client';

import { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Download, Plus, AlertCircle, Clock, CheckCircle, Loader2, Trash2, Check } from "lucide-react";
import { financeService } from "@/lib/api/services/finance.service";
import type { FeeCharge } from "@/lib/api/services/finance.service";

// === Datas como strings ISO YYYY-MM-DD ===
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

const formatarKz = (valor: number): string =>
  valor.toLocaleString("pt-AO", { style: "currency", currency: "AOA" });

// === Tipos ===
type Kind = FeeCharge["kind"];

interface Debito {
  id: string;
  estudanteId: string;
  estudanteNome: string;
  numero: string;
  curso: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  estado: "pending" | "paid" | "overdue" | "waived";
  tipo: Kind;
  dataPagamento?: string;
  emAtraso: boolean;
}

const kindLabels: Record<Kind, string> = {
  tuition: "Propina",
  fine: "Multa",
  fee: "Taxa",
  other: "Outro",
};

const mapDebito = (c: FeeCharge): Debito => {
  const vencimento = paraISO(c.due_date);
  return {
    id: c.id,
    estudanteId: c.student_id || c.student_name,
    estudanteNome: c.student_name,
    numero: c.student_number || "-",
    curso: c.course_name || "-",
    descricao: c.description,
    valor: Number(c.amount) || 0,
    dataVencimento: vencimento,
    estado: c.status,
    tipo: c.kind,
    dataPagamento: c.paid_at ? paraISO(c.paid_at) : undefined,
    emAtraso: c.status === "overdue" || (c.status === "pending" && vencimento !== "" && vencimento < hojeISO()),
  };
};

const estaAberto = (d: Debito) => d.estado === "pending" || d.estado === "overdue";

const formVazio = () => ({
  studentName: "",
  studentNumber: "",
  courseName: "",
  kind: "fine" as Kind,
  description: "",
  amount: "",
  dueDate: hojeISO(),
});

export default function DebitosEMultas() {
  const [debitos, setDebitos] = useState<Debito[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [filtro, setFiltro] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [detalheEstudanteId, setDetalheEstudanteId] = useState<string | null>(null);

  const [dialogAberto, setDialogAberto] = useState(false);
  const [form, setForm] = useState(formVazio());

  const carregarDados = useCallback(async () => {
    try {
      const lista = await financeService.listFeeCharges();
      setDebitos(lista.map(mapDebito));
    } catch (err: any) {
      toast.error(err?.message || "Erro ao carregar débitos");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  // === Filtro ===
  const debitosFiltrados = useMemo(() => {
    const busca = filtro.toLowerCase();
    return debitos.filter((d) => {
      const matchBusca =
        d.estudanteNome.toLowerCase().includes(busca) ||
        d.numero.toLowerCase().includes(busca) ||
        d.descricao.toLowerCase().includes(busca);
      if (!matchBusca) return false;

      switch (filtroEstado) {
        case "pendente":
          return estaAberto(d) && !d.emAtraso;
        case "atrasado":
          return estaAberto(d) && d.emAtraso;
        case "multado":
          return d.tipo === "fine" && estaAberto(d);
        case "pago":
          return d.estado === "paid";
        default:
          return true;
      }
    });
  }, [debitos, filtro, filtroEstado]);

  // === Estatísticas ===
  const estatisticas = useMemo(() => {
    const abertos = debitos.filter(estaAberto);
    const totalDevedores = new Set(abertos.map((d) => d.estudanteId)).size;
    const totalDivida = abertos.reduce((acc, d) => acc + d.valor, 0);
    const totalMultas = abertos.filter((d) => d.tipo === "fine").reduce((acc, d) => acc + d.valor, 0);
    const mesAtual = hojeISO().slice(0, 7);
    const totalRecuperado = debitos
      .filter((d) => d.estado === "paid" && (d.dataPagamento || "").slice(0, 7) === mesAtual)
      .reduce((acc, d) => acc + d.valor, 0);

    return { totalDevedores, totalDivida, totalMultas, totalRecuperado };
  }, [debitos]);

  const debitosDoEstudante = useMemo(
    () => (detalheEstudanteId ? debitos.filter((d) => d.estudanteId === detalheEstudanteId) : []),
    [debitos, detalheEstudanteId]
  );
  const estudanteDetalhe = debitosDoEstudante[0];
  const totalAbertoEstudante = debitosDoEstudante.filter(estaAberto).reduce((acc, d) => acc + d.valor, 0);

  // === Ações ===
  const criarDebito = async () => {
    const valor = Number(form.amount);
    if (!form.studentName.trim()) {
      toast.error("Indique o nome do estudante");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Indique a descrição");
      return;
    }
    if (!valor || valor <= 0) {
      toast.error("Indique um valor válido");
      return;
    }
    if (!form.dueDate) {
      toast.error("Indique a data de vencimento");
      return;
    }

    setSalvando(true);
    try {
      await financeService.createFeeCharge({
        student_name: form.studentName.trim(),
        student_number: form.studentNumber.trim() || null,
        course_name: form.courseName.trim() || null,
        description: form.description.trim(),
        amount: valor,
        due_date: form.dueDate,
        kind: form.kind,
        status: "pending",
      });
      toast.success("Débito criado com sucesso");
      setForm(formVazio());
      setDialogAberto(false);
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.message || "Erro ao criar débito");
    } finally {
      setSalvando(false);
    }
  };

  const marcarComoPago = async (debito: Debito) => {
    try {
      await financeService.markFeeChargePaid(debito.id);
      toast.success("Débito marcado como pago");
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.message || "Erro ao marcar como pago");
    }
  };

  const eliminarDebito = async (debito: Debito) => {
    if (!window.confirm(`Eliminar o débito "${debito.descricao}"?`)) return;
    try {
      await financeService.deleteFeeCharge(debito.id);
      toast.success("Débito eliminado");
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.message || "Erro ao eliminar débito");
    }
  };

  // === Exportar CSV ===
  const exportarCSV = () => {
    if (debitosFiltrados.length === 0) {
      toast.info("Sem dados para exportar");
      return;
    }
    const header = ["Estudante", "Número", "Curso", "Descrição", "Tipo", "Valor (Kz)", "Vencimento", "Estado"];
    const rows = debitosFiltrados.map((d) => [
      d.estudanteNome,
      d.numero,
      d.curso,
      d.descricao,
      kindLabels[d.tipo],
      d.valor.toFixed(2),
      d.dataVencimento,
      d.emAtraso ? "overdue" : d.estado,
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `devedores_${hojeISO()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getEstadoBadge = (d: Debito) => {
    if (d.estado === "paid") return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
    if (d.estado === "waived") return <Badge variant="outline">Isento</Badge>;
    if (d.emAtraso) return <Badge variant="destructive">Em atraso</Badge>;
    return <Badge variant="secondary">Pendente</Badge>;
  };

  if (carregando) {
    return (
      <div className="p-6 flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> A carregar débitos...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Débitos e Multas</h1>
        <p className="text-muted-foreground">
          Controle de dívidas, multas e taxas pendentes de pagamento.
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devedores</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.totalDevedores}</div>
            <p className="text-xs text-muted-foreground">Com pendências</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dívida Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarKz(estatisticas.totalDivida)}</div>
            <p className="text-xs text-muted-foreground">Pendente e em atraso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Multas</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatarKz(estatisticas.totalMultas)}</div>
            <p className="text-xs text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recuperado (Mês)</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatarKz(estatisticas.totalRecuperado)}</div>
            <p className="text-xs text-muted-foreground">Débitos liquidados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Ações */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar estudante, número ou descrição..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filtroEstado} onValueChange={setFiltroEstado}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
              <SelectItem value="atrasado">Em atraso</SelectItem>
              <SelectItem value="multado">Com multa</SelectItem>
              <SelectItem value="pago">Pagos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportarCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Dialog
            open={dialogAberto}
            onOpenChange={(open) => {
              setDialogAberto(open);
              if (!open) setForm(formVazio());
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Novo Débito / Multa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registar Débito ou Multa</DialogTitle>
                <DialogDescription>Crie uma cobrança pendente para um estudante.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Tipo</Label>
                  <Select value={form.kind} onValueChange={(v) => setForm((p) => ({ ...p, kind: v as Kind }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fine">Multa</SelectItem>
                      <SelectItem value="tuition">Propina</SelectItem>
                      <SelectItem value="fee">Taxa</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Estudante</Label>
                  <Input
                    placeholder="Nome do estudante"
                    value={form.studentName}
                    onChange={(e) => setForm((p) => ({ ...p, studentName: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Nº Estudante (opcional)</Label>
                    <Input
                      value={form.studentNumber}
                      onChange={(e) => setForm((p) => ({ ...p, studentNumber: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Curso (opcional)</Label>
                    <Input
                      value={form.courseName}
                      onChange={(e) => setForm((p) => ({ ...p, courseName: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Descrição</Label>
                  <Input
                    placeholder="ex: Atraso no pagamento de Outubro"
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Valor (Kz)</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="5000"
                      value={form.amount}
                      onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Data de Vencimento</Label>
                    <Input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogAberto(false)} disabled={salvando}>
                  Cancelar
                </Button>
                <Button onClick={criarDebito} disabled={salvando}>
                  {salvando && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Registar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudante</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data Limite</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {debitosFiltrados.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhum débito encontrado.
                    </TableCell>
                  </TableRow>
                )}
                {debitosFiltrados.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{d.estudanteNome}</p>
                        <p className="text-xs text-muted-foreground">{d.numero}</p>
                      </div>
                    </TableCell>
                    <TableCell>{d.descricao}</TableCell>
                    <TableCell>{formatarKz(d.valor)}</TableCell>
                    <TableCell>
                      <Badge variant={d.tipo === "fine" ? "destructive" : "secondary"}>{kindLabels[d.tipo]}</Badge>
                    </TableCell>
                    <TableCell>{formatarData(d.dataVencimento)}</TableCell>
                    <TableCell>{getEstadoBadge(d)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setDetalheEstudanteId(d.estudanteId)}>
                          Detalhes
                        </Button>
                        {estaAberto(d) && (
                          <Button variant="ghost" size="sm" onClick={() => marcarComoPago(d)}>
                            <Check className="mr-1 h-4 w-4" />
                            Pago
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => eliminarDebito(d)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detalhe por estudante */}
      <Sheet open={!!detalheEstudanteId} onOpenChange={(open) => !open && setDetalheEstudanteId(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Débitos de {estudanteDetalhe?.estudanteNome}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-3">
            {debitosDoEstudante.map((d) => (
              <div key={d.id} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="font-medium">{d.descricao}</p>
                    <p className="text-sm text-muted-foreground">
                      {kindLabels[d.tipo]} • Vence em {formatarData(d.dataVencimento)}
                    </p>
                    <div className="mt-1">{getEstadoBadge(d)}</div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatarKz(d.valor)}</p>
                    {estaAberto(d) && (
                      <Button size="sm" className="mt-2" onClick={() => marcarComoPago(d)}>
                        <Check className="mr-1 h-3 w-3" />
                        Marcar pago
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total a Pagar</span>
                <span>{formatarKz(totalAbertoEstudante)}</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
