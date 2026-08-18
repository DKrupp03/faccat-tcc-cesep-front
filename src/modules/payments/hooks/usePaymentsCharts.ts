import { usePaymentsList } from "./usePaymentsList";

// Os gráficos refletem exatamente o conjunto filtrado da listagem (sem
// paginação). Os dados são carregados pelo PaymentsListProvider a cada
// filtragem, então aqui basta lê-los do contexto do painel.
export const usePaymentsCharts = () => {
  const { statusChart, monthlyChart, loadingCharts } = usePaymentsList();

  return {
    statusData: statusChart,
    monthlyData: monthlyChart,
    loading: loadingCharts,
  };
};
