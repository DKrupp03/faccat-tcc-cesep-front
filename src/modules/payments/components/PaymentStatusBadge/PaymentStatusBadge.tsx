import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "antd";

import type { PaymentStatus } from "../../types/payment";
import { COLORS } from "@/shared/theme";

import styles from "./PaymentStatusBadge.module.css";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

export const PaymentStatusBadge = ({
  status,
}: PaymentStatusBadgeProps) => {
  const { t } = useTranslation();

  const backgroundColor = useMemo(() => {
    if (status === "paid") return COLORS.primary.main;
    if (status === "unpaid") return COLORS.secondary.yellow;
    if (status === "overdue") return COLORS.secondary.red;
  }, [status]);

  return (
    <Badge
      style={{ backgroundColor }}
      count={t(`payments.status.${status}`)}
    />
  );
};
