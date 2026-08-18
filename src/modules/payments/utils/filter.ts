import type { PaymentsFilter, PaymentsFilterPayload } from "../types/payment";

// Monta o payload de filtro enviado ao back-end, descartando campos vazios.
// A listagem e os gráficos usam este helper para enviarem exatamente o mesmo
// filtro e, assim, enxergarem o mesmo conjunto de pagamentos.
export const buildPaymentsFilterPayload = (
  filter: PaymentsFilter,
): PaymentsFilterPayload => {
  const entries = Object.entries(filter).filter(([, value]) => (
    value !== undefined && value !== null && value !== ""
  ));

  return { payments: Object.fromEntries(entries) as PaymentsFilter };
};
