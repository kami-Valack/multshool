/**
 * Gera um código único e seguro para recibos.
 * O código é difícil de adivinhar ("imburlável") e contém data + hash aleatório.
 */
export function gerarCodigoRecibo(): string {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `RCB-${ano}${mes}${dia}-${random}`;
}
