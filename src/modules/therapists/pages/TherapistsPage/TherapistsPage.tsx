import { useEffect } from "react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

import { useModules } from "@/shared/hooks/useModules";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";

import { TherapistsProvider } from "../../providers/TherapistsProvider";
import { useTherapistsList } from "../../hooks/useTherapistsList";
import { TherapistsHeader } from "../../components/TherapistsHeader/TherapistsHeader";
import { TherapistsHeaderCards } from "../../components/TherapistsHeaderCards/TherapistsHeaderCards";
import { TherapistsTable } from "../../components/TherapistsTable/TherapistsTable";
import styles from "./TherapistsPage.module.css";

const TherapistsPage = () => {
  return (
    <TherapistsProvider>
      <TherapistsPanel />
    </TherapistsProvider>
  );
};

const TherapistsPanel = () => {
  const { t } = useTranslation();
  const { changeActiveModule } = useModules();
  const { filtratePanel } = useTherapistsList();

  useEffect(() => {
    changeActiveModule("therapists");
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex vertical className={styles.panel}>
      <CommonHeader title={t("common.modules.therapists")}>
        <TherapistsHeader />
      </CommonHeader>

      <Flex vertical gap={24} className={styles.body}>
        <TherapistsHeaderCards />
        <TherapistsTable />
      </Flex>
    </Flex>
  );
};

export default TherapistsPage;
