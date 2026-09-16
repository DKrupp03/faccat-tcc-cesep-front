import { TOKENS } from "@/shared/theme";
import type { PaymentStatus } from "../types/payment";

const { color: C } = TOKENS;

// Cor do ponto/gráfico, texto e fundo suave de cada status (padrão C).
export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, { color: string; text: string; bg: string }> = {
  paid: { color: C.statusPaid, text: C.statusPaidText, bg: C.statusPaidBg },
  unpaid: { color: C.statusUnpaid, text: C.statusUnpaidText, bg: C.statusUnpaidBg },
  overdue: { color: C.statusOverdue, text: C.statusOverdueText, bg: C.statusOverdueBg },
  free: { color: C.statusFree, text: C.statusFreeText, bg: C.statusFreeBg },
};
