import { useEffect, useMemo } from "react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useModules } from "@/shared/hooks/useModules";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";

import { PatientsProvider } from "../../providers/PatientsProvider";
import { usePatientsList } from "../../hooks/usePatientsList";
import { PatientsHeader } from "../../components/PatientsHeader/PatientsHeader";
import { PatientsHeaderCards } from "../../components/PatientsHeaderCards/PatientsHeaderCards";
import { PatientsTable } from "../../components/PatientsTable/PatientsTable";
import styles from "./PatientsPage.module.css";

const PatientsPage = () => {
  const { profile } = useAuth();

  const therapistId = useMemo(() => (
    profile?.role === "therapist" && !profile.admin ? profile.id : undefined
  ), [profile]);

  return (
    <PatientsProvider therapistId={therapistId}>
      <PatientsPanel />
    </PatientsProvider>
  );
};

const PatientsPanel = () => {
  const { t } = useTranslation();
  const { changeActiveModule } = useModules();
  const { filtratePanel } = usePatientsList();

  useEffect(() => {
    changeActiveModule("patients");
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex vertical className={styles.panel}>
      <CommonHeader title={t("common.modules.patients")}>
        <PatientsHeader />
      </CommonHeader>

      <Flex vertical gap={24} className={styles.body}>
        <PatientsHeaderCards />
        <PatientsTable />
      </Flex>
    </Flex>
  );
};

export default PatientsPage;
