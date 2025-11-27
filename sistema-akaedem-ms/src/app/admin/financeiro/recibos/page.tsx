"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Download,
  Mail,
  Eye,
  Printer,
  Plus,
  FileText,
  Receipt,
  QrCode,
  Settings,
  Upload,
  Send,
  Check,
} from "lucide-react";
import QRCode from "qrcode";
import { useRef, useState } from "react";

// === Formatação ===
const formatarData = (date: Date): string => {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const formatarMoeda = (valor: number, moeda: string = "AOA"): string => {
  return `${valor.toLocaleString("pt-AO")} ${moeda}`;
};

const formatarDataInput = (date: Date): string => {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
};

// Tipos
type TipoDocumento = "fatura" | "recibo";
type EstadoDocumento = "pago" | "pendente" | "anulado" | "reemitido";

interface ItemFatura {
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  total: number;
}

interface Documento {
  id: string;
  numero: string;
  tipo: TipoDocumento;
  estudanteId: string;
  estudanteNome: string;
  estudanteNIF?: string;
  dataEmissao: Date;
  dataVencimento?: Date;
  itens: ItemFatura[];
  subtotal: number;
  desconto?: number;
  total: number;
  estado: EstadoDocumento;
  metodoPagamento?: string;
  comprovativoAnexado?: boolean;
  reenviadoEmail?: boolean;
  qrCode?: boolean;
  qrData?: string;
}

interface Instituicao {
  nome: string;
  nif: string;
  morada: string;
  telefone: string;
  email: string;
  logoUrl?: string;
}

// Dados
const instituicaoInicial: Instituicao = {
  nome: "Instituto Superior Politécnico de Luanda",
  nif: "500000000",
  morada: "Rua Principal, Luanda, Angola",
  telefone: "+244 923 456 789",
  email: "financeiro@ispl.ao",
};

const documentosIniciais: Documento[] = [
  {
    id: "1",
    numero: "FAT-2025-0001",
    tipo: "fatura",
    estudanteId: "1",
    estudanteNome: "Maria Santos",
    estudanteNIF: "003456789LA047",
    dataEmissao: new Date(2025, 8, 10),
    dataVencimento: new Date(2025, 8, 25),
    itens: [
      {
        descricao: "Propina - 1ª Parcela",
        quantidade: 1,
        valorUnitario: 225000,
        total: 225000,
      },
      {
        descricao: "Taxa de Matrícula",
        quantidade: 1,
        valorUnitario: 25000,
        total: 25000,
      },
    ],
    subtotal: 250000,
    total: 250000,
    estado: "pago",
    metodoPagamento: "Transferência Bancária",
    comprovativoAnexado: true,
    qrCode: true,
    qrData: "https://portal.ispl.ao/verificar?doc=FAT-2025-0001",
  },
  {
    id: "2",
    numero: "REC-2025-0001",
    tipo: "recibo",
    estudanteId: "2",
    estudanteNome: "João Pedro",
    dataEmissao: new Date(2025, 8, 15),
    itens: [
      {
        descricao: "Pagamento Propina - Parcela 1",
        quantidade: 1,
        valorUnitario: 200000,
        total: 200000,
      },
    ],
    subtotal: 200000,
    total: 200000,
    estado: "pago",
    metodoPagamento: "Multicaixa",
    qrCode: true,
    qrData: "https://portal.ispl.ao/verificar?doc=REC-2025-0001",
  },
  {
    id: "3",
    numero: "FAT-2025-0002",
    tipo: "fatura",
    estudanteId: "3",
    estudanteNome: "Ana Lima",
    dataEmissao: new Date(2025, 9, 1),
    dataVencimento: new Date(2025, 9, 15),
    itens: [
      {
        descricao: "Declaração Académica",
        quantidade: 1,
        valorUnitario: 3000,
        total: 3000,
      },
    ],
    subtotal: 3000,
    total: 3000,
    estado: "pendente",
    qrCode: true,
    qrData: "https://portal.ispl.ao/verificar?doc=FAT-2025-0002",
  },
];

export default function FaturasRecibosPage() {
  const [documentos, setDocumentos] =
    React.useState<Documento[]>(documentosIniciais);
  const [instituicao, setInstituicao] =
    React.useState<Instituicao>(instituicaoInicial);
  const [filtro, setFiltro] = React.useState("");
  const [tipoFiltro, setTipoFiltro] = React.useState<TipoDocumento | "todos">(
    "todos"
  );
  const [dialogAberto, setDialogAberto] = React.useState(false);
  const [previewDocumento, setPreviewDocumento] =
    React.useState<Documento | null>(null);
  const [configAberta, setConfigAberta] = React.useState(false);
  const [emailAberto, setEmailAberto] = React.useState<Documento | null>(null);
  const [emailForm, setEmailForm] = React.useState({
    para: "",
    assunto: "",
    mensagem: "",
  });
  const [enviando, setEnviando] = React.useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // Formulário nova fatura
  const [formFatura, setFormFatura] = React.useState<
    Partial<Documento> & { itens: ItemFatura[] }
  >({
    tipo: "fatura",
    estudanteNome: "",
    estudanteNIF: "",
    dataEmissao: new Date(),
    dataVencimento: new Date(),
    itens: [{ descricao: "", quantidade: 1, valorUnitario: 0, total: 0 }],
    subtotal: 0,
    total: 0,
    estado: "pendente",
    qrCode: true,
  });

  React.useEffect(() => {
    const subtotal = formFatura.itens.reduce(
      (acc, item) => acc + item.total,
      0
    );
    const total = subtotal - (formFatura.desconto || 0);
    setFormFatura((prev) => ({ ...prev, subtotal, total }));
  }, [formFatura.itens, formFatura.desconto]);

  const handleAdicionarItem = () => {
    setFormFatura((prev) => ({
      ...prev,
      itens: [
        ...prev.itens,
        { descricao: "", quantidade: 1, valorUnitario: 0, total: 0 },
      ],
    }));
  };

  const handleAtualizarItem = (
    index: number,
    campo: keyof ItemFatura,
    valor: any
  ) => {
    setFormFatura((prev) => {
      const novosItens = [...prev.itens];
      novosItens[index] = { ...novosItens[index], [campo]: valor };
      if (campo === "quantidade" || campo === "valorUnitario") {
        novosItens[index].total =
          novosItens[index].quantidade * novosItens[index].valorUnitario;
      }
      return { ...prev, itens: novosItens };
    });
  };

  const handleEmitirFatura = () => {
    const novoDoc: Documento = {
      id: Date.now().toString(),
      numero: `${formFatura.tipo === "fatura" ? "FAT" : "REC"}-2025-${String(
        documentos.filter((d) => d.tipo === formFatura.tipo).length + 1
      ).padStart(4, "0")}`,
      tipo: formFatura.tipo || "fatura",
      estudanteId: "temp",
      estudanteNome: formFatura.estudanteNome || "",
      estudanteNIF: formFatura.estudanteNIF,
      dataEmissao: formFatura.dataEmissao || new Date(),
      dataVencimento: formFatura.dataVencimento,
      itens: formFatura.itens,
      subtotal: formFatura.subtotal || 0,
      desconto: formFatura.desconto,
      total: formFatura.total || 0,
      estado: formFatura.estado || "pendente",
      qrCode: formFatura.qrCode,
      qrData: `https://portal.ispl.ao/verificar?doc=${
        formFatura.numero || "NOVO"
      }`,
    };

    setDocumentos((prev) => [...prev, novoDoc]);
    setDialogAberto(false);
    resetFormFatura();
  };

  const resetFormFatura = () => {
    setFormFatura({
      tipo: "fatura",
      estudanteNome: "",
      estudanteNIF: "",
      dataEmissao: new Date(),
      dataVencimento: new Date(),
      itens: [{ descricao: "", quantidade: 1, valorUnitario: 0, total: 0 }],
      subtotal: 0,
      total: 0,
      estado: "pendente",
      qrCode: true,
    });
  };

  // Filtros
  const documentosFiltrados = documentos.filter((doc) => {
    const matchesSearch =
      doc.estudanteNome.toLowerCase().includes(filtro.toLowerCase()) ||
      doc.numero.toLowerCase().includes(filtro.toLowerCase());
    const matchesTipo = tipoFiltro === "todos" || doc.tipo === tipoFiltro;
    return matchesSearch && matchesTipo;
  });

  // === PREVIEW COM QR CODE ===
  React.useEffect(() => {
    if (previewDocumento?.qrCode && previewDocumento.qrData) {
      QRCode.toDataURL(previewDocumento.qrData)
        .then((url) => setQrCodeUrl(url))
        .catch(() => setQrCodeUrl(""));
    } else {
      setQrCodeUrl("");
    }
  }, [previewDocumento]);

  // === AÇÕES ===

  const handleDownload = async (doc: Documento) => {
    const { default: jsPDF } = await import("jspdf");
    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text(instituicao.nome, 20, 20);
    pdf.setFontSize(10);
    pdf.text(`NIF: ${instituicao.nif}`, 20, 28);
    pdf.text(instituicao.morada, 20, 34);
    pdf.text(`${instituicao.telefone} • ${instituicao.email}`, 20, 40);

    pdf.setFontSize(20);
    pdf.text(doc.tipo.toUpperCase(), 140, 20);
    pdf.setFontSize(12);
    pdf.text(`Nº ${doc.numero}`, 140, 28);

    pdf.setFontSize(10);
    pdf.text(`Estudante: ${doc.estudanteNome}`, 20, 55);
    if (doc.estudanteNIF) pdf.text(`NIF: ${doc.estudanteNIF}`, 20, 61);
    pdf.text(`Emissão: ${formatarData(doc.dataEmissao)}`, 20, 67);
    if (doc.dataVencimento)
      pdf.text(`Vencimento: ${formatarData(doc.dataVencimento)}`, 20, 73);

    let y = 90;
    pdf.text("Descrição", 20, y);
    pdf.text("Qtd", 100, y);
    pdf.text("Unitário", 120, y);
    pdf.text("Total", 160, y, { align: "right" });
    y += 8;

    doc.itens.forEach((item) => {
      pdf.text(item.descricao, 20, y);
      pdf.text(String(item.quantidade), 100, y);
      pdf.text(formatarMoeda(item.valorUnitario), 120, y);
      pdf.text(formatarMoeda(item.total), 160, y, { align: "right" });
      y += 8;
    });

    y += 10;
    pdf.text(`Subtotal: ${formatarMoeda(doc.subtotal)}`, 160, y, {
      align: "right",
    });
    if (doc.desconto) {
      y += 8;
      pdf.text(`Desconto: -${formatarMoeda(doc.desconto)}`, 160, y, {
        align: "right",
      });
    }
    y += 8;
    pdf.setFontSize(14);
    pdf.text(`TOTAL: ${formatarMoeda(doc.total)}`, 160, y, { align: "right" });

    if (doc.qrCode && doc.qrData) {
      const qr = await QRCode.toDataURL(doc.qrData);
      pdf.addImage(qr, "PNG", 80, 200, 40, 40);
    }

    pdf.save(`${doc.numero}.pdf`);
  };

  const handleImprimir = () => {
    if (!previewDocumento) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${previewDocumento.numero}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .title { font-size: 28px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .total { text-align: right; font-weight: bold; font-size: 18px; }
            .qr { text-align: center; margin: 30px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h2>${instituicao.nome}</h2>
              <p>NIF: ${instituicao.nif}<br>${instituicao.morada}<br>${
      instituicao.telefone
    } • ${instituicao.email}</p>
            </div>
            <div>
              <div class="title">${previewDocumento.tipo.toUpperCase()}</div>
              <p>Nº ${previewDocumento.numero}</p>
            </div>
          </div>
          <p><strong>Estudante:</strong> ${previewDocumento.estudanteNome}</p>
          ${
            previewDocumento.estudanteNIF
              ? `<p><strong>NIF:</strong> ${previewDocumento.estudanteNIF}</p>`
              : ""
          }
          <p><strong>Emissão:</strong> ${formatarData(
            previewDocumento.dataEmissao
          )}</p>
          ${
            previewDocumento.dataVencimento
              ? `<p><strong>Vencimento:</strong> ${formatarData(
                  previewDocumento.dataVencimento
                )}</p>`
              : ""
          }
          
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Qtd</th>
                <th>Unitário</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${previewDocumento.itens
                .map(
                  (item) => `
                <tr>
                  <td>${item.descricao}</td>
                  <td>${item.quantidade}</td>
                  <td>${formatarMoeda(item.valorUnitario)}</td>
                  <td>${formatarMoeda(item.total)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="total">
            <p>Subtotal: ${formatarMoeda(previewDocumento.subtotal)}</p>
            ${
              previewDocumento.desconto
                ? `<p>Desconto: -${formatarMoeda(
                    previewDocumento.desconto
                  )}</p>`
                : ""
            }
            <p style="font-size: 20px;">TOTAL: ${formatarMoeda(
              previewDocumento.total
            )}</p>
          </div>
          
          ${
            previewDocumento.qrCode
              ? '<div class="qr"><img src="" id="qr" width="100" height="100"/></div>'
              : ""
          }
          <p style="text-align: center; color: #666; font-size: 12px; margin-top: 40px;">
            Documento gerado eletronicamente • ${new Date().toLocaleString(
              "pt-AO"
            )}
          </p>
        </body>
      </html>
    `);

    if (previewDocumento.qrCode && previewDocumento.qrData) {
      QRCode.toDataURL(previewDocumento.qrData, (err, url) => {
        if (err) return;
        const img = printWindow.document.getElementById(
          "qr"
        ) as HTMLImageElement;
        if (img) img.src = url;
        setTimeout(() => printWindow.print(), 500);
      });
    } else {
      setTimeout(() => printWindow.print(), 300);
    }
  };

  const handleAbrirEmail = (doc: Documento) => {
    setEmailAberto(doc);
    setEmailForm({
      para: `${doc.estudanteNome
        .toLowerCase()
        .replace(/\s+/g, ".")}@estudante.ispl.ao`,
      assunto: `Seu ${doc.tipo} Nº ${doc.numero} - ISPL`,
      mensagem: `Prezado(a) ${doc.estudanteNome},

Segue em anexo o seu ${doc.tipo} referente ao pagamento realizado.

Valor: ${formatarMoeda(doc.total)}
Data: ${formatarData(doc.dataEmissao)}

Em caso de dúvidas, entre em contato com o financeiro.

Atenciosamente,
${instituicao.nome}
${instituicao.email}`,
    });
  };

  const handleEnviarEmail = async () => {
    if (!emailAberto) return;
    setEnviando(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setEnviando(false);
    setEmailAberto(null);
    alert(`Email enviado com sucesso para ${emailForm.para}!`);
  };

  // Estatísticas
  const totalEmitido = documentos.reduce((acc, d) => acc + d.total, 0);
  const totalPago = documentos
    .filter((d) => d.estado === "pago")
    .reduce((acc, d) => acc + d.total, 0);
  const mesAtual = new Date().getMonth();
  const emitidoEsteMes = documentos
    .filter((d) => d.dataEmissao.getMonth() === mesAtual)
    .reduce((acc, d) => acc + d.total, 0);

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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <NavbarH />

            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Faturas e Recibos
                  </h1>
                  <p className="text-muted-foreground">
                    Emita, consulte e envie documentos financeiros.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfigAberta(true)}
                  >
                    <Settings className="mr-2 h-4 w-4" /> Configurar
                  </Button>

                  <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          resetFormFatura();
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Nova Fatura
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Emitir Nova Fatura</DialogTitle>
                        <DialogDescription>
                          Preencha os dados da fatura
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Tipo</Label>
                            <Select
                              value={formFatura.tipo}
                              onValueChange={(v) =>
                                setFormFatura((prev) => ({
                                  ...prev,
                                  tipo: v as TipoDocumento,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fatura">Fatura</SelectItem>
                                <SelectItem value="recibo">Recibo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Nº Estudante / Nome</Label>
                            <Input
                              placeholder="ex: Maria Santos"
                              value={formFatura.estudanteNome}
                              onChange={(e) =>
                                setFormFatura((prev) => ({
                                  ...prev,
                                  estudanteNome: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <Label>NIF do Estudante (opcional)</Label>
                          <Input
                            placeholder="ex: 003456789LA047"
                            value={formFatura.estudanteNIF}
                            onChange={(e) =>
                              setFormFatura((prev) => ({
                                ...prev,
                                estudanteNIF: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Data de Emissão</Label>
                            <Input
                              type="date"
                              value={
                                formFatura.dataEmissao
                                  ? formatarDataInput(formFatura.dataEmissao)
                                  : ""
                              }
                              onChange={(e) =>
                                setFormFatura((prev) => ({
                                  ...prev,
                                  dataEmissao: new Date(e.target.value),
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label>Data de Vencimento</Label>
                            <Input
                              type="date"
                              value={
                                formFatura.dataVencimento
                                  ? formatarDataInput(formFatura.dataVencimento)
                                  : ""
                              }
                              onChange={(e) =>
                                setFormFatura((prev) => ({
                                  ...prev,
                                  dataVencimento: new Date(e.target.value),
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Itens da Fatura</Label>
                          <div className="space-y-2 mt-2">
                            {formFatura.itens.map((item, i) => (
                              <div
                                key={i}
                                className="grid grid-cols-12 gap-2 items-end"
                              >
                                <Input
                                  className="col-span-6"
                                  placeholder="Descrição"
                                  value={item.descricao}
                                  onChange={(e) =>
                                    handleAtualizarItem(
                                      i,
                                      "descricao",
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  type="number"
                                  className="col-span-2"
                                  placeholder="Qtd"
                                  value={item.quantidade}
                                  onChange={(e) =>
                                    handleAtualizarItem(
                                      i,
                                      "quantidade",
                                      Number(e.target.value)
                                    )
                                  }
                                />
                                <Input
                                  type="number"
                                  className="col-span-2"
                                  placeholder="Valor"
                                  value={item.valorUnitario}
                                  onChange={(e) =>
                                    handleAtualizarItem(
                                      i,
                                      "valorUnitario",
                                      Number(e.target.value)
                                    )
                                  }
                                />
                                <div className="col-span-2 text-right font-medium">
                                  {formatarMoeda(item.total)}
                                </div>
                              </div>
                            ))}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleAdicionarItem}
                            >
                              <Plus className="h-4 w-4 mr-1" /> Adicionar Item
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Desconto</Label>
                            <Input
                              type="number"
                              value={formFatura.desconto || ""}
                              onChange={(e) =>
                                setFormFatura((prev) => ({
                                  ...prev,
                                  desconto: Number(e.target.value) || 0,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>{" "}
                              <span>
                                {formatarMoeda(formFatura.subtotal || 0)}
                              </span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                              <span>Total:</span>{" "}
                              <span>
                                {formatarMoeda(formFatura.total || 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            resetFormFatura();
                            setDialogAberto(false);
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleEmitirFatura}>
                          Emitir Fatura
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Cards de Estatísticas */}
              <div className="grid gap-4 md:grid-cols-3 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Emitido
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatarMoeda(totalEmitido)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Todos os documentos
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Pago
                    </CardTitle>
                    <Receipt className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatarMoeda(totalPago)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Documentos liquidados
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Este Mês
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatarMoeda(emitidoEsteMes)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Emitido em{" "}
                      {new Date().toLocaleString("pt-AO", { month: "long" })}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Filtros */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Pesquisar por estudante ou nº de documento..."
                          value={filtro}
                          onChange={(e) => setFiltro(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select
                      value={tipoFiltro}
                      onValueChange={(v) => setTipoFiltro(v as any)}
                    >
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os tipos</SelectItem>
                        <SelectItem value="fatura">Faturas</SelectItem>
                        <SelectItem value="recibo">Recibos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
              </Card>

              {/* Tabela */}
              <Card>
                <CardHeader>
                  <CardTitle>Documentos Emitidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nº Documento</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Estudante</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documentosFiltrados.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">
                              {doc.numero}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  doc.tipo === "fatura"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {doc.tipo === "fatura" ? (
                                  <FileText className="mr-1 h-3 w-3" />
                                ) : (
                                  <Receipt className="mr-1 h-3 w-3" />
                                )}
                                {doc.tipo}
                              </Badge>
                            </TableCell>
                            <TableCell>{doc.estudanteNome}</TableCell>
                            <TableCell>
                              {formatarData(doc.dataEmissao)}
                            </TableCell>
                            <TableCell>{formatarMoeda(doc.total)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  doc.estado === "pago"
                                    ? "default"
                                    : doc.estado === "pendente"
                                    ? "secondary"
                                    : doc.estado === "anulado"
                                    ? "destructive"
                                    : "outline"
                                }
                              >
                                {doc.estado}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setPreviewDocumento(doc)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDownload(doc)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAbrirEmail(doc)}
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setPreviewDocumento(doc);
                                    setTimeout(handleImprimir, 300);
                                  }}
                                >
                                  <Printer className="h-4 w-4" />
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

              {/* MODAL DE PREVIEW */}
              <Dialog
                open={!!previewDocumento}
                onOpenChange={() => setPreviewDocumento(null)}
              >
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
                  <DialogHeader>
                    <DialogTitle>Pré-visualização do Documento</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      {previewDocumento?.numero} •{" "}
                      {previewDocumento?.estudanteNome}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="bg-white p-8 border rounded-lg shadow-sm text-black">
                    {/* Cabeçalho */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-black">
                          {instituicao.nome}
                        </h2>
                        <p className="text-sm text-gray-700">
                          NIF: {instituicao.nif}
                        </p>
                        <p className="text-sm text-gray-700">
                          {instituicao.morada}
                        </p>
                        <p className="text-sm text-gray-700">
                          {instituicao.telefone} • {instituicao.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <h1 className="text-3xl font-bold uppercase text-black">
                          {previewDocumento?.tipo === "fatura"
                            ? "Fatura"
                            : "Recibo"}
                        </h1>
                        <p className="text-lg text-gray-800">
                          Nº {previewDocumento?.numero}
                        </p>
                      </div>
                    </div>

                    {/* Dados do estudante */}
                    <div className="border-t border-gray-300 pt-4 mb-4 text-sm text-gray-800">
                      <p>
                        <strong className="text-black">Estudante:</strong>{" "}
                        {previewDocumento?.estudanteNome}
                      </p>
                      {previewDocumento?.estudanteNIF && (
                        <p>
                          <strong className="text-black">NIF:</strong>{" "}
                          {previewDocumento.estudanteNIF}
                        </p>
                      )}
                      <p>
                        <strong className="text-black">Data:</strong>{" "}
                        {previewDocumento?.dataEmissao &&
                          formatarData(previewDocumento.dataEmissao)}
                      </p>
                      {previewDocumento?.dataVencimento && (
                        <p>
                          <strong className="text-black">Vencimento:</strong>{" "}
                          {formatarData(previewDocumento.dataVencimento)}
                        </p>
                      )}
                    </div>

                    {/* Itens */}
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-black font-semibold">
                            Descrição
                          </TableHead>
                          <TableHead className="text-right text-black font-semibold">
                            Qtd
                          </TableHead>
                          <TableHead className="text-right text-black font-semibold">
                            Valor Unit.
                          </TableHead>
                          <TableHead className="text-right text-black font-semibold">
                            Total
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewDocumento?.itens.map((item, i) => (
                          <TableRow key={i} className="hover:bg-gray-50">
                            <TableCell className="text-gray-800">
                              {item.descricao}
                            </TableCell>
                            <TableCell className="text-right text-gray-800">
                              {item.quantidade}
                            </TableCell>
                            <TableCell className="text-right text-gray-800">
                              {formatarMoeda(item.valorUnitario)}
                            </TableCell>
                            <TableCell className="text-right font-medium text-gray-900">
                              {formatarMoeda(item.total)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Totais */}
                    <div className="flex justify-end mt-6 space-y-1 text-right">
                      <div className="w-48 border-t border-gray-300 pt-2">
                        <div className="flex justify-between text-gray-700">
                          <span>Subtotal:</span>
                          <span className="font-medium">
                            {formatarMoeda(previewDocumento?.subtotal || 0)}
                          </span>
                        </div>
                        {previewDocumento?.desconto && (
                          <div className="flex justify-between text-gray-700">
                            <span>Desconto:</span>
                            <span className="font-medium">
                              -{formatarMoeda(previewDocumento.desconto)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-xl font-bold text-black mt-2 pt-2 border-t border-gray-400">
                          <span>Total:</span>
                          <span>
                            {formatarMoeda(previewDocumento?.total || 0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* QR Code */}
                    {previewDocumento?.qrCode && qrCodeUrl && (
                      <div className="flex justify-center mt-8">
                        <div className="p-2 bg-white border border-gray-300 rounded">
                          <img
                            src={qrCodeUrl}
                            alt="QR Code"
                            className="w-28 h-28"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-10 text-center text-xs text-gray-500">
                      Este é um documento gerado eletronicamente •{" "}
                      {new Date().toLocaleString("pt-AO")}
                    </div>
                  </div>

                  <DialogFooter className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setPreviewDocumento(null)}
                    >
                      Fechar
                    </Button>
                    <Button
                      onClick={() =>
                        previewDocumento && handleDownload(previewDocumento)
                      }
                    >
                      <Download className="mr-2 h-4 w-4" /> Baixar PDF
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Modal de Email */}
              <Dialog
                open={!!emailAberto}
                onOpenChange={() => setEmailAberto(null)}
              >
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      Enviar {emailAberto?.tipo} por Email
                    </DialogTitle>
                    <DialogDescription>
                      Documento: <strong>{emailAberto?.numero}</strong> •{" "}
                      {emailAberto?.estudanteNome}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Para</Label>
                      <Input
                        value={emailForm.para}
                        onChange={(e) =>
                          setEmailForm((prev) => ({
                            ...prev,
                            para: e.target.value,
                          }))
                        }
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div>
                      <Label>Assunto</Label>
                      <Input
                        value={emailForm.assunto}
                        onChange={(e) =>
                          setEmailForm((prev) => ({
                            ...prev,
                            assunto: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Mensagem</Label>
                      <Textarea
                        value={emailForm.mensagem}
                        onChange={(e) =>
                          setEmailForm((prev) => ({
                            ...prev,
                            mensagem: e.target.value,
                          }))
                        }
                        rows={8}
                        className="resize-none"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setEmailAberto(null)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleEnviarEmail} disabled={enviando}>
                      {enviando ? (
                        <>
                          <Send className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Enviar Email
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Configurações */}
              <Sheet open={configAberta} onOpenChange={setConfigAberta}>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Configurações de Documentos</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 py-6">
                    <div>
                      <Label>Nome da Instituição</Label>
                      <Input
                        value={instituicao.nome}
                        onChange={(e) =>
                          setInstituicao((prev) => ({
                            ...prev,
                            nome: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>NIF da Instituição</Label>
                      <Input
                        value={instituicao.nif}
                        onChange={(e) =>
                          setInstituicao((prev) => ({
                            ...prev,
                            nif: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Morada</Label>
                      <Input
                        value={instituicao.morada}
                        onChange={(e) =>
                          setInstituicao((prev) => ({
                            ...prev,
                            morada: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Telefone</Label>
                      <Input
                        value={instituicao.telefone}
                        onChange={(e) =>
                          setInstituicao((prev) => ({
                            ...prev,
                            telefone: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={instituicao.email}
                        onChange={(e) =>
                          setInstituicao((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Logotipo</Label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-1" /> Carregar
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          logo.png
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="qr">Incluir Código QR</Label>
                      <input type="checkbox" id="qr" className="h-4 w-4" />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
