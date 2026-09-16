import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";

import { TOKENS } from "@/shared/theme";
import {
  formatShortMonth,
  formatCurrency,
  formatCurrencyCompact,
} from "@/shared/utils/formatters";

import type { PaymentMonthlyChartItem } from "../../types/payment";
import { ChartCard } from "./ChartCard";
import styles from "./PaymentsCharts.module.css";

const { color: C, font: F, radius: R } = TOKENS;
const BAR_RADIUS: [number, number, number, number] = [R["2xs"], R["2xs"], 0, 0];

type PaymentsMonthlyChartProps = {
  data: PaymentMonthlyChartItem[];
  loading?: boolean;
};

export const PaymentsMonthlyChart = ({
  data,
  loading,
}: PaymentsMonthlyChartProps) => {
  const { t } = useTranslation();

  const renderTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;

    const item = payload[0].payload as PaymentMonthlyChartItem;

    const rows = [
      {
        color: C.accent,
        label: t("payments.charts.received"),
        value: item.received,
        count: item.received_count,
      },
      {
        color: C.warning,
        label: t("payments.charts.toReceive"),
        value: item.to_receive,
        count: item.to_receive_count,
      },
    ];

    return (
      <div className={styles.tooltip}>
        <span className={styles.tooltipMonth}>
          {formatShortMonth(String(label))}
        </span>
        {rows.map((row) => (
          <div key={row.label} className={styles.tooltipRow}>
            <span
              className={styles.tooltipDot}
              style={{ backgroundColor: row.color }}
            />
            <span className={styles.tooltipText}>
              {`${row.label}: ${formatCurrency(row.value)} (${row.count})`}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ChartCard
      title={t("payments.charts.monthlyTitle")}
      info={t("payments.charts.monthlyTooltip")}
      loading={loading}
      className={styles.monthlyCard}
      extra={(
        <Flex align="center" gap={TOKENS.space[16]}>
          <span className={styles.chartLegend}>
            <span className={styles.tooltipDot} style={{ backgroundColor: C.accent }} />
            {t("payments.charts.received")}
          </span>
          <span className={styles.chartLegend}>
            <span className={styles.tooltipDot} style={{ backgroundColor: C.warning }} />
            {t("payments.charts.toReceive")}
          </span>
        </Flex>
      )}
    >
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          barGap={4}
          margin={{ top: 8, right: 8, left: 4, bottom: 0 }}
        >
          <XAxis
            dataKey="month"
            tickFormatter={formatShortMonth}
            tickLine={false}
            axisLine={{ stroke: C.border }}
            tick={{ fontSize: F.size.xs, fill: C.textMuted }}
          />
          <YAxis
            width={72}
            tickFormatter={formatCurrencyCompact}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: F.size.xs, fill: C.textMuted }}
          />
          <Tooltip cursor={{ fill: C.bg }} content={renderTooltip} />
          <Bar
            dataKey="received"
            name={t("payments.charts.received")}
            fill={C.accent}
            radius={BAR_RADIUS}
            maxBarSize={14}
          />
          <Bar
            dataKey="to_receive"
            name={t("payments.charts.toReceive")}
            fill={C.warning}
            radius={BAR_RADIUS}
            maxBarSize={14}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
