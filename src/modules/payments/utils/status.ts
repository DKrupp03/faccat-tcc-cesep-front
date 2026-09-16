import { TOKENS } from "@/shared/theme";
import type { PaymentStatus } from "../types/payment";

// Cor do ponto/gráfico, texto e fundo suave de cada status (padrão C).
export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, { color: string; text: string; bg: string }> = {
  paid: { color: TOKENS.color.accent, text: TOKENS.color.accent, bg: TOKENS.color.accentSoft },
  unpaid: { color: TOKENS.color.warning, text: TOKENS.color.warningText, bg: TOKENS.color.warningBg },
  overdue: { color: TOKENS.color.danger, text: TOKENS.color.danger, bg: TOKENS.color.dangerBg },
  free: { color: TOKENS.color.info, text: TOKENS.color.info, bg: TOKENS.color.infoBg },
};
