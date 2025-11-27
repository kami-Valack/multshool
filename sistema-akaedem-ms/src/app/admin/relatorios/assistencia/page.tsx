"use client";

import { useState, useRef, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Brain,
  History,
  Settings,
  Send,
  Paperclip,
  FileText,
  Download,
  Search,
  Plus,
  Trash2,
  Sparkles,
  BarChart3,
  FileSpreadsheet,
  GraduationCap,
  DollarSign,
  Calendar,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "table" | "code";
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

const documentTypes = [
  "Declaração de matrícula",
  "Certificado",
  "Relatório de aproveitamento",
  "Carta de transferência",
  "Notificação administrativa",
];

const quickSuggestions = [
  "Gerar relatório de propinas em atraso",
  "Criar declaração de matrícula para João Silva",
  "Mostrar notas do 12º A",
  "Análise de desempenho por curso",
];

export default function AssistenteIA() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Relatório de propinas",
      lastMessage: "Mostra alunos com dívidas...",
      timestamp: new Date(),
      messages: [
        {
          id: "m1",
          role: "user",
          content: "Mostra alunos com propinas em atraso",
          timestamp: new Date(),
        },
        {
          id: "m2",
          role: "assistant",
          content:
            "Aqui tens os alunos com dívidas:\n\n| Aluno | Valor | Data |\n|-------|-------|------|\n| Ana Silva | 15.000 Kz | 01/10 |\n| João Mendes | 8.500 Kz | 15/09 |",
          timestamp: new Date(),
          type: "table",
        },
      ],
    },
  ]);

  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrar conversas com base na pesquisa
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentConversation) {
      setMessages(currentConversation.messages);
    } else {
      setMessages([]);
    }
  }, [currentConversation]);

  const startNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "Nova conversa",
      lastMessage: "",
      timestamp: new Date(),
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setCurrentConversation(newConv);
  };

  const selectConversation = (conv: Conversation) => {
    setCurrentConversation(conv);
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsGenerating(true);

    // Atualiza título da conversa se for nova
    if (currentConversation && currentConversation.title === "Nova conversa") {
      const title = input.length > 30 ? input.substring(0, 30) + "..." : input;
      setCurrentConversation((prev) => (prev ? { ...prev, title } : null));
      setConversations((prev) =>
        prev.map((c) => (c.id === currentConversation.id ? { ...c, title } : c))
      );
    }

    // Simulação de resposta
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          `Compreendido! Aqui tens o resultado para: "${input}"\n\n` +
          `> **Tabela de exemplo:**\n` +
          `| Nome | Curso | Média |\n` +
          `|------|-------|-------|\n` +
          `| Maria | Informática | 17.3 |\n` +
          `| Pedro | Contabilidade | 15.8 |\n`,
        timestamp: new Date(),
        type: "table",
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Atualiza conversa
      if (currentConversation) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === currentConversation.id
              ? {
                  ...c,
                  messages: finalMessages,
                  lastMessage:
                    assistantMessage.content.substring(0, 50) + "...",
                }
              : c
          )
        );
      }

      setIsGenerating(false);
    }, 1200);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
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
        <div className="flex flex-col h-screen">
          <NavbarH />

          {/* Cabeçalho */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
            <div className="container flex items-center justify-between py-4 px-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" />
                  Assistente de IA
                </h1>
                <p className="text-sm text-muted-foreground">
                  Converse, gere documentos e obtenha respostas inteligentes.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startNewConversation}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo chat
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Esquerda - Histórico */}
            <div className="w-80 border-r bg-muted/10 flex flex-col">
              <div className="p-4 border-b space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Pesquisar conversas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="w-full" onClick={startNewConversation}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova conversa
                </Button>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="default"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Gerar Documento
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-96">
                    <SheetHeader>
                      <SheetTitle>Geração de Documentos</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Selecione o tipo de documento para gerar automaticamente
                        com IA.
                      </p>
                      <Separator />
                      <div className="space-y-2">
                        {documentTypes.map((type) => (
                          <Card
                            key={type}
                            className="p-3 cursor-pointer hover:bg-accent transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                {type}
                              </span>
                              <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                          </Card>
                        ))}
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Button className="w-full">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Gerar com IA
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Exportar PDF
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredConversations.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-8">
                      {searchQuery
                        ? "Nenhuma conversa encontrada"
                        : "Nenhuma conversa ainda"}
                    </p>
                  ) : (
                    filteredConversations.map((conv) => (
                      <Card
                        key={conv.id}
                        className={`p-3 mb-2 cursor-pointer transition-colors hover:bg-accent group relative ${
                          currentConversation?.id === conv.id ? "bg-accent" : ""
                        }`}
                        onClick={() => selectConversation(conv)}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => deleteConversation(conv.id, e)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="pr-8">
                          <p className="font-medium text-sm truncate">
                            {conv.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {conv.lastMessage || "Nova conversa"}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {format(conv.timestamp, "dd MMM, HH:mm", {
                              locale: pt,
                            })}
                          </span>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Área Principal - Chat */}
            <div className="flex-1 flex flex-col relative">
              <ScrollArea className="flex-1 p-6">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Sparkles className="w-16 h-16 mb-4 text-primary/20" />
                    <h3 className="text-lg font-medium">
                      Bem-vindo ao Assistente de IA
                    </h3>
                    <p className="mt-2 max-w-md">
                      Pergunte sobre o sistema, gere relatórios, crie documentos
                      ou analise dados académicos.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-2xl">
                      {quickSuggestions.map((sug, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickSuggestion(sug)}
                        >
                          {sug}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-4xl mx-auto">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex gap-3 max-w-3xl ${
                            msg.role === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {msg.role === "user" ? (
                                "U"
                              ) : (
                                <Brain className="w-4 h-4" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-xl px-4 py-3 max-w-xl ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {msg.type === "table" ? (
                              <div className="text-sm font-mono">
                                {msg.content.split("\n").map((line, i) => {
                                  if (
                                    line.startsWith("|") &&
                                    !line.includes(">")
                                  ) {
                                    const cells = line
                                      .split("|")
                                      .filter(Boolean)
                                      .map((s) => s.trim());
                                    if (cells.length > 1) {
                                      return i === 1 ? (
                                        <div
                                          key={i}
                                          className="border-b border-foreground/20 pb-1 mb-2 font-medium"
                                        >
                                          {cells.join(" │ ")}
                                        </div>
                                      ) : (
                                        <div key={i} className="py-1">
                                          {cells.join(" │ ")}
                                        </div>
                                      );
                                    }
                                  }
                                  return (
                                    <div key={i} className="mb-1">
                                      {line}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-sm whitespace-pre-wrap">
                                {msg.content}
                              </p>
                            )}
                            <p className="text-xs opacity-70 mt-2">
                              {format(msg.timestamp, "HH:mm", { locale: pt })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isGenerating && (
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            <Brain className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-xl px-4 py-3">
                          <div className="flex gap-1">
                            <div
                              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>

              {/* Input */}
              <div className="border-t bg-background p-4">
                <div className="flex gap-2 items-end max-w-4xl mx-auto">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Input
                    ref={inputRef}
                    placeholder="Como posso ajudar hoje?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && handleSend()
                    }
                    className="flex-1"
                    disabled={isGenerating}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isGenerating}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Botão Flutuante - Gerar Documento */}
          <Sheet>
            <SheetTrigger asChild>
            </SheetTrigger>
            <SheetContent side="right" className="w-96">
              <SheetHeader>
                <SheetTitle>Geração de Documentos</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Selecione o tipo de documento para gerar automaticamente com
                  IA.
                </p>
                <Separator />
                <div className="space-y-2">
                  {documentTypes.map((type) => (
                    <Card
                      key={type}
                      className="p-3 cursor-pointer hover:bg-accent transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{type}</span>
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                    </Card>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar com IA
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar PDF
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Modal de Configurações */}
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Configurações da IA</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-medium mb-3">Modo de Resposta</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mode"
                        className="w-4 h-4"
                        defaultChecked
                      />
                      <span>Modo rápido (respostas curtas)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="mode" className="w-4 h-4" />
                      <span>Modo detalhado (explicações completas)</span>
                    </label>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3">Integrações</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4"
                      />
                      <GraduationCap className="w-4 h-4" /> Académico
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4"
                      />
                      <DollarSign className="w-4 h-4" /> Financeiro
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <Calendar className="w-4 h-4" /> Calendário
                    </label>
                  </div>
                </div>
                <Separator />
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar todo o histórico
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
