import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";
import {
  IconEdit,
  IconReportMoney,
  IconFileText,
} from "@tabler/icons-react";

import { CommonDrawer } from "@/shared/components/CommonDrawer/CommonDrawer";
import { MedicalRecordsProvider } from "@/modules/patients/providers/MedicalRecordsProvider";
import { useMedicalRecords } from "@/modules/patients/hooks/useMedicalRecords";
import {
  MedicalRecordForm,
  MedicalRecordFormOptions,
} from "@/modules/patients/components/MedicalRecordForm/MedicalRecordForm";
import { PaymentFormProvider } from "@/modules/payments/providers/PaymentFormProvider";
import { usePaymentForm } from "@/modules/payments/hooks/usePaymentForm";
import {
  PaymentForm,
  PaymentFormOptions,
} from "@/modules/payments/components/PaymentForm/PaymentForm";

import { useServiceDrawer } from "../../hooks/useServiceDrawer";
import type { Service } from "../../types/service";
import { ServiceForm, ServiceFormOptions } from "../ServiceForm/ServiceForm";

type MedicalRecordSyncProps = {
  service: Service;
};

const MedicalRecordSync = ({ service }: MedicalRecordSyncProps) => {
  const { openForm } = useMedicalRecords();

  useEffect(() => {
    openForm(service.medical_record?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.id]);

  return null;
};

type MedicalRecordTabContentProps = {
  serviceId: number;
};

const MedicalRecordTabContent = ({ serviceId }: MedicalRecordTabContentProps) => {
  const { loadingMedicalRecord } = useMedicalRecords();

  if (loadingMedicalRecord) {
    return <Skeleton paragraph={{ rows: 6 }} active />;
  }

  return (
    <MedicalRecordForm
      lockedFields={["service_id"]}
      defaultValues={{ service_id: serviceId }}
    />
  );
};

type PaymentSyncProps = {
  service: Service;
};

const PaymentSync = ({ service }: PaymentSyncProps) => {
  const { openForm } = usePaymentForm();

  useEffect(() => {
    openForm(service.payment?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.id]);

  return null;
};

type PaymentTabContentProps = {
  serviceId: number;
};

const PaymentTabContent = ({ serviceId }: PaymentTabContentProps) => {
  const { loadingPayment } = usePaymentForm();

  const defaultValues = useMemo(() => ({ service_id: serviceId }), [serviceId]);

  if (loadingPayment) {
    return <Skeleton paragraph={{ rows: 6 }} active />;
  }

  return (
    <PaymentForm
      lockedFields={["service_id"]}
      defaultValues={defaultValues}
    />
  );
};

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
    if (tab === "payment" && service?.id) {
      return <PaymentTabContent serviceId={service.id} />;
    }
    if (tab === "medicalRecord" && service?.id) {
      return <MedicalRecordTabContent serviceId={service.id} />;
    }
  }, [tab, service]);

  const footer = useMemo(() => {
    if (tab === "form") return <ServiceFormOptions />;
    if (tab === "payment") return <PaymentFormOptions showDelete={false} />;
    if (tab === "medicalRecord") return <MedicalRecordFormOptions showDelete={false} />;
  }, [tab]);

  return (
    <MedicalRecordsProvider
      patientId={service?.patient_id}
      renderFormDrawer={false}
      keepFormOpenOnSubmit
    >
      <PaymentFormProvider renderFormDrawer={false} keepFormOpenOnSubmit>
        {service?.id && <MedicalRecordSync service={service} />}
        {service?.id && <PaymentSync service={service} />}
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
      </PaymentFormProvider>
    </MedicalRecordsProvider>
  );
};
