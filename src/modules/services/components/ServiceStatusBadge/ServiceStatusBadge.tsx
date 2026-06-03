import { useTranslation } from "react-i18next";
import { Badge, Flex } from "antd";

import { COLORS } from "@/shared/theme";
import type { ServiceStatus } from "../../types/service";
import { ServiceStatusIcon, getServiceStatusColor } from "../../utils/status";

import styles from "./ServiceStatusBadge.module.css";

type ServiceStatusBadgeProps = {
  status?: ServiceStatus;
};

export const ServiceStatusBadge = ({
  status,
}: ServiceStatusBadgeProps) => {
  const { t } = useTranslation();

  if (!status) return;

  return (
    <Badge
      style={{ backgroundColor: getServiceStatusColor(status) }}
      count={
        <Flex align="center" justify="center" gap={4} className={styles.badge}>
          <ServiceStatusIcon status={status} color={COLORS.white} />
          <span>
            {t(`services.status.${status}`)}
          </span>
        </Flex>
      }
    />
  );
};
