import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Badge, Flex } from "antd";
import {
  IconCircleCheck,
  IconCircleX,
  IconAlertCircle,
  IconGift,
} from "@tabler/icons-react";

import type { PaymentStatus } from "../../types/payment";
import { PAYMENT_STATUS_COLORS } from "../../utils/status";
import { TOKENS } from "@/shared/theme";

import styles from "./PaymentStatusBadge.module.css";

type PaymentStatusBadgeProps = {
  status?: PaymentStatus;
};

export const PaymentStatusBadge = ({
  status,
}: PaymentStatusBadgeProps) => {
  const { t } = useTranslation();

  const colors = status ? PAYMENT_STATUS_COLORS[status] : undefined;

  const icon = useMemo(() => {
    if (status === "paid") return <IconCircleCheck size={16} />;
    if (status === "unpaid") return <IconCircleX size={16} />;
    if (status === "overdue") return <IconAlertCircle size={16} />;
    if (status === "free") return <IconGift size={16} />;
  }, [status]);

  if (!status) return;

  return (
    <Badge
      style={{ backgroundColor: colors?.bg, color: colors?.text }}
      count={
        <Flex align="center" justify="center" gap={TOKENS.space[4]} className={styles.badge}>
          {icon}
          <span>
            {t(`payments.status.${status}`)}
          </span>
        </Flex>
      }
    />
  );
};
