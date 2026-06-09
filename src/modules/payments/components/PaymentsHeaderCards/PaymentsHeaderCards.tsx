import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  IconReportMoney,
  IconFilter,
  IconCash,
  IconCoin,
} from "@tabler/icons-react";

import { COLORS } from "@/shared/theme";
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
        icon: <IconReportMoney size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t("payments.headerCards.filtered"),
        value: totalFiltered,
        icon: <IconFilter size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t("payments.headerCards.received"),
        value: formatCurrency(totalReceived),
        icon: <IconCash size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t("payments.headerCards.toReceive"),
        value: formatCurrency(totalToReceive),
        icon: <IconCoin size={28} stroke={1.5} color={COLORS.grey70} />,
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
