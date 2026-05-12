import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import dayjs from "dayjs";

import { useNotification } from "@/shared/hooks/useNotification";

import { usePatientForm } from "./usePatientForm";
import type { AnamneseType } from "../types/anamnese";
import PatientAnamneseService from "../services/PatientAnamneseService";

export const usePatientAnamnese = () => {
  const { t } = useTranslation();
  const { patient, updatePatientAttribute } = usePatientForm();
  const { openNotification } = useNotification();
  
  const [form] = Form.useForm<Partial<AnamneseType>>();
  const anamneseType = Form.useWatch("anamnese_type", form);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const initialAnamnese = useMemo(() => ({
    anamnese_type: "child",
    patient_id: patient?.id,
    therapist_id: patient?.therapist_id,
    created_at: new Date().toISOString(),
    anamnese_data: {
      identificationData: {
        name: patient?.name,
        birth: patient?.birth,
        age: patient?.birth ? String(dayjs().diff(dayjs(patient.birth), "year")) : undefined,
        gender: patient?.gender,
        educationLevel: patient?.education_level,
        maritalStatus: patient?.marital_status,
      },
    },
  }), [patient]);

  const handleSubmitAnamnese = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const values = form.getFieldsValue(true);
      const response = values.id
        ? await PatientAnamneseService.updatePatientAnamnese(patient!.id, values)
        : await PatientAnamneseService.createPatientAnamnese(patient!.id, values);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      updatePatientAttribute({ anamnese: response.anamnese });
      openNotification("success", t("patients.anamnese.actions.saved"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, form, patient, openNotification, updatePatientAttribute]);

  useEffect(() => {
    if (patient?.anamnese) {
      form.setFieldsValue(patient.anamnese);
    } else {
      form.resetFields();
    }
  }, [patient?.anamnese]);

  return {
    form,
    anamneseType,
    initialAnamnese,
    handleSubmitAnamnese,
    isSubmitting,
  };
};
