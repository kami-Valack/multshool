/** Normaliza para 9 dígitos nacionais (GPO dsTelemovelDestinatario — sem 244). */
export function normalizeAngolaMobile(input: string): string | null {
  let digits = input.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("244")) {
    digits = digits.slice(3);
  }

  if (digits.length === 9 && digits.startsWith("9")) {
    return digits;
  }

  return null;
}

export function formatAngolaMobileDisplay(nineDigits: string): string {
  const normalized = normalizeAngolaMobile(nineDigits) ?? nineDigits;
  if (normalized.length === 9) {
    return `+244 ${normalized.slice(0, 3)} ${normalized.slice(3)}`;
  }
  return normalized;
}

export const BILLING_MOBILE_STORAGE_KEY = (intentId: string) =>
  `billing_mobile_${intentId}`;
