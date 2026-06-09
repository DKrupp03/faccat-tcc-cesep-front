import { useCallback, useEffect, useState } from "react";

import PaymentsService from "../services/PaymentsService";
import type {
  PaymentStatusChartItem,
  PaymentMonthlyChartItem,
} from "../types/payment";

// Os gráficos não são afetados pelos filtros do painel, então carregam uma
// única vez (no mount) a partir das rotas dedicadas do back-end.
export const usePaymentsCharts = () => {
  const [statusData, setStatusData] = useState<PaymentStatusChartItem[]>([]);
  const [monthlyData, setMonthlyData] = useState<PaymentMonthlyChartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCharts = useCallback(async () => {
    setLoading(true);

    try {
      const [statusResponse, monthlyResponse] = await Promise.all([
        PaymentsService.getStatusChart(),
        PaymentsService.getMonthlyChart(),
      ]);

      if (statusResponse.success) setStatusData(statusResponse.status_chart);
      if (monthlyResponse.success) setMonthlyData(monthlyResponse.monthly_chart);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharts();
  }, [fetchCharts]);

  return { statusData, monthlyData, loading };
};
