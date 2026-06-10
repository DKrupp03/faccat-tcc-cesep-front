import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonIconHelp } from "@/shared/components/CommonHelpIcon/CommonHelpIcon";
import { formatDateTime } from "@/shared/utils/formatters";
import ServicesSelectService from "@/shared/services/ServicesSelectService";
import type { Service } from "@/modules/services/types/service";

type ServicesSelectProps = Omit<SelectProps, "options"> & {
  label?: string;
  required?: boolean;
  showHelp?: boolean;
  patientId?: number;
  withoutPayment?: boolean;
  withoutMedicalRecord?: boolean;
};

const toOption = (service: Service): DefaultOptionType => ({
  label: `${formatDateTime(service.datetime_start)} - ${service.patient?.name ?? ""}`,
  value: service.id,
});

export const ServicesSelect: React.FC<ServicesSelectProps> = ({
  showHelp,
  label,
  value,
  patientId,
  withoutPayment,
  withoutMedicalRecord,
  ...props
}) => {
  const { t } = useTranslation();

  const [options, setOptions] = useState<DefaultOptionType[]>([]);

  const fetchServices = useCallback(async () => {
    const response = await ServicesSelectService.getServices({
      patient_id: patientId,
      without_payment: withoutPayment,
      without_medical_record: withoutMedicalRecord,
    });

    return response.success ? response.services.map(toOption) : null;
  }, [patientId, withoutPayment, withoutMedicalRecord]);

  useEffect(() => {
    let active = true;
    fetchServices().then((fetched) => {
      if (!active || !fetched) return;
      setOptions((prev) => {
        const fetchedValues = new Set(fetched.map((o) => o.value));
        const extras = prev.filter((o) => !fetchedValues.has(o.value));
        return [...fetched, ...extras];
      });
    });
    return () => {
      active = false;
    };
  }, [fetchServices]);

  useEffect(() => {
    if (value === undefined || value === null) return;
    if (options.some((o) => o.value === value)) return;

    ServicesSelectService.getService(Number(value)).then((response) => {
      if (!response.success) return;
      setOptions((prev) => {
        if (prev.some((o) => o.value === value)) return prev;
        return [...prev, toOption(response.service)];
      });
    });
  }, [value, options]);

  return (
    <CommonSelect
      label={label || t("patients.medicalRecords.columns.service")}
      options={options}
      value={value}
      icon={showHelp ? <CommonIconHelp text={t("common.help.defaultValue")} /> : undefined}
      allowClear
      {...props}
    />
  );
};
