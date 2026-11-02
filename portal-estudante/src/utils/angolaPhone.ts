/** Normaliza para 244XXXXXXXXX (GPO dsTelemovelDestinatario). */
export function normalizeAngolaMobile(input: string): string | null {
  const digits = input.replace(/\D/g, "");

  if (digits.length === 9 && digits.startsWith("9")) {
    return `244${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("244")) {
    return digits;
  }

  return null;
}

export function formatAngolaMobileDisplay(normalized244: string): string {
  if (normalized244.startsWith("244") && normalized244.length === 12) {
    return `+244 ${normalized244.slice(3, 6)} ${normalized244.slice(6)}`;
  }
  return normalized244;
}

export const BILLING_MOBILE_STORAGE_KEY = (intentId: string) =>
  `billing_mobile_${intentId}`;
