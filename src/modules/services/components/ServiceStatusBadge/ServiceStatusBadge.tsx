import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Badge, Flex } from "antd";
import {
  IconClock,
  IconCircleCheck,
  IconUserCheck,
  IconUserX,
  IconBan,
} from "@tabler/icons-react";

import { COLORS } from "@/shared/theme";
import type { ServiceStatus } from "../../types/service";

import styles from "./ServiceStatusBadge.module.css";

type ServiceStatusBadgeProps = {
  status?: ServiceStatus;
};

export const ServiceStatusBadge = ({
  status,
}: ServiceStatusBadgeProps) => {
  const { t } = useTranslation();

  const backgroundColor = useMemo(() => {
    if (status === "scheduled") return COLORS.grey70;
    if (status === "confirmed") return COLORS.blue;
    if (status === "attended") return COLORS.gren;
    if (status === "no_show") return COLORS.yellow;
    if (status === "cancelled") return COLORS.red;
  }, [status]);

  const icon = useMemo(() => {
    if (status === "scheduled") return <IconClock size={16} color={COLORS.white} />;
    if (status === "confirmed") return <IconCircleCheck size={16} color={COLORS.white} />;
    if (status === "attended") return <IconUserCheck size={16} color={COLORS.white} />;
    if (status === "no_show") return <IconUserX size={16} color={COLORS.white} />;
    if (status === "cancelled") return <IconBan size={16} color={COLORS.white} />;
  }, [status]);

  if (!status) return;

  return (
    <Badge
      style={{ backgroundColor }}
      count={
        <Flex align="center" justify="center" gap={4} className={styles.badge}>
          {icon}
          <span>
            {t(`services.status.${status}`)}
          </span>
        </Flex>
      }
    />
  );
};
