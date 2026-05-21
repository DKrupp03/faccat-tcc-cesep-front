import { useEffect, useMemo } from "react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useModules } from "@/shared/hooks/useModules";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";

import { ServicesProvider } from "../../providers/ServicesProvider";
import { useServicesList } from "../../hooks/useServicesList";
import { ServicesHeader } from "../../components/ServicesHeader/ServicesHeader";
import { ServicesHeaderCards } from "../../components/ServicesHeaderCards/ServicesHeaderCards";
import { ServicesTable } from "../../components/ServicesTable/ServicesTable";
import styles from "./ServicesPage.module.css";

const ServicesPage = () => {
  const { profile } = useAuth();
  
  const therapistId = useMemo(() => (
    profile?.role === "therapist" && !profile.admin ? profile.id : undefined
  ), [profile]);

  return (
    <ServicesProvider therapistId={therapistId}>
      <ServicesPanel />
    </ServicesProvider>
  );
};

const ServicesPanel = () => {
  const { t } = useTranslation();
  const { changeActiveModule } = useModules();
  const { filtratePanel } = useServicesList();

  useEffect(() => {
    changeActiveModule("services");
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex vertical className={styles.panel}>
      <CommonHeader title={t("common.modules.services")}>
        <ServicesHeader />
      </CommonHeader>

      <Flex vertical gap={24} className={styles.body}>
        <ServicesHeaderCards />
        <ServicesTable />
      </Flex>
    </Flex>
  );
};

export default ServicesPage;
