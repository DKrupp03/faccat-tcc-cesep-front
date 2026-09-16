import { useEffect } from "react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

import { useLockedTherapistId } from "@/modules/auth/hooks/useLockedTherapistId";
import { useModules } from "@/shared/hooks/useModules";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";
import { TOKENS } from "@/shared/theme";

import { PatientsProvider } from "../../providers/PatientsProvider";
import { usePatientsList } from "../../hooks/usePatientsList";
import { PatientsHeader } from "../../components/PatientsHeader/PatientsHeader";
import { PatientsHeaderCards } from "../../components/PatientsHeaderCards/PatientsHeaderCards";
import { PatientsTable } from "../../components/PatientsTable/PatientsTable";
import styles from "./PatientsPage.module.css";

const PatientsPage = () => {
  const therapistId = useLockedTherapistId();

  return (
    <PatientsProvider therapistId={therapistId}>
      <PatientsPanel />
    </PatientsProvider>
  );
};

const PatientsPanel = () => {
  const { t } = useTranslation();
  const { changeActiveModule } = useModules();
  const { filtratePanel, loading, total, totalActive } = usePatientsList();

  useEffect(() => {
    changeActiveModule("patients");
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex vertical className={styles.panel}>
      <CommonHeader
        title={t("common.modules.patients")}
        subtitle={loading ? undefined : t("patients.subtitle", { active: totalActive, total })}
      >
        <PatientsHeader />
      </CommonHeader>

      <Flex vertical gap={TOKENS.space[24]} className={styles.body}>
        <PatientsHeaderCards />
        <PatientsTable />
      </Flex>
    </Flex>
  );
};

export default PatientsPage;
