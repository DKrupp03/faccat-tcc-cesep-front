import { useTranslation } from "react-i18next";

import type { PaymentStatus } from "../../types/payment";
import { PAYMENT_STATUS_COLORS } from "../../utils/status";

import styles from "./PaymentStatusBadge.module.css";

type PaymentStatusBadgeProps = {
  // plain: texto na cor do contexto (ex.: dentro de um select)
  plain?: boolean;
  status?: PaymentStatus;
};

export const PaymentStatusBadge = ({
  status,
  plain = false,
}: PaymentStatusBadgeProps) => {
  const { t } = useTranslation();

  if (!status) return;

  const colors = PAYMENT_STATUS_COLORS[status];

  return (
    <span className={styles.badge} style={plain ? undefined : { color: colors.text }}>
      <span className={styles.dot} style={{ backgroundColor: colors.color }} />
      {t(`payments.status.${status}`)}
    </span>
  );
};
