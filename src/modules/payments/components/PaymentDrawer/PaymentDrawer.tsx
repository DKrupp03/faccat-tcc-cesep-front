import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";
import { IconEdit, IconCalendarEvent } from "@tabler/icons-react";

import { CommonDrawer } from "@/shared/components/CommonDrawer/CommonDrawer";
import { ServiceFormProvider } from "@/modules/services/providers/ServiceFormProvider";
import { useServiceForm } from "@/modules/services/hooks/useServiceForm";
import {
  ServiceForm,
  ServiceFormOptions,
} from "@/modules/services/components/ServiceForm/ServiceForm";

import { usePaymentDrawer } from "../../hooks/usePaymentDrawer";
import { usePaymentsList } from "../../hooks/usePaymentsList";
import { PaymentForm, PaymentFormOptions } from "../PaymentForm/PaymentForm";

type ServiceSyncProps = {
  serviceId: number;
};

const ServiceSync = ({ serviceId }: ServiceSyncProps) => {
  const { openForm } = useServiceForm();

  useEffect(() => {
    openForm(serviceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  return null;
};

const ServiceTabContent = () => {
  const { loadingService } = useServiceForm();

  if (loadingService) {
    return <Skeleton paragraph={{ rows: 6 }} active />;
  }

  return <ServiceForm />;
};

export const PaymentDrawer = () => {
  const { t } = useTranslation();
  const { therapistId, filter, orderBy, filtratePanel } = usePaymentsList();
  const { isFormOpen, payment, tab, handleClose, handleChangeTab } = usePaymentDrawer();

  const tabs = useMemo(() => ([
    {
      key: "form",
      name: t("payments.tabs.form"),
      icon: <IconEdit size={18} />,
    },
    {
      key: "service",
      name: t("payments.tabs.service"),
      icon: <IconCalendarEvent size={18} />,
      disabled: !payment?.service_id,
    },
  ]), [t, payment?.service_id]);

  const content = useMemo(() => {
    if (tab === "form") return <PaymentForm />;
    if (tab === "service" && payment?.service_id) return <ServiceTabContent />;
  }, [tab, payment?.service_id]);

  const footer = useMemo(() => {
    if (tab === "form") return <PaymentFormOptions />;
    if (tab === "service") return <ServiceFormOptions />;
  }, [tab]);

  return (
    <ServiceFormProvider
      therapistId={therapistId}
      renderFormDrawer={false}
      keepFormOpenOnSubmit
      afterSaveCallback={() => filtratePanel(filter, orderBy, 1)}
    >
      {payment?.service_id && <ServiceSync serviceId={payment.service_id} />}
      <CommonDrawer
        isOpen={isFormOpen}
        close={handleClose}
        title={t(`payments.tabs.${tab}`)}
        footer={footer}
        tabs={tabs}
        activeTab={tab}
        onChangeTab={handleChangeTab}
        showTabs
      >
        {content}
      </CommonDrawer>
    </ServiceFormProvider>
  );
};
