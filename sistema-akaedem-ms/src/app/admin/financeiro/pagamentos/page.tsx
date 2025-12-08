"use client";

import React, { useState, useEffect } from 'react';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Badge } from "@/components/ui/badge";
import { Search, Download, Eye, Loader2 } from "lucide-react";
import { paymentService, Payment } from "@/lib/api/services/payment.service";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Pagamentos() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('completed');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });

  useEffect(() => {
    loadPayments();
  }, [filterStatus, pagination.current_page]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentService.listPayments({
        status: filterStatus,
        page: pagination.current_page,
        per_page: pagination.per_page,
      });

      setPayments(response.payments || []);
      setPagination(response.pagination || pagination);
    } catch (error: any) {
      toast.error(`Erro ao carregar pagamentos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (paymentId: string) => {
    try {
      const response = await paymentService.getPayment(paymentId);
      if (response.payment) {
        setSelectedPayment(response.payment as Payment);
        setShowDetailDialog(true);
      }
    } catch (error: any) {
      toast.error(`Erro ao carregar detalhes: ${error.message}`);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      payment.student_name.toLowerCase().includes(searchLower) ||
      payment.student_email.toLowerCase().includes(searchLower) ||
      payment.reference.toLowerCase().includes(searchLower) ||
      payment.course.name.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      completed: 'default',
      pending: 'secondary',
      processing: 'secondary',
      failed: 'destructive',
      cancelled: 'outline',
    };

    const labels: Record<string, string> = {
      completed: 'Completo',
      pending: 'Pendente',
      processing: 'Processando',
      failed: 'Falhou',
      cancelled: 'Cancelado',
    };

    return (
      <Badge variant={variants[status] || 'default'}>
        {labels[status] || status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
            <NavbarH />

          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Pagamentos</h1>
                <p className="text-muted-foreground">
                  Visualize todos os pagamentos efetuados com sucesso
                </p>
            </div>
                  </div>

            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
                <CardDescription>
                  Filtre os pagamentos por status e pesquise por estudante ou curso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Pesquisar por estudante, email, referência ou curso..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="completed">Completos</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="processing">Processando</SelectItem>
                      <SelectItem value="failed">Falhados</SelectItem>
                      <SelectItem value="cancelled">Cancelados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Pagamentos</CardTitle>
                <CardDescription>
                  Total: {pagination.total} pagamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredPayments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum pagamento encontrado
                  </div>
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Referência</TableHead>
                          <TableHead>Estudante</TableHead>
                          <TableHead>Curso</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-mono text-sm">
                              {payment.reference}
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{payment.student_name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {payment.student_email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{payment.course.name}</TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(payment.amount)}
                            </TableCell>
                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                            <TableCell>
                              {payment.paid_at
                                ? formatDate(payment.paid_at)
                                : formatDate(payment.created_at)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetails(payment.id)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {pagination.last_page > 1 && (
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                          Página {pagination.current_page} de {pagination.last_page}
                  </div>
                        <div className="flex gap-2">
                    <Button
                      variant="outline"
                            size="sm"
                            onClick={() =>
                              setPagination({
                                ...pagination,
                                current_page: Math.max(1, pagination.current_page - 1),
                              })
                            }
                            disabled={pagination.current_page === 1}
                          >
                            Anterior
                    </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setPagination({
                                ...pagination,
                                current_page: Math.min(
                                  pagination.last_page,
                                  pagination.current_page + 1
                                ),
                              })
                            }
                            disabled={pagination.current_page === pagination.last_page}
                          >
                            Próxima
                                </Button>
                              </div>
                            </div>
                    )}
                  </>
                )}
              </CardContent>
                          </Card>
                      </div>
                    </div>
      </SidebarInset>

      {/* Dialog de Detalhes */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Pagamento</DialogTitle>
              <DialogDescription>
              Informações completas sobre o pagamento
              </DialogDescription>
            </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Referência
                  </label>
                  <p className="font-mono">{selectedPayment.reference}</p>
                  </div>
                  <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <p>{getStatusBadge(selectedPayment.status)}</p>
                  </div>
                  <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Valor
                  </label>
                  <p className="font-semibold text-lg">
                    {formatCurrency(selectedPayment.amount)}
                  </p>
                  </div>
                {selectedPayment.gpo_transaction_id && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      ID Transação GPO
                    </label>
                    <p className="font-mono text-sm">
                      {selectedPayment.gpo_transaction_id}
                    </p>
                  </div>
                )}
                  </div>

                  <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Estudante
                </label>
                <div className="mt-1">
                  <p className="font-medium">{selectedPayment.student_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPayment.student_email}
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    ID: {selectedPayment.student_id}
                  </p>
                  </div>
                </div>

                  <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Curso
                </label>
                <p className="mt-1">{selectedPayment.course.name}</p>
                {selectedPayment.course.code && (
                  <p className="text-sm text-muted-foreground">
                    Código: {selectedPayment.course.code}
                  </p>
                )}
                    </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Data de Criação
                  </label>
                  <p>{formatDate(selectedPayment.created_at)}</p>
                  </div>
                {selectedPayment.paid_at && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Data de Pagamento
                    </label>
                    <p>{formatDate(selectedPayment.paid_at)}</p>
                  </div>
                )}
              </div>

              {selectedPayment.failure_reason && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Motivo da Falha
                  </label>
                  <p className="text-destructive">{selectedPayment.failure_reason}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
    </SidebarProvider>
  );
}
