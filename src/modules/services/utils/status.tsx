import { TOKENS } from "@/shared/theme";
import type { ServiceStatus } from "../types/service";

const { color: C } = TOKENS;

// Cor do ponto, cor do texto e fundo suave de cada status (padrão C).
const SERVICE_STATUS_COLORS: Record<ServiceStatus, { color: string; text: string; bg: string }> = {
  scheduled: { color: C.statusScheduled, text: C.statusScheduledText, bg: C.statusScheduledBg },
  confirmed: { color: C.statusConfirmed, text: C.statusConfirmedText, bg: C.statusConfirmedBg },
  attended: { color: C.statusAttended, text: C.statusAttendedText, bg: C.statusAttendedBg },
  no_show: { color: C.statusNoShow, text: C.statusNoShowText, bg: C.statusNoShowBg },
  cancelled: { color: C.statusCancelled, text: C.statusCancelledText, bg: C.statusCancelledBg },
};

export const getServiceStatusColor = (status: ServiceStatus) =>
  SERVICE_STATUS_COLORS[status].color;

export const getServiceStatusTextColor = (status: ServiceStatus) =>
  SERVICE_STATUS_COLORS[status].text;

export const getServiceStatusBgColor = (status: ServiceStatus) =>
  SERVICE_STATUS_COLORS[status].bg;
