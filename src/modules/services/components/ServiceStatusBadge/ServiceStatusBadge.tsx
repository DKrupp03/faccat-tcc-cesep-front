import { useTranslation } from "react-i18next";
import { Badge, Flex } from "antd";

import type { ServiceStatus } from "../../types/service";
import {
  ServiceStatusIcon,
  getServiceStatusBgColor,
  getServiceStatusTextColor,
} from "../../utils/status";
import { TOKENS } from "@/shared/theme";

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
      style={{
        backgroundColor: getServiceStatusBgColor(status),
        color: getServiceStatusTextColor(status),
      }}
      count={
        <Flex align="center" justify="center" gap={TOKENS.space[4]} className={styles.badge}>
          <ServiceStatusIcon status={status} />
          <span>
            {t(`services.status.${status}`)}
          </span>
        </Flex>
      }
    />
  );
};
