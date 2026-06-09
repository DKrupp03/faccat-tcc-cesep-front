import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import {
  IconFilter,
  IconReload,
  IconPlus,
  IconSortAscending,
  IconSortDescending,
  IconChartBar,
} from "@tabler/icons-react";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonOrderButton } from "@/shared/components/CommonOrderButton/CommonOrderButton";

import { usePaymentsList } from "../../hooks/usePaymentsList";
import { usePaymentForm } from "../../hooks/usePaymentForm";
import type { PaymentsOrder } from "../../types/payment";

export const PaymentsHeader = () => {
  const { t } = useTranslation();
  const { openFilter, filtratePanel, orderBy, filter } = usePaymentsList();
  const { openForm } = usePaymentForm();

  const scrollToCharts = () => {
    document.getElementById("payments-charts")?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const paymentsOrderOptions = useMemo(() => ([
    {
      value: "expiration_date_desc",
      label: t("payments.order.expirationDesc"),
      icon: <IconSortDescending size={16} />,
    },
    {
      value: "expiration_date_asc",
      label: t("payments.order.expirationAsc"),
      icon: <IconSortAscending size={16} />,
    },
    {
      value: "payment_date_desc",
      label: t("payments.order.paymentDesc"),
      icon: <IconSortDescending size={16} />,
    },
    {
      value: "payment_date_asc",
      label: t("payments.order.paymentAsc"),
      icon: <IconSortAscending size={16} />,
    },
  ]), [t]);

  return (
    <>
      <CommonOrderButton
        value={orderBy}
        onChange={(newOrderBy) => filtratePanel(filter, newOrderBy as PaymentsOrder)}
        options={paymentsOrderOptions}
        width={250}
      />
      <Tooltip title={t("payments.actions.showCharts")}>
        <CommonButton
          onClick={scrollToCharts}
          icon={<IconChartBar size={18} />}
          size="large"
          circular
          outline
        />
      </Tooltip>
      <Tooltip title={t("common.actions.reload")}>
        <CommonButton
          onClick={() => filtratePanel()}
          icon={<IconReload size={18} />}
          size="large"
          circular
          outline
        />
      </Tooltip>
      <Tooltip title={t("common.actions.filtrate")}>
        <CommonButton
          onClick={openFilter}
          icon={<IconFilter size={18} />}
          size="large"
          circular
          outline
        />
      </Tooltip>
      <Tooltip title={t("payments.actions.create")}>
        <CommonButton
          onClick={() => openForm()}
          icon={<IconPlus size={18} />}
          size="large"
          buttonVariant="primary"
          circular
        />
      </Tooltip>
    </>
  );
};
