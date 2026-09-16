import { Flex, Typography, Skeleton, Tooltip } from "antd";
import { IconHelpCircle } from "@tabler/icons-react";

import { TOKENS } from "@/shared/theme";

import styles from "./PaymentsCharts.module.css";

const { Title } = Typography;

type ChartCardProps = {
  title: string;
  extra?: React.ReactNode;
  info?: string;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const ChartCard = ({
  title,
  extra,
  info,
  loading,
  className,
  children,
}: ChartCardProps) => {
  if (loading) {
    return (
      <Skeleton
        className={`${styles.card} ${className ?? ""}`}
        style={{ padding: TOKENS.space[24] }}
        paragraph={{ rows: 6 }}
        active
      />
    );
  }

  return (
    <Flex vertical className={`${styles.card} ${className ?? ""}`}>
      <Flex align="center" justify="space-between" gap={TOKENS.space[16]} className={styles.header}>
        <Flex align="center" gap={TOKENS.space[8]}>
        <Title level={5} className={styles.title}>{title}</Title>
        {info && (
          <Tooltip title={info}>
            <IconHelpCircle
              size={15}
              color={TOKENS.color.textMuted}
              className={styles.info}
            />
          </Tooltip>
        )}
        </Flex>
        {extra}
      </Flex>

      <Flex justify="center" align="center" className={styles.body}>
        {children}
      </Flex>
    </Flex>
  );
};
