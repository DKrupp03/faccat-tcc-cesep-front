import { useEffect } from "react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

import { useLockedTherapistId } from "@/modules/auth/hooks/useLockedTherapistId";
import { useModules } from "@/shared/hooks/useModules";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";

import { PaymentsProvider } from "../../providers/PaymentsProvider";
import { usePaymentsList } from "../../hooks/usePaymentsList";
import { PaymentsHeader } from "../../components/PaymentsHeader/PaymentsHeader";
import { PaymentsHeaderCards } from "../../components/PaymentsHeaderCards/PaymentsHeaderCards";
import { PaymentsTable } from "../../components/PaymentsTable/PaymentsTable";
import { PaymentsCharts } from "../../components/PaymentsCharts/PaymentsCharts";
import { TOKENS } from "@/shared/theme";
import styles from "./PaymentsPage.module.css";

const PaymentsPage = () => {
  const therapistId = useLockedTherapistId();

  return (
    <PaymentsProvider therapistId={therapistId} withCharts>
      <PaymentsPanel />
    </PaymentsProvider>
  );
};

const PaymentsPanel = () => {
  const { t } = useTranslation();
  const { changeActiveModule } = useModules();
  const { filtratePanel, loading, total, totalFiltered } = usePaymentsList();

  useEffect(() => {
    changeActiveModule("payments");
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex vertical className={styles.panel}>
      <CommonHeader
        title={t("common.modules.payments")}
        subtitle={loading ? undefined : t("payments.subtitle", { total, filtered: totalFiltered })}
      >
        <PaymentsHeader />
      </CommonHeader>

      <Flex vertical gap={TOKENS.space[24]} className={styles.body}>
        <PaymentsHeaderCards />
        <PaymentsTable />
        <PaymentsCharts />
      </Flex>
    </Flex>
  );
};

export default PaymentsPage;
