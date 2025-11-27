"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Download,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
  User,
  Eye,
  Clock,
  Phone,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";

type DataItem = {
  id: number;
  photo: string;
  name: string;
  enrollmentNumber: string;
  course: string;
  class: string;
  enrollmentDate: string;
  status: string;
  phone: string;
  email: string;
};

const tiposCertificacao = [
  "Declaração de matrícula",
  "Declaração de notas",
  "Certificado de frequência",
  "Certificado de conclusão",
  "Diploma final",
  "Declaração de estágio",
  "Declaração de aproveitamento",
  "Histórico escolar",
] as const;

type EstadoPedido =
  | "pendente"
  | "aprovado"
  | "recusado"
  | "emitido"
  | "entregue";
type EstadoEmissao = "emitido" | "entregue" | "digital" | "cancelado";

type Pedido = {
  id: string;
  numeroPedido: string;
  nomeEstudante: string;
  matricula: string;
  tipo: (typeof tiposCertificacao)[number];
  curso: string;
  turma: string;
  dataPedido: Date;
  estado: EstadoPedido;
  observacoes?: string;
  telefone: string;
  email: string;
  motivoSolicitacao?: string;
  dataLimiteNecessaria?: Date;
};

type Emissao = {
  id: string;
  numeroDocumento: string;
  codigoVerificacao: string;
  nomeEstudante: string;
  matricula: string;
  curso: string;
  tipo: (typeof tiposCertificacao)[number];
  dataEmissao: Date;
  estadoEntrega: EstadoEmissao;
  assinaturaDigital?: string;
  pdfUrl?: string;
  observacoes?: string;
  responsavelEmissao?: string;
};

const pedidosMock: Pedido[] = [
  {
    id: "1",
    numeroPedido: "REQ-001",
    nomeEstudante: "João Silva",
    matricula: "2023001",
    tipo: "Certificado de frequência",
    curso: "Engenharia Informática",
    turma: "EI-3A",
    dataPedido: new Date("2025-10-15"),
    estado: "pendente",
    observacoes: "Solicitado para emprego.",
    telefone: "+244 923 456 789",
    email: "joao.silva@email.com",
    motivoSolicitacao:
      "Necessário para processo de candidatura a estágio internacional",
    dataLimiteNecessaria: new Date("2025-11-30"),
  },
  {
    id: "2",
    numeroPedido: "REQ-002",
    nomeEstudante: "Maria Santos",
    matricula: "2023002",
    tipo: "Diploma final",
    curso: "Medicina",
    turma: "MED-6B",
    dataPedido: new Date("2025-11-01"),
    estado: "pendente",
    telefone: "+244 924 567 890",
    email: "maria.santos@email.com",
    motivoSolicitacao: "Conclusão do curso",
  },
  {
    id: "3",
    numeroPedido: "REQ-003",
    nomeEstudante: "Carlos Mendes",
    matricula: "2023003",
    tipo: "Histórico escolar",
    curso: "Direito",
    turma: "DIR-2A",
    dataPedido: new Date("2025-11-03"),
    estado: "recusado",
    telefone: "+244 925 678 901",
    email: "carlos.mendes@email.com",
    observacoes:
      "Rejeitado: Documentação incompleta - faltam comprovantes de pagamento",
  },
];

const emissoesMock: Emissao[] = [
  {
    id: "1",
    numeroDocumento: "DOC-2025-001",
    codigoVerificacao: "VER-ABC123XYZ",
    nomeEstudante: "João Silva",
    matricula: "2023001",
    curso: "Engenharia Informática",
    tipo: "Certificado de frequência",
    dataEmissao: new Date("2025-10-20"),
    estadoEntrega: "entregue",
    assinaturaDigital: "SHA256:a1b2c3d4e5f6...",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    observacoes: "Documento entregue pessoalmente",
    responsavelEmissao: "Dr. António Costa",
  },
  {
    id: "2",
    numeroDocumento: "DOC-2025-002",
    codigoVerificacao: "VER-DEF456ABC",
    nomeEstudante: "Maria Santos",
    matricula: "2023002",
    curso: "Medicina",
    tipo: "Diploma final",
    dataEmissao: new Date("2025-11-03"),
    estadoEntrega: "digital",
    assinaturaDigital: "SHA256:g7h8i9j0k1l2...",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    observacoes: "Enviado por email",
    responsavelEmissao: "Dra. Isabel Ferreira",
  },
];

