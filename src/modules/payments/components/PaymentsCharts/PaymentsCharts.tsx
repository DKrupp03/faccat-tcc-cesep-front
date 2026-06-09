import { Flex } from "antd";

import { usePaymentsCharts } from "../../hooks/usePaymentsCharts";
import { PaymentsStatusChart } from "./PaymentsStatusChart";
import { PaymentsMonthlyChart } from "./PaymentsMonthlyChart";
import styles from "./PaymentsCharts.module.css";

export const PaymentsCharts = () => {
  const { statusData, monthlyData, loading } = usePaymentsCharts();

  return (
    <Flex id="payments-charts" gap={24} align="stretch" className={styles.charts}>
      <PaymentsStatusChart data={statusData} loading={loading} />
      <PaymentsMonthlyChart data={monthlyData} loading={loading} />
    </Flex>
  );
};
