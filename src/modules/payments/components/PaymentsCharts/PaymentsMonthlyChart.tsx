import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";

import { COLORS } from "@/shared/theme";
import {
  formatShortMonth,
  formatCurrency,
  formatCurrencyCompact,
} from "@/shared/utils/formatters";

import type { PaymentMonthlyChartItem } from "../../types/payment";
import { ChartCard } from "./ChartCard";
import styles from "./PaymentsCharts.module.css";

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
        color: COLORS.blue,
        label: t("payments.charts.received"),
        value: item.received,
        count: item.received_count,
      },
      {
        color: COLORS.yellow,
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
    >
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          barGap={4}
          margin={{ top: 8, right: 8, left: 4, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke={COLORS.grey30}
          />
          <XAxis
            dataKey="month"
            tickFormatter={formatShortMonth}
            tickLine={false}
            axisLine={{ stroke: COLORS.grey30 }}
            tick={{ fontSize: 12, fill: COLORS.grey70 }}
          />
          <YAxis
            width={72}
            tickFormatter={formatCurrencyCompact}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: COLORS.grey70 }}
          />
          <Tooltip cursor={{ fill: COLORS.grey10 }} content={renderTooltip} />
          <Legend
            wrapperStyle={{ fontSize: 13 }}
            formatter={(value) => (
              <span style={{ color: COLORS.grey90 }}>{value}</span>
            )}
          />
          <Bar
            dataKey="received"
            name={t("payments.charts.received")}
            fill={COLORS.blue}
            radius={[4, 4, 0, 0]}
            maxBarSize={14}
          />
          <Bar
            dataKey="to_receive"
            name={t("payments.charts.toReceive")}
            fill={COLORS.yellow}
            radius={[4, 4, 0, 0]}
            maxBarSize={14}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
