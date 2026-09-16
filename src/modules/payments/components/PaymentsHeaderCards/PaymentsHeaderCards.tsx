import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TOKENS } from "@/shared/theme";
import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";
import { formatCurrency } from "@/shared/utils/formatters";

import { usePaymentsList } from "../../hooks/usePaymentsList";

export const PaymentsHeaderCards = () => {
  const { t } = useTranslation();
  const {
    loading,
    total,
    totalFiltered,
    totalReceived,
    totalToReceive,
  } = usePaymentsList();

  const paymentsHeaderCards = useMemo(() => {
    return [
      {
        text: t("payments.headerCards.total"),
        value: total,
      },
      {
        text: t("payments.headerCards.filtered"),
        value: totalFiltered,
      },
      {
        text: t("payments.headerCards.received"),
        value: formatCurrency(totalReceived),
      },
      {
        text: t("payments.headerCards.toReceive"),
        value: formatCurrency(totalToReceive),
        valueColor: TOKENS.color.warningText,
      },
    ];
  }, [t, total, totalFiltered, totalReceived, totalToReceive]);

  return (
    <CommonHeaderCards
      loading={loading}
      cards={paymentsHeaderCards}
    />
  );
};
