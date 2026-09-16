import { useTranslation } from "react-i18next";

import type { ServiceStatus } from "../../types/service";
import { getServiceStatusColor, getServiceStatusTextColor } from "../../utils/status";

import styles from "./ServiceStatusBadge.module.css";

type ServiceStatusBadgeProps = {
  // plain: texto na cor do contexto (ex.: dentro de um select)
  plain?: boolean;
  status?: ServiceStatus;
};

export const ServiceStatusBadge = ({
  status,
  plain = false,
}: ServiceStatusBadgeProps) => {
  const { t } = useTranslation();

  if (!status) return;

  return (
    <span className={styles.badge} style={plain ? undefined : { color: getServiceStatusTextColor(status) }}>
      <span className={styles.dot} style={{ backgroundColor: getServiceStatusColor(status) }} />
      {t(`services.status.${status}`)}
    </span>
  );
};
