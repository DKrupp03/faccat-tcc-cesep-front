import { Flex, Typography, Skeleton, Tooltip } from "antd";
import { IconHelpCircle } from "@tabler/icons-react";

import { COLORS } from "@/shared/theme";

import styles from "./PaymentsCharts.module.css";

const { Title } = Typography;

type ChartCardProps = {
  title: string;
  info?: string;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const ChartCard = ({
  title,
  info,
  loading,
  className,
  children,
}: ChartCardProps) => {
  if (loading) {
    return (
      <Skeleton
        className={`${styles.card} ${className ?? ""}`}
        style={{ padding: 20 }}
        paragraph={{ rows: 6 }}
        active
      />
    );
  }

  return (
    <Flex vertical className={`${styles.card} ${className ?? ""}`}>
      <Flex align="center" gap={6} className={styles.header}>
        <Title level={5}>{title}</Title>
        {info && (
          <Tooltip title={info}>
            <IconHelpCircle
              size={16}
              color={COLORS.grey70}
              className={styles.info}
            />
          </Tooltip>
        )}
      </Flex>

      <Flex justify="center" align="center" className={styles.body}>
        {children}
      </Flex>
    </Flex>
  );
};
