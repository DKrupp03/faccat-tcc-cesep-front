/* eslint-disable react-refresh/only-export-components */
import {
  IconClock,
  IconCircleCheck,
  IconUserCheck,
  IconUserX,
  IconBan,
} from "@tabler/icons-react";

import { TOKENS } from "@/shared/theme";
import type { ServiceStatus } from "../types/service";

const { color: C } = TOKENS;

// Cor do ponto/ícone, cor do texto e fundo suave de cada status (padrão C).
const SERVICE_STATUS_COLORS: Record<ServiceStatus, { color: string; text: string; bg: string }> = {
  scheduled: { color: C.textMuted, text: C.text, bg: C.rail },
  confirmed: { color: C.accent, text: C.accent, bg: C.accentSoft },
  attended: { color: C.info, text: C.info, bg: C.infoBg },
  no_show: { color: C.warning, text: C.warningText, bg: C.warningBg },
  cancelled: { color: C.danger, text: C.danger, bg: C.dangerBg },
};

const SERVICE_STATUS_ICONS: Record<ServiceStatus, typeof IconClock> = {
  scheduled: IconClock,
  confirmed: IconCircleCheck,
  attended: IconUserCheck,
  no_show: IconUserX,
  cancelled: IconBan,
};

export const getServiceStatusColor = (status: ServiceStatus) =>
  SERVICE_STATUS_COLORS[status].color;

export const getServiceStatusTextColor = (status: ServiceStatus) =>
  SERVICE_STATUS_COLORS[status].text;

export const getServiceStatusBgColor = (status: ServiceStatus) =>
  SERVICE_STATUS_COLORS[status].bg;

type ServiceStatusIconProps = {
  status: ServiceStatus;
  size?: number;
  color?: string;
};

export const ServiceStatusIcon = ({
  status,
  size = 16,
  color,
}: ServiceStatusIconProps) => {
  const Icon = SERVICE_STATUS_ICONS[status];

  return <Icon size={size} color={color ?? getServiceStatusColor(status)} />;
};
