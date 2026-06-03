/* eslint-disable react-refresh/only-export-components */
import {
  IconClock,
  IconCircleCheck,
  IconUserCheck,
  IconUserX,
  IconBan,
} from "@tabler/icons-react";

import { COLORS } from "@/shared/theme";
import type { ServiceStatus } from "../types/service";

const SERVICE_STATUS_COLORS: Record<ServiceStatus, string> = {
  scheduled: COLORS.grey70,
  confirmed: COLORS.blue,
  attended: COLORS.gren,
  no_show: COLORS.yellow,
  cancelled: COLORS.red,
};

const SERVICE_STATUS_ICONS: Record<ServiceStatus, typeof IconClock> = {
  scheduled: IconClock,
  confirmed: IconCircleCheck,
  attended: IconUserCheck,
  no_show: IconUserX,
  cancelled: IconBan,
};

export const getServiceStatusColor = (status: ServiceStatus) =>
  SERVICE_STATUS_COLORS[status];

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
