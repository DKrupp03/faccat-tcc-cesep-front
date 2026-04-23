import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Badge, Flex } from "antd";
import {
  IconCircleCheck,
  IconCircleX,
  IconAlertCircle,
} from "@tabler/icons-react";

import type { PaymentStatus } from "../../types/payment";
import { COLORS } from "@/shared/theme";

import styles from "./PaymentStatusBadge.module.css";

type PaymentStatusBadgeProps = {
  status?: PaymentStatus;
};

export const PaymentStatusBadge = ({
  status,
}: PaymentStatusBadgeProps) => {
  const { t } = useTranslation();

  const backgroundColor = useMemo(() => {
    if (status === "paid") return COLORS.blue;
    if (status === "unpaid") return COLORS.yellow;
    if (status === "overdue") return COLORS.red;
  }, [status]);

  const icon = useMemo(() => {
    if (status === "paid") return <IconCircleCheck size={14} color={COLORS.white} />;
    if (status === "unpaid") return <IconCircleX size={14} color={COLORS.white} />;
    if (status === "overdue") return <IconAlertCircle size={14} color={COLORS.white} />;
  }, [status]);

  if (!status) return;

  return (
    <Badge
      style={{ backgroundColor }}
      count={
        <Flex align="center" justify="center" gap={4} className={styles.badge}>
          {icon}
          <span>
            {t(`payments.status.${status}`)}
          </span>
        </Flex>
      }
    />
  );
};
