import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { COLORS } from "@/shared/theme";

import type { PaymentStatus, PaymentStatusChartItem } from "../../types/payment";
import { ChartCard } from "./ChartCard";
import styles from "./PaymentsCharts.module.css";

const { Text } = Typography;

const STATUS_COLORS: Record<PaymentStatus, string> = {
  paid: COLORS.blue,
  unpaid: COLORS.yellow,
  overdue: COLORS.red,
};

type PaymentsStatusChartProps = {
  data: PaymentStatusChartItem[];
  loading?: boolean;
};

export const PaymentsStatusChart = ({
  data,
  loading,
}: PaymentsStatusChartProps) => {
  const { t } = useTranslation();

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.count, 0),
    [data],
  );

  return (
    <ChartCard
      title={t("payments.charts.statusTitle")}
      loading={loading}
      className={styles.statusCard}
    >
      <Flex
        align="center" justify="center"
        gap={32} className={styles.statusContent}
      >
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.status} fill={STATUS_COLORS[item.status]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <Flex vertical gap={16} className={styles.legend}>
          {data.map((item) => {
            const percent = total ? Math.round((item.count / total) * 100) : 0;

            return (
              <Flex key={item.status} align="center" gap={10}>
                <span
                  className={styles.legendDot}
                  style={{ backgroundColor: STATUS_COLORS[item.status] }}
                />
                <Flex vertical>
                  <Text strong className={styles.legendLabel}>
                    {t(`payments.status.${item.status}`)}
                  </Text>
                  <Text className={styles.legendValue}>
                    {`(${item.count} - ${percent}%)`}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </ChartCard>
  );
};
