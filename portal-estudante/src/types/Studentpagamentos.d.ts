export interface Pagamento {
  id: string;
  alunoId: string;
  nome: string;
  valor: number;
  data: string;
  estado?: "pendente" | "pago" | "cancelado";
}
