'use client';

import { useState, useMemo } from "react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import { Search, Bell, Download, Plus, AlertCircle, Clock, CheckCircle } from "lucide-react";

// === Funções de data sem date-fns ===
const formatarData = (date: Date): string => {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const formatarDataExtenso = (date: Date): string => {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  return `${date.getDate()} ${meses[date.getMonth()]} ${date.getFullYear()}`;
};

const calcularDiasAtraso = (vencimento: Date): number => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const diff = hoje.getTime() - vencimento.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

// === Tipos ===
interface Parcela {
  id: string;
  valor: number;
  dataVencimento: Date;
  pago: boolean;
  dataPagamento?: Date;
  motivo: string;
}

interface Multa {
  id: string;
  tipo: string;
  valor: number;
  dataAplicacao: Date;
  dataVencimento: Date;
  motivo: string;
}

interface EstudanteDebito {
  id: string;
  nome: string;
  numero: string;
  curso: string;
  parcelas: Parcela[];
  multas: Multa[];
}

// === Dados de exemplo ===
const dadosExemplo: EstudanteDebito[] = [
  {
    id: "1",
    nome: "Maria José Silva",
    numero: "2023001",
    curso: "Engenharia Informática",
    parcelas: [
      { id: "p1", valor: 45000, dataVencimento: new Date(2025, 9, 15), pago: false, motivo: "Propina - Outubro" },
      { id: "p2", valor: 45000, dataVencimento: new Date(2025, 8, 10), pago: false, motivo: "Propina - Setembro" },
    ],
    multas: [
      { id: "m1", tipo: "Atraso", valor: 5000, dataAplicacao: new Date(2025, 9, 20), dataVencimento: new Date(2025, 10, 5), motivo: "Atraso > 5 dias" },
    ],
  },
  {
    id: "2",
    nome: "João Pedro Mendes",
    numero: "2023002",
    curso: "Direito",
    parcelas: [
      { id: "p3", valor: 35000, dataVencimento: new Date(2025, 9, 30), pago: false, motivo: "Propina - Outubro" },
    ],
    multas: [],
  },
  {
    id: "3",
    nome: "Ana Luísa Costa",
    numero: "2023003",
    curso: "Medicina",
    parcelas: [],
    multas: [
      { id: "m2", tipo: "Documento", valor: 10000, dataAplicacao: new Date(2025, 10, 1), dataVencimento: new Date(2025, 11, 1), motivo: "Perda de cartão de estudante" },
    ],
  },
];

// Taxa de juros por dia de atraso
const TAXA_JUROS_DIA = 0.005; // 0.5% ao dia

export default function DebitosEMultas() {
  const [estudantes] = useState(dadosExemplo);
  const [filtro, setFiltro] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [detalheEstudante, setDetalheEstudante] = useState<EstudanteDebito | null>(null);

  // === Cálculo de dívida com juros ===
  const calcularDividaComJuros = (estudante: EstudanteDebito) => {
    let totalParcelas = 0;
    let totalMultas = estudante.multas.reduce((acc, m) => acc + m.valor, 0);

    estudante.parcelas.forEach(parcela => {
      if (!parcela.pago) {
        const diasAtraso = calcularDiasAtraso(parcela.dataVencimento);
        const juros = parcela.valor * TAXA_JUROS_DIA * diasAtraso;
        totalParcelas += parcela.valor + juros;
      }
    });

    return {
      parcelas: totalParcelas,
      multas: totalMultas,
      total: totalParcelas + totalMultas,
    };
  };

  // === Filtro de estudantes ===
  const estudantesFiltrados = useMemo(() => {
    return estudantes.filter(est => {
      const busca = filtro.toLowerCase();
      const matchNome = est.nome.toLowerCase().includes(busca);
      const matchNumero = est.numero.includes(busca);
      const divida = calcularDividaComJuros(est);
      const temDivida = divida.total > 0;

      if (filtroEstado === "atrasado") return temDivida && divida.parcelas > 0;
      if (filtroEstado === "multado") return divida.multas > 0;
      return (matchNome || matchNumero) && temDivida;
    });
  }, [estudantes, filtro, filtroEstado]);

  // === Estatísticas ===
  const estatisticas = useMemo(() => {
    const totalDevedores = estudantesFiltrados.length;
    const totalDivida = estudantesFiltrados.reduce((acc, est) => acc + calcularDividaComJuros(est).total, 0);
    const totalMultas = estudantesFiltrados.reduce((acc, est) => acc + calcularDividaComJuros(est).multas, 0);
    const totalRecuperado = 1250000; // Simulado (pode vir da API)

    return { totalDevedores, totalDivida, totalMultas, totalRecuperado };
  }, [estudantesFiltrados]);

  // === Exportar CSV ===
  const exportarCSV = () => {
    const header = ["Estudante", "Número", "Curso", "Dívida (Kz)", "Multas (Kz)", "Total (Kz)"];
    const rows = estudantesFiltrados.map(est => {
      const divida = calcularDividaComJuros(est);
      return [
        est.nome,
        est.numero,
        est.curso,
        divida.parcelas.toFixed(2),
        divida.multas.toFixed(2),
        divida.total.toFixed(2)
      ];
    });

    const csv = [header, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `devedores_${formatarData(new Date()).replace(/\//g, "-")}.csv`;
    link.click();
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
          <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
            <NavbarH />

            <div className="flex flex-col gap-6">
              {/* Título */}
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Débitos e Multas</h1>
                <p className="text-muted-foreground">
                  Controle de dívidas, multas e lembretes automáticos de pagamento.
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
                    <div className="text-2xl font-bold">
                      {estatisticas.totalDivida.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}
                    </div>
                    <p className="text-xs text-muted-foreground">Inclui juros</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Multas</CardTitle>
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      {estatisticas.totalMultas.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}
                    </div>
                    <p className="text-xs text-muted-foreground">Pendentes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recuperado (Mês)</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {estatisticas.totalRecuperado.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}
                    </div>
                    <p className="text-xs text-muted-foreground">Pagamentos recebidos</p>
                  </CardContent>
                </Card>
              </div>

              {/* Filtros e Ações */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar estudante ou número..."
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
                      <SelectItem value="atrasado">Em atraso</SelectItem>
                      <SelectItem value="multado">Com multa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={exportarCSV}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Nova Multa
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Aplicar Nova Multa</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label>Tipo de Multa</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="atraso">Atraso no Pagamento</SelectItem>
                              <SelectItem value="documento">Perda de Documento</SelectItem>
                              <SelectItem value="comportamento">Comportamento</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Valor (Kz)</Label>
                          <Input type="number" placeholder="5000" />
                        </div>
                        <div className="grid gap-2">
                          <Label>Data de Vencimento</Label>
                          <Input type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label>Estudante(s)</Label>
                          <Input placeholder="Nome ou número" />
                        </div>
                        <Button className="mt-2">Aplicar Multa</Button>
                      </div>
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
                          <TableHead>Valor em Dívida</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Data Limite</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {estudantesFiltrados.map((estudante) => {
                          const divida = calcularDividaComJuros(estudante);
                          const ultimaParcela = estudante.parcelas
                            .filter(p => !p.pago)
                            .sort((a, b) => a.dataVencimento.getTime() - b.dataVencimento.getTime())[0];

                          return (
                            <TableRow key={estudante.id}>
                              <TableCell className="font-medium">
                                <div>
                                  <p>{estudante.nome}</p>
                                  <p className="text-xs text-muted-foreground">{estudante.numero}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                {divida.total.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}
                              </TableCell>
                              <TableCell>
                                {estudante.multas.length > 0 ? (
                                  <Badge variant="destructive">Multa</Badge>
                                ) : (
                                  <Badge variant="secondary">Propina</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {ultimaParcela
                                  ? formatarData(ultimaParcela.dataVencimento)
                                  : "-"}
                              </TableCell>
                              <TableCell>
                                <Badge variant="destructive">Pendente</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Sheet>
                                    <SheetTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setDetalheEstudante(estudante)}
                                      >
                                        Detalhes
                                      </Button>
                                    </SheetTrigger>
                                    <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                                      <SheetHeader>
                                        <SheetTitle>Dívida de {detalheEstudante?.nome}</SheetTitle>
                                      </SheetHeader>
                                      {detalheEstudante && detalheEstudante.id === estudante.id && (
                                        <div className="mt-6 space-y-6">
                                          {/* Parcelas */}
                                          {detalheEstudante.parcelas.filter(p => !p.pago).length > 0 && (
                                            <div>
                                              <h4 className="font-semibold mb-3">Parcelas em Aberto</h4>
                                              {detalheEstudante.parcelas
                                                .filter(p => !p.pago)
                                                .map(parcela => {
                                                  const diasAtraso = calcularDiasAtraso(parcela.dataVencimento);
                                                  const juros = parcela.valor * TAXA_JUROS_DIA * diasAtraso;
                                                  return (
                                                    <div key={parcela.id} className="p-3 bg-muted rounded-lg mb-2">
                                                      <div className="flex justify-between">
                                                        <div>
                                                          <p className="font-medium">{parcela.motivo}</p>
                                                          <p className="text-sm text-muted-foreground">
                                                            Venceu em {formatarData(parcela.dataVencimento)}
                                                            {diasAtraso > 0 && ` • ${diasAtraso} dias de atraso`}
                                                          </p>
                                                        </div>
                                                        <div className="text-right">
                                                          <p className="font-semibold">
                                                            {(parcela.valor + juros).toLocaleString("pt-AO", {
                                                              style: "currency",
                                                              currency: "AOA",
                                                            })}
                                                          </p>
                                                          {juros > 0 && (
                                                            <p className="text-xs text-red-600">
                                                              + {juros.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })} juros
                                                            </p>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                            </div>
                                          )}

                                          {/* Multas */}
                                          {detalheEstudante.multas.length > 0 && (
                                            <div>
                                              <h4 className="font-semibold mb-3">Multas Aplicadas</h4>
                                              {detalheEstudante.multas.map(multa => (
                                                <div key={multa.id} className="p-3 bg-red-50 dark:bg-red-950 rounded-lg mb-2">
                                                  <div className="flex justify-between">
                                                    <div>
                                                      <p className="font-medium">{multa.tipo}</p>
                                                      <p className="text-sm text-muted-foreground">
                                                        {multa.motivo} • Vence em {formatarData(multa.dataVencimento)}
                                                      </p>
                                                    </div>
                                                    <p className="font-semibold text-red-600">
                                                      {multa.valor.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}
                                                    </p>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          )}

                                          {/* Total */}
                                          <div className="border-t pt-4">
                                            <div className="flex justify-between text-lg font-bold">
                                              <span>Total a Pagar</span>
                                              <span>
                                                {calcularDividaComJuros(detalheEstudante).total.toLocaleString("pt-AO", {
                                                  style: "currency",
                                                  currency: "AOA",
                                                })}
                                              </span>
                                            </div>
                                          </div>

                                          <Button className="w-full" size="lg">
                                            <Bell className="mr-2 h-4 w-4" />
                                            Enviar Lembrete Automático
                                          </Button>
                                        </div>
                                      )}
                                    </SheetContent>
                                  </Sheet>

                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => alert(`Lembrete enviado para ${estudante.nome}`)}
                                  >
                                    <Bell className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}