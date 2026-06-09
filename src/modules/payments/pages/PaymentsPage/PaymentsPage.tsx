import { useEffect, useMemo } from "react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useModules } from "@/shared/hooks/useModules";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";

import { PaymentsProvider } from "../../providers/PaymentsProvider";
import { usePaymentsList } from "../../hooks/usePaymentsList";
import { PaymentsHeader } from "../../components/PaymentsHeader/PaymentsHeader";
import { PaymentsHeaderCards } from "../../components/PaymentsHeaderCards/PaymentsHeaderCards";
import { PaymentsTable } from "../../components/PaymentsTable/PaymentsTable";
import styles from "./PaymentsPage.module.css";

const PaymentsPage = () => {
  const { profile } = useAuth();

  const therapistId = useMemo(() => (
    profile?.role === "therapist" && !profile.admin ? profile.id : undefined
  ), [profile]);

  return (
    <PaymentsProvider therapistId={therapistId}>
      <PaymentsPanel />
    </PaymentsProvider>
  );
};

const PaymentsPanel = () => {
  const { t } = useTranslation();
  const { changeActiveModule } = useModules();
  const { filtratePanel } = usePaymentsList();

  useEffect(() => {
    changeActiveModule("payments");
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex vertical className={styles.panel}>
      <CommonHeader title={t("common.modules.payments")}>
        <PaymentsHeader />
      </CommonHeader>

      <Flex vertical gap={24} className={styles.body}>
        <PaymentsHeaderCards />
        <PaymentsTable />
      </Flex>
    </Flex>
  );
};

export default PaymentsPage;