export default function Certificacoes() {
  const [pedidos, setPedidos] = useState(pedidosMock);
  const [emissoes, setEmissoes] = useState(emissoesMock);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [selectedEmissao, setSelectedEmissao] = useState<Emissao | null>(null);
  const [selectedPDF, setSelectedPDF] = useState("");
  const [activeTab, setActiveTab] = useState<"pedidos" | "emissoes">("pedidos");
  const [filtrosPedido, setFiltrosPedido] = useState({
    tipo: "",
    estado: "",
    curso: "",
  });
  const [filtrosEmissao, setFiltrosEmissao] = useState({
    tipo: "",
    curso: "",
  });
  const [motivoRejeicao, setMotivoRejeicao] = useState("");
  const [showRejeicaoDialog, setShowRejeicaoDialog] = useState<string | null>(
    null
  );
  const [showNotificacaoDialog, setShowNotificacaoDialog] =
    useState<Pedido | null>(null);
  const [mensagemNotificacao, setMensagemNotificacao] = useState("");

  const getFullPedido = (id: string): Pedido | undefined =>
    pedidosMock.find((p) => p.id === id);

  const getFullEmissao = (id: string): Emissao | undefined =>
    emissoesMock.find((e) => e.id === id);

  const handleAprovar = (id: string) => {
    setPedidos(
      pedidos.map((p) =>
        p.id === id ? { ...p, estado: "aprovado" as EstadoPedido } : p
      )
    );
    toast.success("Pedido aprovado com sucesso!");
    setSelectedPedido(null);
  };

  const handleRejeitar = (id: string, motivo: string) => {
    setPedidos(
      pedidos.map((p) =>
        p.id === id
          ? {
              ...p,
              estado: "recusado" as EstadoPedido,
              observacoes: `Rejeitado: ${motivo}`,
            }
          : p
      )
    );
    toast.error("Pedido rejeitado.");
    setShowRejeicaoDialog(null);
    setMotivoRejeicao("");
    setSelectedPedido(null);
  };

  const handleNotificar = (pedido: Pedido, mensagem: string) => {
    // Aqui você integraria com o serviço de email
    toast.success(`Notificação enviada para ${pedido.email}`);
    console.log(`Email enviado para ${pedido.email}:`, mensagem);
    setShowNotificacaoDialog(null);
    setMensagemNotificacao("");
  };

  const handleEmitirCertificado = (pedido: Pedido) => {
    // Lógica para emitir certificado após aprovação
    const novaEmissao: Emissao = {
      id: String(emissoes.length + 1),
      numeroDocumento: `DOC-2025-${String(emissoes.length + 1).padStart(
        3,
        "0"
      )}`,
      codigoVerificacao: `VER-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`,
      nomeEstudante: pedido.nomeEstudante,
      matricula: pedido.matricula,
      curso: pedido.curso,
      tipo: pedido.tipo,
      dataEmissao: new Date(),
      estadoEntrega: "emitido",
      responsavelEmissao: "Sistema Automático",
    };

    setEmissoes([...emissoes, novaEmissao]);
    setPedidos(pedidos.filter((p) => p.id !== pedido.id)); // Remove da lista de pedidos

    toast.success("Certificado emitido com sucesso!");
    setSelectedPedido(null);
  };

  const visualizarPDF = (pdfUrl: string) => {
    if (pdfUrl) {
      setSelectedPDF(pdfUrl);
    } else {
      toast.warning("PDF não disponível para preview.");
    }
  };

  const handleReemissao = (emissao: Emissao) => {
    const novaEmissao: Emissao = {
      ...emissao,
      id: String(emissoes.length + 1),
      numeroDocumento: `${emissao.numeroDocumento}-R${Date.now()}`,
      codigoVerificacao: `VER-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`,
      dataEmissao: new Date(),
      estadoEntrega: "emitido",
      observacoes: `Reemissão do documento ${emissao.numeroDocumento}`,
    };

    setEmissoes([...emissoes, novaEmissao]);
    toast.success("Documento reemitido com sucesso!");
    setSelectedEmissao(null);
  };

  const handleExportarHistorico = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Histórico de Emissões", 20, 20);
    let y = 40;
    emissoesMock.forEach((emissao, index) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. ${emissao.nomeEstudante} - ${
          emissao.tipo
        } - ${emissao.dataEmissao.toLocaleDateString("pt-PT")}`,
        20,
        y
      );
      y += 10;
    });
    doc.save("historico_emissoes.pdf");
    toast.info("Relatório exportado como PDF.");
  };

  // Filtra apenas pedidos pendentes e recusados
  const filteredPedidos = pedidos
    .filter((p) => p.estado === "pendente" || p.estado === "recusado")
    .filter((pedido) => {
      return (
        (!filtrosPedido.tipo || pedido.tipo === filtrosPedido.tipo) &&
        (!filtrosPedido.estado || pedido.estado === filtrosPedido.estado) &&
        (!filtrosPedido.curso ||
          pedido.curso
            .toLowerCase()
            .includes(filtrosPedido.curso.toLowerCase()))
      );
    });

  const filteredEmissoes = emissoes.filter((emissao) => {
    return (
      (!filtrosEmissao.tipo || emissao.tipo === filtrosEmissao.tipo) &&
      (!filtrosEmissao.curso ||
        emissao.curso
          .toLowerCase()
          .includes(filtrosEmissao.curso.toLowerCase()))
    );
  });

  const getEstadoBadgeVariant = (estado: string) => {
    switch (estado) {
      case "pendente":
        return "secondary";
      case "aprovado":
        return "default";
      case "recusado":
        return "destructive";
      case "emitido":
        return "default";
      case "entregue":
        return "default";
      default:
        return "secondary";
    }
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
        {/* <SiteHeader /> */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <NavbarH />
            <div className="flex-1 p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Gestão de Certificações
                </h1>
                <p className="text-muted-foreground">
                  Gerencie pedidos, emissões e histórico de certificados e
                  diplomas de forma eficiente.
                </p>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "pedidos" | "emissoes")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pedidos">
                    Pedidos de Certificação
                  </TabsTrigger>
                  <TabsTrigger value="emissoes">
                    Emissões e Histórico
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pedidos" className="mt-12">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4">
                      <div>
                        <Label>Tipo de Certificação</Label>
                        <Select
                          onValueChange={(v) =>
                            setFiltrosPedido({ ...filtrosPedido, tipo: v })
                          }
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Todos os tipos" />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposCertificacao.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                {tipo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Estado</Label>
                        <Select
                          onValueChange={(v) =>
                            setFiltrosPedido({ ...filtrosPedido, estado: v })
                          }
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Todos os estados" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="recusado">Recusado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Curso</Label>
                        <Input
                          placeholder="Filtrar por curso..."
                          onChange={(e) =>
                            setFiltrosPedido({
                              ...filtrosPedido,
                              curso: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border mt-12">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#202020] ">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Estudante
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Tipo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Curso
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Data
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredPedidos.map((pedido) => (
                            <tr key={pedido.id} className="hover:bg-[#202020] ">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <User className="h-8 w-8 rounded-full bg-gray-200 p-1 text-gray-600" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-300">
                                      {pedido.nomeEstudante}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {pedido.numeroPedido}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm">
                                {pedido.tipo}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                {pedido.curso}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {pedido.dataPedido.toLocaleDateString("pt-PT")}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge
                                  variant={getEstadoBadgeVariant(pedido.estado)}
                                >
                                  {pedido.estado}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedPedido(pedido)}
                                  >
                                    Ver Detalhes
                                  </Button>
                                  {pedido.estado === "pendente" && (
                                    <>
                                      <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => handleAprovar(pedido.id)}
                                      >
                                        <CheckCircle className="w-4 h-4 mr-1" />{" "}
                                        Aprovar
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                          setShowRejeicaoDialog(pedido.id)
                                        }
                                      >
                                        <XCircle className="w-4 h-4 mr-1" />{" "}
                                        Rejeitar
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="emissoes" className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4">
                      <div>
                        <Label>Tipo de Documento</Label>
                        <Select
                          onValueChange={(v) =>
                            setFiltrosEmissao({ ...filtrosEmissao, tipo: v })
                          }
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Todos os tipos" />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposCertificacao.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                {tipo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Curso</Label>
                        <Input
                          placeholder="Filtrar por curso..."
                          onChange={(e) =>
                            setFiltrosEmissao({
                              ...filtrosEmissao,
                              curso: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <Button onClick={handleExportarHistorico}>
                      <Download className="w-4 h-4 mr-2" /> Exportar Histórico
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#202020]">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Estudante
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Documento
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Tipo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Data
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredEmissoes.map((emissao) => (
                            <tr key={emissao.id} className="hover:bg-[#202020]">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <User className="h-8 w-8 rounded-full bg-gray-200 p-1 text-gray-600" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-300">
                                      {emissao.nomeEstudante}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {emissao.matricula}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <p className="text-sm font-medium text-gray-300">
                                  {emissao.numeroDocumento}
                                </p>
                                <p className="text-sm text-gray-500 font-mono">
                                  {emissao.codigoVerificacao}
                                </p>
                              </td>
                              <td className="px-6 py-4 text-sm">
                                {emissao.tipo}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {emissao.dataEmissao.toLocaleDateString(
                                  "pt-PT"
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge
                                  variant={getEstadoBadgeVariant(
                                    emissao.estadoEntrega
                                  )}
                                >
                                  {emissao.estadoEntrega}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedEmissao(emissao)}
                                  >
                                    Detalhes
                                  </Button>
                                  <Button
                                    variant={
                                      emissao.pdfUrl ? "default" : "outline"
                                    }
                                    size="sm"
                                    onClick={() =>
                                      emissao.pdfUrl &&
                                      visualizarPDF(emissao.pdfUrl)
                                    }
                                    disabled={!emissao.pdfUrl}
                                  >
                                    <Eye className="w-4 h-4 mr-1" /> Preview
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleReemissao(emissao)}
                                  >
                                    Reemitir
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Dialog de Detalhes do Pedido */}
              <Dialog
                open={!!selectedPedido}
                onOpenChange={() => setSelectedPedido(null)}
              >
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Detalhes do Pedido {selectedPedido?.numeroPedido}
                    </DialogTitle>
                    <DialogDescription>
                      Informações completas sobre o pedido de certificação
                    </DialogDescription>
                  </DialogHeader>

                  {selectedPedido && (
                    <div className="space-y-6 py-4">
                      {/* Informações do Estudante */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                          <User className="w-5 h-5" />
                          Informações do Estudante
                        </h3>
                        <div className="grid grid-cols-2 gap-4 bg-[#101010]  p-4 rounded-lg">
                          <div>
                            <Label className="text-xs text-gray-500">
                              Nome Completo
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedPedido.nomeEstudante}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">
                              Matrícula
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedPedido.matricula}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">
                              Email
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedPedido.email}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">
                              Telefone
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedPedido.telefone}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Informações Acadêmicas */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                          <GraduationCap className="w-5 h-5" />
                          Informações Acadêmicas
                        </h3>
                        <div className="grid grid-cols-2 gap-4 bg-[#101010] p-4 rounded-lg">
                          <div>
                            <Label className="text-xs text-gray-500">
                              Curso
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedPedido.curso}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">
                              Turma
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedPedido.turma}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Detalhes do Pedido */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                          <Clock className="w-5 h-5" />
                          Detalhes do Pedido
                        </h3>
                        <div className="space-y-3 bg-[#101010]  p-4 rounded-lg">
                          <div>
                            <Label className="text-xs text-gray-500">
                              Tipo de Certificação
                            </Label>
                            <Badge
                              variant="secondary"
                              className="mt-1 bg-[#505050]"
                            >
                              {selectedPedido.tipo}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">
                              Data do Pedido
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedPedido.dataPedido.toLocaleDateString(
                                "pt-PT",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">
                              Estado Atual
                            </Label>
                            <div className="mt-1">
                              <Badge
                                variant={getEstadoBadgeVariant(
                                  selectedPedido.estado
                                )}
                                className="bg-orange-300 text-orange-900"
                              >
                                {selectedPedido.estado}
                              </Badge>
                            </div>
                          </div>
                          {selectedPedido.dataLimiteNecessaria && (
                            <div>
                              <Label className="text-xs text-gray-500">
                                Data Limite Necessária
                              </Label>
                              <p className="text-sm font-medium text-orange-600">
                                {selectedPedido.dataLimiteNecessaria.toLocaleDateString(
                                  "pt-PT"
                                )}
                              </p>
                            </div>
                          )}
                          {selectedPedido.motivoSolicitacao && (
                            <div>
                              <Label className="text-xs text-gray-500">
                                Motivo da Solicitação
                              </Label>
                              <p className="text-sm mt-1">
                                {selectedPedido.motivoSolicitacao}
                              </p>
                            </div>
                          )}
                          {selectedPedido.observacoes && (
                            <div>
                              <Label className="text-xs text-gray-500">
                                Observações
                              </Label>
                              <p className="text-sm mt-1">
                                {selectedPedido.observacoes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    {selectedPedido?.estado === "pendente" && (
                      <>
                        <Button
                          onClick={() => {
                            handleAprovar(selectedPedido.id);
                          }}
                          className="w-full sm:w-auto"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Aprovar Pedido
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            setShowRejeicaoDialog(selectedPedido.id);
                            setSelectedPedido(null);
                          }}
                          className="w-full sm:w-auto"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Rejeitar Pedido
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNotificacaoDialog(selectedPedido);
                        setSelectedPedido(null);
                      }}
                      className="w-full sm:w-auto"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Notificar Estudante
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Dialog de Detalhes da Emissão */}
              <Dialog
                open={!!selectedEmissao}
                onOpenChange={() => setSelectedEmissao(null)}
              >
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Detalhes da Emissão {selectedEmissao?.numeroDocumento}
                    </DialogTitle>
                    <DialogDescription>
                      Informações completas sobre o documento emitido
                    </DialogDescription>
                  </DialogHeader>

                  {selectedEmissao && (
                    <div className="space-y-6 py-4">
                      {/* Informações do Documento */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                          <FileText className="w-5 h-5" />
                          Informações do Documento
                        </h3>
                        <div className="space-y-3 bg-[#101010] p-4 rounded-lg">
                          <div>
                            <Label className="text-xs text-gray-400">
                              Número do Documento
                            </Label>
                            <p className="text-sm font-medium font-mono">
                              {selectedEmissao.numeroDocumento}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400">
                              Código de Verificação
                            </Label>
                            <p className="text-sm font-medium font-mono text-blue-600">
                              {selectedEmissao.codigoVerificacao}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400">
                              Tipo de Documento
                            </Label>
                            <Badge variant="secondary" className="mt-1">
                              {selectedEmissao.tipo}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400">
                              Data de Emissão
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedEmissao.dataEmissao.toLocaleDateString(
                                "pt-PT",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400">
                              Estado de Entrega
                            </Label>
                            <div className="mt-1">
                              <Badge
                                variant={getEstadoBadgeVariant(
                                  selectedEmissao.estadoEntrega
                                )}
                              >
                                {selectedEmissao.estadoEntrega}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Informações do Estudante */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                          <User className="w-5 h-5" />
                          Informações do Estudante
                        </h3>
                        <div className="grid grid-cols-2 gap-4 bg-[#101010] p-4 rounded-lg">
                          <div>
                            <Label className="text-xs text-gray-400">
                              Nome Completo
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedEmissao.nomeEstudante}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400">
                              Matrícula
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedEmissao.matricula}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <Label className="text-xs text-gray-400">
                              Curso
                            </Label>
                            <p className="text-sm font-medium">
                              {selectedEmissao.curso}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Segurança e Autenticidade */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                          <CheckCircle className="w-5 h-5" />
                          Segurança e Autenticidade
                        </h3>
                        <div className="space-y-3 bg-[#101010] p-4 rounded-lg">
                          {selectedEmissao.assinaturaDigital && (
                            <div>
                              <Label className="text-xs text-gray-400">
                                Assinatura Digital
                              </Label>
                              <p className="text-xs font-mono text-gray-600 break-all mt-1">
                                {selectedEmissao.assinaturaDigital}
                              </p>
                            </div>
                          )}
                          {selectedEmissao.responsavelEmissao && (
                            <div>
                              <Label className="text-xs text-gray-400">
                                Responsável pela Emissão
                              </Label>
                              <p className="text-sm font-medium">
                                {selectedEmissao.responsavelEmissao}
                              </p>
                            </div>
                          )}
                          {selectedEmissao.observacoes && (
                            <div>
                              <Label className="text-xs text-gray-400">
                                Observações
                              </Label>
                              <p className="text-sm mt-1">
                                {selectedEmissao.observacoes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant={selectedEmissao?.pdfUrl ? "default" : "outline"}
                      onClick={() => {
                        if (selectedEmissao?.pdfUrl) {
                          visualizarPDF(selectedEmissao.pdfUrl);
                          setSelectedEmissao(null);
                        }
                      }}
                      disabled={!selectedEmissao?.pdfUrl}
                      className="w-full sm:w-auto"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar PDF
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (selectedEmissao) handleReemissao(selectedEmissao);
                      }}
                      className="w-full sm:w-auto"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Solicitar Reemissão
                    </Button>
                    {selectedEmissao?.pdfUrl && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          window.open(selectedEmissao.pdfUrl, "_blank")
                        }
                        className="w-full sm:w-auto"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Baixar PDF
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Dialog de Notificação ao Estudante */}
              <Dialog
                open={!!showNotificacaoDialog}
                onOpenChange={() => setShowNotificacaoDialog(null)}
              >
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Notificar Estudante
                    </DialogTitle>
                    <DialogDescription>
                      Envie uma mensagem para{" "}
                      {showNotificacaoDialog?.nomeEstudante}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Label className="text-xs text-gray-500">Para:</Label>
                        <span className="font-medium">
                          {showNotificacaoDialog?.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Label className="text-xs text-gray-500">
                          Assunto:
                        </Label>
                        <span className="font-medium">
                          Pedido de Certificação{" "}
                          {showNotificacaoDialog?.numeroPedido}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mensagem">Mensagem *</Label>
                      <Textarea
                        id="mensagem"
                        placeholder="Digite sua mensagem aqui..."
                        value={mensagemNotificacao}
                        onChange={(e) => setMensagemNotificacao(e.target.value)}
                        rows={6}
                        className="resize-none"
                      />
                      <p className="text-xs text-gray-500">
                        A mensagem será enviada para o email do estudante.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNotificacaoDialog(null);
                        setMensagemNotificacao("");
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          mensagemNotificacao.trim() &&
                          showNotificacaoDialog
                        ) {
                          handleNotificar(
                            showNotificacaoDialog,
                            mensagemNotificacao
                          );
                        } else {
                          toast.error("Por favor, escreva uma mensagem.");
                        }
                      }}
                      disabled={!mensagemNotificacao.trim()}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar Notificação
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Dialog de Rejeição */}
              <Dialog
                open={!!showRejeicaoDialog}
                onOpenChange={() => setShowRejeicaoDialog(null)}
              >
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Rejeitar Pedido
                    </DialogTitle>
                    <DialogDescription>
                      Por favor, informe o motivo da rejeição. Esta informação
                      será enviada ao estudante.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="motivo">Motivo da Rejeição *</Label>
                      <Textarea
                        id="motivo"
                        placeholder="Descreva o motivo da rejeição..."
                        value={motivoRejeicao}
                        onChange={(e) => setMotivoRejeicao(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                      <p className="text-xs text-gray-500">
                        Seja claro e específico sobre o motivo da rejeição.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowRejeicaoDialog(null);
                        setMotivoRejeicao("");
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        if (motivoRejeicao.trim()) {
                          handleRejeitar(showRejeicaoDialog!, motivoRejeicao);
                        } else {
                          toast.error(
                            "Por favor, informe o motivo da rejeição."
                          );
                        }
                      }}
                      disabled={!motivoRejeicao.trim()}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Confirmar Rejeição
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Dialog Preview PDF */}
              <Dialog
                open={!!selectedPDF}
                onOpenChange={() => setSelectedPDF("")}
              >
                <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Preview do Documento PDF</DialogTitle>
                    <DialogDescription>
                      Visualize o conteúdo do documento gerado. Use os controles
                      do navegador para zoom ou navegação.
                    </DialogDescription>
                  </DialogHeader>
                  <div
                    className="flex-1 overflow-auto p-4 bg-gray-50 rounded-lg"
                    style={{ minHeight: "600px" }}
                  >
                    {selectedPDF ? (
                      <iframe
                        src={selectedPDF}
                        width="100%"
                        height="600px"
                        className="border-0 rounded"
                        title="Preview PDF"
                        onError={() => toast.error("Erro ao carregar PDF.")}
                      />
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Carregando documento...
                      </p>
                    )}
                  </div>
                  <DialogFooter className="gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedPDF("")}
                    >
                      Fechar
                    </Button>
                    {selectedPDF && (
                      <Button
                        onClick={() => window.open(selectedPDF, "_blank")}
                      >
                        <Download className="w-4 h-4 mr-2" /> Baixar PDF
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
