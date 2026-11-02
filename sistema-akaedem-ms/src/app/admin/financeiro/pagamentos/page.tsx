'use client';

import { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Search, Filter, MoreVertical, Check, FileText, Receipt, Plus, User, Loader2, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { financeService } from "@/lib/api/services/finance.service";
import type { Payment, FeeCharge } from "@/lib/api/services/finance.service";

type TipoPagamento = "propina" | "exame" | "declaracao" | "outro";

interface Estudante {
  id: string;
  nome: string;
  curso: string;
  turma: string;
  numero: string;
}

interface Divida {
  id: string;
  tipo: TipoPagamento;
  descricao: string;
  valor: number;
  dataVencimento: string;
  paga: boolean;
}

interface Pagamento {
  id: string;
  recibo: string;
  estudanteId: string;
  estudanteNome: string;
  curso: string;
  turma: string;
  tipo: string;
  valor: number;
  metodo: string;
  estado: string;
  data: string;
  observacoes?: string;
}

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

const mapEstado = (status: Payment["status"]): string => {
  switch (status) {
    case "paid": return "pago";
    case "pending": return "pendente";
    case "failed": return "rejeitado";
    case "refunded": return "reembolsado";
    default: return String(status);
  }
};

const mapPagamento = (p: Payment): Pagamento => ({
  id: p.id,
  recibo: p.receipt_number,
  estudanteId: p.student_id || "",
  estudanteNome: p.student_name,
  curso: p.course_name || "-",
  turma: p.class_name || "-",
  tipo: p.type,
  valor: Number(p.amount) || 0,
  metodo: p.method,
  estado: mapEstado(p.status),
  data: paraISO(p.paid_at),
  observacoes: p.notes || undefined,
});

const tipoDeCobranca = (kind: FeeCharge["kind"]): TipoPagamento => (kind === "tuition" ? "propina" : "outro");

const metodoLabels: Record<string, string> = {
  cash: "Numerário",
  transferencia: "Transferência",
  multicaixa: "Multicaixa",
  online: "Online",
  outro: "Outro",
};

const formManualVazio = () => ({
  nome: "",
  tipo: "propina" as TipoPagamento,
  valor: "",
  descricao: "",
  data: hojeISO(),
});

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [cobrancas, setCobrancas] = useState<FeeCharge[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [modalNovoOpen, setModalNovoOpen] = useState(false);
  const [modalDetalheOpen, setModalDetalheOpen] = useState(false);
  const [selectedPagamento, setSelectedPagamento] = useState<Pagamento | null>(null);
  const [selectedEstudante, setSelectedEstudante] = useState<Estudante | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCurso, setFiltroCurso] = useState<string>("todos");
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchEstudante, setSearchEstudante] = useState("");

  const [formMetodo, setFormMetodo] = useState<string>("cash");
  const [formManual, setFormManual] = useState(formManualVazio());

  const carregarDados = useCallback(async () => {
    try {
      const [listaPagamentos, listaCobrancas] = await Promise.all([
        financeService.listPayments(),
        financeService.listFeeCharges(),
      ]);
      setPagamentos(listaPagamentos.map(mapPagamento));
      setCobrancas(listaCobrancas);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao carregar pagamentos");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  // Estudantes e dívidas derivados dos débitos reais da API
  const estudantes = useMemo<Estudante[]>(() => {
    const mapa = new Map<string, Estudante>();
    cobrancas.forEach((c) => {
      const chave = c.student_id || c.student_name;
      if (!mapa.has(chave)) {
        mapa.set(chave, {
          id: chave,
          nome: c.student_name,
          curso: c.course_name || "-",
          turma: c.class_name || "-",
          numero: c.student_number || "-",
        });
      }
    });
    return Array.from(mapa.values());
  }, [cobrancas]);

  const dividasDoEstudante = useMemo<Divida[]>(() => {
    if (!selectedEstudante) return [];
    return cobrancas
      .filter((c) => (c.student_id || c.student_name) === selectedEstudante.id)
      .map((c) => ({
        id: c.id,
        tipo: tipoDeCobranca(c.kind),
        descricao: c.description,
        valor: Number(c.amount) || 0,
        dataVencimento: paraISO(c.due_date),
        paga: c.status === "paid" || c.status === "waived",
      }));
  }, [cobrancas, selectedEstudante]);

  const cursosUnicos = Array.from(new Set(pagamentos.map((p) => p.curso).filter((c) => c && c !== "-")));

  const pagamentosFiltrados = useMemo(() => {
    return pagamentos.filter((p) => {
      const termo = searchTerm.toLowerCase();
      const matchesSearch =
        p.estudanteNome.toLowerCase().includes(termo) ||
        p.recibo.toLowerCase().includes(termo);

      const matchesCurso = filtroCurso === "todos" || p.curso === filtroCurso;
      const matchesEstado = filtroEstado === "todos" || p.estado === filtroEstado;
      const matchesTipo = filtroTipo === "todos" || p.tipo === filtroTipo;

      return matchesSearch && matchesCurso && matchesEstado && matchesTipo;
    });
  }, [pagamentos, searchTerm, filtroCurso, filtroEstado, filtroTipo]);

  const estudantesFiltrados = estudantes.filter(
    (e) =>
      e.nome.toLowerCase().includes(searchEstudante.toLowerCase()) ||
      e.numero.includes(searchEstudante)
  );

  const abrirDetalhes = (pagamento: Pagamento) => {
    setSelectedPagamento(pagamento);
    setModalDetalheOpen(true);
  };

  const abrirNovoPagamento = () => {
    setSelectedEstudante(null);
    setFormManual(formManualVazio());
    setFormMetodo("cash");
    setModalNovoOpen(true);
  };

  const selecionarEstudante = (estudante: Estudante) => {
    setSelectedEstudante(estudante);
    setFormManual((prev) => ({ ...prev, nome: estudante.nome }));
    setPopoverOpen(false);
    setSearchEstudante("");
  };

  const pagarDivida = async (divida: Divida) => {
    if (!selectedEstudante) return;
    const cobranca = cobrancas.find((c) => c.id === divida.id);
    setSalvando(true);
    try {
      await financeService.createPayment({
        student_id: cobranca?.student_id || undefined,
        student_name: selectedEstudante.nome,
        course_name: cobranca?.course_name || undefined,
        class_name: cobranca?.class_name || undefined,
        fee_charge_id: divida.id,
        type: divida.tipo,
        amount: divida.valor,
        method: formMetodo,
        status: "paid",
        paid_at: hojeISO(),
        notes: divida.descricao,
      });
      toast.success("Pagamento registado");
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.message || "Erro ao registar pagamento");
    } finally {
      setSalvando(false);
    }
  };

  const registarPagamentoManual = async () => {
    const nome = formManual.nome.trim();
    const valor = Number(formManual.valor);
    if (!nome) {
      toast.error("Indique o nome do estudante");
      return;
    }
    if (!valor || valor <= 0) {
      toast.error("Indique um valor válido");
      return;
    }

    setSalvando(true);
    try {
      await financeService.createPayment({
        student_id: undefined,
        student_name: nome,
        course_name: selectedEstudante && selectedEstudante.curso !== "-" ? selectedEstudante.curso : undefined,
        class_name: selectedEstudante && selectedEstudante.turma !== "-" ? selectedEstudante.turma : undefined,
        type: formManual.tipo,
        amount: valor,
        method: formMetodo,
        status: "paid",
        paid_at: formManual.data || hojeISO(),
        notes: formManual.descricao.trim() || undefined,
      });
      toast.success("Pagamento registado");
      setModalNovoOpen(false);
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.message || "Erro ao registar pagamento");
    } finally {
      setSalvando(false);
    }
  };

  const eliminarPagamento = async (pagamento: Pagamento) => {
    if (!window.confirm(`Eliminar o pagamento ${pagamento.recibo}?`)) return;
    try {
      await financeService.deletePayment(pagamento.id);
      toast.success("Pagamento eliminado");
      setModalDetalheOpen(false);
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.message || "Erro ao eliminar pagamento");
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pago":
        return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "rejeitado":
        return <Badge className="bg-red-100 text-red-800">Rejeitado</Badge>;
      case "reembolsado":
        return <Badge variant="outline">Reembolsado</Badge>;
      default:
        return <Badge variant="secondary">{estado}</Badge>;
    }
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      propina: "Propina",
      exame: "Exame",
      declaracao: "Declaração",
      outro: "Outro",
    };
    return labels[tipo] || tipo;
  };

  const getMetodoIcon = (metodo: string) => {
    switch (metodo) {
      case "online":
      case "multicaixa":
        return <Receipt className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const dividasPendentes = dividasDoEstudante.filter((d) => !d.paga);

  const seletorMetodo = (
    <div>
      <Label>Método de Pagamento</Label>
      <Select value={formMetodo} onValueChange={setFormMetodo}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(metodoLabels).map(([valor, label]) => (
            <SelectItem key={valor} value={valor}>{label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Pagamentos</h1>
        <Button onClick={abrirNovoPagamento}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Pagamento
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {/* Filtros Laterais */}
        <Card className="md:col-span-1">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filtros</span>
            </div>

            <div>
              <Label htmlFor="search">Pesquisa</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nome ou recibo..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="curso">Curso</Label>
              <Select value={filtroCurso} onValueChange={setFiltroCurso}>
                <SelectTrigger id="curso">
                  <SelectValue placeholder="Todos os cursos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os cursos</SelectItem>
                  {cursosUnicos.map((curso) => (
                    <SelectItem key={curso} value={curso}>{curso}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="estado">Estado</Label>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Todos os estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os estados</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="rejeitado">Rejeitado</SelectItem>
                  <SelectItem value="reembolsado">Reembolsado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tipo">Tipo de Taxa</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="propina">Propina</SelectItem>
                  <SelectItem value="exame">Exame</SelectItem>
                  <SelectItem value="declaracao">Declaração</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela Principal */}
        <Card className="md:col-span-3">
          <CardContent className="p-0">
            {carregando ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> A carregar pagamentos...
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recibo</TableHead>
                        <TableHead>Estudante</TableHead>
                        <TableHead className="hidden md:table-cell">Curso</TableHead>
                        <TableHead className="hidden lg:table-cell">Tipo</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pagamentosFiltrados.map((pagamento) => (
                        <TableRow key={pagamento.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{pagamento.recibo}</TableCell>
                          <TableCell
                            className="font-medium text-blue-600 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              abrirDetalhes(pagamento);
                            }}
                          >
                            {pagamento.estudanteNome}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{pagamento.curso}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-1">
                              {getMetodoIcon(pagamento.metodo)}
                              <span className="capitalize">{getTipoLabel(pagamento.tipo)}</span>
                            </div>
                          </TableCell>
                          <TableCell>{pagamento.valor.toLocaleString("pt-AO")} AOA</TableCell>
                          <TableCell>{getEstadoBadge(pagamento.estado)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                abrirDetalhes(pagamento);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {pagamentosFiltrados.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum pagamento encontrado.
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal: Novo Pagamento */}
      <Dialog open={modalNovoOpen} onOpenChange={setModalNovoOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Novo Pagamento</DialogTitle>
            <DialogDescription>
              Registe um novo pagamento associado a um estudante.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Seleção de Estudante (a partir dos débitos existentes) */}
            <div>
              <Label>Estudante com débitos</Label>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {selectedEstudante ? (
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {selectedEstudante.nome} ({selectedEstudante.numero})
                      </span>
                    ) : (
                      "Pesquisar estudante..."
                    )}
                    <Search className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Nome ou número do estudante..."
                      value={searchEstudante}
                      onValueChange={setSearchEstudante}
                    />
                    <CommandEmpty>Nenhum estudante encontrado.</CommandEmpty>
                    <CommandGroup>
                      {estudantesFiltrados.map((estudante) => (
                        <CommandItem
                          key={estudante.id}
                          onSelect={() => selecionarEstudante(estudante)}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{estudante.nome}</span>
                            <span className="text-sm text-muted-foreground">
                              {estudante.numero} • {estudante.curso}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <Tabs defaultValue={selectedEstudante ? "dividas" : "manual"} key={selectedEstudante?.id || "manual"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dividas" disabled={!selectedEstudante}>Dívidas Pendentes</TabsTrigger>
                <TabsTrigger value="manual">Registo Manual</TabsTrigger>
              </TabsList>

              <TabsContent value="dividas" className="space-y-4">
                {seletorMetodo}
                {dividasPendentes.length > 0 ? (
                  <div className="space-y-3">
                    {dividasPendentes.map((divida) => (
                      <Card key={divida.id} className="p-4 hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{divida.descricao}</p>
                            <p className="text-sm text-muted-foreground">
                              Vence a {formatarData(divida.dataVencimento)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{divida.valor.toLocaleString("pt-AO")} AOA</p>
                            <Button
                              size="sm"
                              className="mt-2"
                              disabled={salvando}
                              onClick={() => pagarDivida(divida)}
                            >
                              <Check className="mr-1 h-3 w-3" />
                              Pagar
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {selectedEstudante ? "Não há dívidas pendentes." : "Selecione um estudante para ver as dívidas."}
                  </p>
                )}
              </TabsContent>

              <TabsContent value="manual" className="space-y-4">
                <div>
                  <Label>Nome do Estudante</Label>
                  <Input
                    placeholder="Nome completo"
                    value={formManual.nome}
                    onChange={(e) => setFormManual((prev) => ({ ...prev, nome: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tipo de Taxa</Label>
                    <Select
                      value={formManual.tipo}
                      onValueChange={(v) => setFormManual((prev) => ({ ...prev, tipo: v as TipoPagamento }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="propina">Propina</SelectItem>
                        <SelectItem value="exame">Exame</SelectItem>
                        <SelectItem value="declaracao">Declaração</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Valor (AOA)</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formManual.valor}
                      onChange={(e) => setFormManual((prev) => ({ ...prev, valor: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {seletorMetodo}
                  <div>
                    <Label>Data do Pagamento</Label>
                    <Input
                      type="date"
                      value={formManual.data}
                      onChange={(e) => setFormManual((prev) => ({ ...prev, data: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Input
                    placeholder="Ex: Pagamento de propina avulso"
                    value={formManual.descricao}
                    onChange={(e) => setFormManual((prev) => ({ ...prev, descricao: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={registarPagamentoManual} disabled={salvando}>
                    {salvando && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Registar Pagamento
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalNovoOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Detalhes do Pagamento */}
      <Dialog open={modalDetalheOpen} onOpenChange={setModalDetalheOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pagamento</DialogTitle>
            <DialogDescription>
              {selectedPagamento?.recibo} - {selectedPagamento?.estudanteNome}
            </DialogDescription>
          </DialogHeader>

          {selectedPagamento && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Estado</Label>
                  <div className="mt-1">{getEstadoBadge(selectedPagamento.estado)}</div>
                </div>
                <div>
                  <Label>Valor</Label>
                  <p className="mt-1 font-medium">
                    {selectedPagamento.valor.toLocaleString("pt-AO")} AOA
                  </p>
                </div>
                <div>
                  <Label>Tipo de Taxa</Label>
                  <p className="mt-1">{getTipoLabel(selectedPagamento.tipo)}</p>
                </div>
                <div>
                  <Label>Método</Label>
                  <p className="mt-1">{metodoLabels[selectedPagamento.metodo] || selectedPagamento.metodo}</p>
                </div>
                <div>
                  <Label>Data</Label>
                  <p className="mt-1">{formatarData(selectedPagamento.data)}</p>
                </div>
                <div>
                  <Label>Turma</Label>
                  <p className="mt-1">{selectedPagamento.turma}</p>
                </div>
              </div>

              {selectedPagamento.observacoes && (
                <div>
                  <Label>Observações</Label>
                  <Textarea value={selectedPagamento.observacoes} readOnly className="h-20 mt-2" />
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            {selectedPagamento && (
              <Button variant="destructive" onClick={() => eliminarPagamento(selectedPagamento)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            )}
            <Button variant="outline" onClick={() => setModalDetalheOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
