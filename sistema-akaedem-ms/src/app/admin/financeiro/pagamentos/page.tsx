'use client';

import { useState, useMemo } from "react";
import { Search, Filter, MoreVertical, Check, X, Eye, FileText, Receipt, Plus, User } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
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

interface Estudante {
  id: string;
  nome: string;
  curso: string;
  turma: string;
  numero: string;
}

interface Divida {
  id: string;
  tipo: "propina" | "exame" | "declaracao" | "outro";
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
  tipo: "propina" | "exame" | "declaracao" | "outro";
  valor: number;
  metodo: "online" | "presencial" | "transferencia";
  estado: "pago" | "pendente" | "rejeitado";
  data: string;
  comprovativo?: string;
  observacoes?: string;
}

// Mock de dados
const mockEstudantes: Estudante[] = [
  { id: "1", nome: "Maria Santos", curso: "Engenharia Informática", turma: "EI-2023-A", numero: "2023001" },
  { id: "2", nome: "João Mendes", curso: "Gestão", turma: "GES-2024-B", numero: "2024002" },
  { id: "3", nome: "Ana Costa", curso: "Direito", turma: "DIR-2022-A", numero: "2022003" },
];

const mockDividas: Record<string, Divida[]> = {
  "1": [
    { id: "d1", tipo: "propina", descricao: "Propina - 1º Semestre 2025", valor: 45000, dataVencimento: "2025-01-15", paga: false },
    { id: "d2", tipo: "exame", descricao: "Taxa de Exame Final", valor: 8000, dataVencimento: "2025-06-30", paga: true },
  ],
  "2": [
    { id: "d3", tipo: "propina", descricao: "Propina - 2º Semestre 2025", valor: 45000, dataVencimento: "2025-07-01", paga: false },
  ],
  "3": [
    { id: "d4", tipo: "declaracao", descricao: "Declaração de Matrícula", valor: 3000, dataVencimento: "2025-11-10", paga: true },
  ],
};

const mockPagamentos: Pagamento[] = [
  {
    id: "1",
    recibo: "REC2025-001",
    estudanteId: "1",
    estudanteNome: "Maria Santos",
    curso: "Engenharia Informática",
    turma: "EI-2023-A",
    tipo: "propina",
    valor: 45000,
    metodo: "online",
    estado: "pago",
    data: "2025-11-05",
    comprovativo: "/comprovativos/rec001.pdf",
  },
  {
    id: "2",
    recibo: "REC2025-002",
    estudanteId: "2",
    estudanteNome: "João Mendes",
    curso: "Gestão",
    turma: "GES-2024-B",
    tipo: "exame",
    valor: 8000,
    metodo: "transferencia",
    estado: "pendente",
    data: "2025-11-06",
    comprovativo: "/comprovativos/rec002.jpg",
    observacoes: "Aguardando confirmação bancária",
  },
];

const formatarData = (isoString: string): string => {
  const date = new Date(isoString);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

export default function Pagamentos() {
  const [pagamentos] = useState<Pagamento[]>(mockPagamentos);
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

  const cursosUnicos = Array.from(new Set(pagamentos.map(p => p.curso)));

  const pagamentosFiltrados = useMemo(() => {
    return pagamentos.filter(p => {
      const matchesSearch =
        p.estudanteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.recibo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCurso = filtroCurso === "todos" || p.curso === filtroCurso;
      const matchesEstado = filtroEstado === "todos" || p.estado === filtroEstado;
      const matchesTipo = filtroTipo === "todos" || p.tipo === filtroTipo;

      return matchesSearch && matchesCurso && matchesEstado && matchesTipo;
    });
  }, [pagamentos, searchTerm, filtroCurso, filtroEstado, filtroTipo]);

  const estudantesFiltrados = mockEstudantes.filter(e =>
    e.nome.toLowerCase().includes(searchEstudante.toLowerCase()) ||
    e.numero.includes(searchEstudante)
  );

  const dividasDoEstudante = selectedEstudante ? mockDividas[selectedEstudante.id] || [] : [];

  const abrirDetalhes = (pagamento: Pagamento) => {
    setSelectedPagamento(pagamento);
    setModalDetalheOpen(true);
  };

  const abrirNovoPagamento = () => {
    setSelectedEstudante(null);
    setModalNovoOpen(true);
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pago":
        return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "rejeitado":
        return <Badge className="bg-red-100 text-red-800">Rejeitado</Badge>;
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
      case "online": return <Receipt className="w-4 h-4" />;
      case "presencial": return <FileText className="w-4 h-4" />;
      case "transferencia": return <FileText className="w-4 h-4" />;
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
          <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
            <NavbarH />

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
                        {cursosUnicos.map(curso => (
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
                </CardContent>
              </Card>
            </div>
          </div>
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
              {/* Seleção de Estudante */}
              <div>
                <Label>Estudante</Label>
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
                            onSelect={() => {
                              setSelectedEstudante(estudante);
                              setPopoverOpen(false);
                              setSearchEstudante("");
                            }}
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

              {selectedEstudante && (
                <Tabs defaultValue="dividas" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="dividas">Dívidas Pendentes</TabsTrigger>
                    <TabsTrigger value="manual">Registo Manual</TabsTrigger>
                  </TabsList>

                  <TabsContent value="dividas" className="space-y-4">
                    {dividasDoEstudante.filter(d => !d.paga).length > 0 ? (
                      <div className="space-y-3">
                        {dividasDoEstudante.filter(d => !d.paga).map((divida) => (
                          <Card key={divida.id} className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{divida.descricao}</p>
                                <p className="text-sm text-muted-foreground">
                                  Vence a {formatarData(divida.dataVencimento)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">{divida.valor.toLocaleString("pt-AO")} AOA</p>
                                <Button size="sm" className="mt-2">
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
                        Não há dívidas pendentes.
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="manual" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Tipo de Taxa</Label>
                        <Select>
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
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Input placeholder="Ex: Pagamento de propina avulso" />
                    </div>
                    <div>
                      <Label>Método de Pagamento</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online (Portal)</SelectItem>
                          <SelectItem value="presencial">Presencial</SelectItem>
                          <SelectItem value="transferencia">Transferência</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setModalNovoOpen(false)}>
                Cancelar
              </Button>
              <Button>Registar Pagamento</Button>
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
                    <p className="mt-1 capitalize">{selectedPagamento.metodo}</p>
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

                {selectedPagamento.comprovativo && (
                  <div>
                    <Label>Comprovativo</Label>
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                {selectedPagamento.observacoes && (
                  <div>
                    <Label>Observações</Label>
                    <Textarea value={selectedPagamento.observacoes} readOnly className="h-20 mt-2" />
                  </div>
                )}

                {selectedPagamento.estado === "pendente" && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button className="flex-1">
                      <Check className="mr-2 h-4 w-4" />
                      Aprovar
                    </Button>
                    <Button className="flex-1" variant="destructive">
                      <X className="mr-2 h-4 w-4" />
                      Rejeitar
                    </Button>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setModalDetalheOpen(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}