import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import dayjs from "dayjs";

import { useNotification } from "@/shared/hooks/useNotification";

import {
  PatientAnamneseContext,
  type PatientAnamneseInitialValues,
} from "../contexts/PatientAnamneseContext";
import { usePatientForm } from "../hooks/usePatientForm";
import type { AnamneseType } from "../types/anamnese";
import PatientAnamneseService from "../services/PatientAnamneseService";

// O form e o `isSubmitting` moram aqui porque o formulário e a barra de ações
// são componentes irmãos. Como hook de estado local, cada um criava seu próprio
// Form.useForm — o botão nunca ficava em loading e o segundo form ficava solto.
export const PatientAnamneseProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const { patient, updatePatientAttribute } = usePatientForm();
  const { openNotification } = useNotification();

  const [form] = Form.useForm<Partial<AnamneseType>>();
  const anamneseType = Form.useWatch("anamnese_type", form);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const initialAnamnese = useMemo<PatientAnamneseInitialValues>(() => ({
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
      openNotification(
        "success",
        values.id
          ? t("patients.anamnese.actions.updated")
          : t("patients.anamnese.actions.created"),
      );
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
  }, [patient?.anamnese, form]);

  return (
    <PatientAnamneseContext.Provider
      value={{
        form,
        anamneseType,
        initialAnamnese,
        isSubmitting,
        patient,
        handleSubmitAnamnese,
      }}
    >
      {children}
    </PatientAnamneseContext.Provider>
  );
};
