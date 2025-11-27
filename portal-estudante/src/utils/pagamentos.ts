import { Pagamento } from "@/types/Studentpagamentos";

/**
 * Calcula o valor total de uma lista de pagamentos
 * @param {Array} pagamentos - Lista de objetos contendo o campo 'valor'
 * @returns {number} Soma total dos valores
 */
/**
 * Calcula o valor total de um array que contenha o campo `valor`
 */
export function calcularTotalPagamentos<T extends { valor: number }>(pagamentos: T[]): number {
  return pagamentos.reduce((acc, curr) => acc + curr.valor, 0);
}

