import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  IconEdit,
  IconReportMoney,
  IconFileText,
} from "@tabler/icons-react";

import { CommonDrawer } from "@/shared/components/CommonDrawer/CommonDrawer";

import { useServiceDrawer } from "../../hooks/useServiceDrawer";
import { ServiceForm, ServiceFormOptions } from "../ServiceForm/ServiceForm";

export const ServiceDrawer = () => {
  const { t } = useTranslation();
  const { isFormOpen, service, tab, handleClose, handleChangeTab } = useServiceDrawer();

  const tabs = useMemo(() => ([
    {
      key: "form",
      name: t("services.tabs.form"),
      icon: <IconEdit size={18} />,
    },
    {
      key: "payment",
      name: t("services.tabs.payment"),
      icon: <IconReportMoney size={18} />,
      disabled: !service?.id,
    },
    {
      key: "medicalRecord",
      name: t("services.tabs.medicalRecord"),
      icon: <IconFileText size={18} />,
      disabled: !service?.id,
    },
  ]), [t, service?.id]);

  const content = useMemo(() => {
    if (tab === "form") return <ServiceForm />;
  }, [tab]);

  const footer = useMemo(() => {
    if (tab === "form") return <ServiceFormOptions />;
  }, [tab]);

  return (
    <CommonDrawer
      isOpen={isFormOpen}
      close={handleClose}
      title={t(`services.tabs.${tab}`)}
      footer={footer}
      tabs={tabs}
      activeTab={tab}
      onChangeTab={handleChangeTab}
      showTabs
    >
      {content}
    </CommonDrawer>
  );
};
