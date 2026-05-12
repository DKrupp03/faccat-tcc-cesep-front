import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useNotification } from "@/shared/hooks/useNotification";
import { useModals } from "@/shared/hooks/useModals";

import { PatientFormContext } from "../contexts/PatientFormContext";
import { usePatientsOperations } from "../hooks/usePatientsOperations";
import type { Patient } from "../types/patient";
import { PatientDrawer } from "../components/PatientDrawer/PatientDrawer";

type PatientFormProviderProps = {
  afterSaveCallback?: (
    operation: "create" | "update" | "delete",
    patient: Patient,
  ) => void;
  therapistId?: number;
  children: React.ReactNode;
};

export const PatientFormProvider = ({
  afterSaveCallback,
  therapistId,
  children,
}: PatientFormProviderProps) => {
  const { t } = useTranslation();
  const { logout, profile: currentProfile } = useAuth();
  const { openNotification } = useNotification();
  const { openConfirmationModal } = useModals();
  const {
    fetchPatient,
    createPatient: createPatientOperation,
    updatePatient: updatePatientOperation,
    deletePatient: deletePatientOperation,
  } = usePatientsOperations();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [patient, setPatient] = useState<Patient>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingPatient, setLoadingPatient] = useState<boolean>(false);

  const openForm = useCallback(async (patientId?: number) => {
    if (patientId) {
      setLoadingPatient(true);

      try {
        const response = await fetchPatient(patientId);

        if (response.success) {
          setPatient(response.profile);
        }
      } finally {
        setLoadingPatient(false);
      }
    } else {
      setPatient(undefined);
    }

    setIsFormOpen(true);
  }, [fetchPatient]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setPatient(undefined);
  }, []);

  const createPatient = useCallback(async (patientData: Partial<Patient>) => {
    try {
      const response = await createPatientOperation(patientData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      afterSaveCallback?.("create", response.profile);
      closeForm();
      openNotification("success", t("patients.actions.created"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [
    t,
    createPatientOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
  ]);

  const updatePatient = useCallback(async (patientData: Partial<Patient>) => {
    try {
      const response = await updatePatientOperation(patientData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      afterSaveCallback?.("update", response.profile);
      closeForm();
      openNotification("success", t("patients.actions.updated"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [
    t,
    updatePatientOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
  ]);

  const submitPatient = useCallback(async (formValues: Partial<Patient>) => {
    setIsSubmitting(true);
    formValues.role = "patient";
    formValues.default_value = formValues.default_value !== null
      ? Number(formValues.default_value)
      : undefined;

    if (patient?.id) {
      await updatePatient({ ...formValues, id: patient.id });
    } else {
      await createPatient(formValues);
    }
  }, [updatePatient, createPatient, patient]);

  const deletePatient = useCallback(async (patientId: number) => {
    openConfirmationModal(
      t("patients.actions.delete"),
      t("patients.actions.delete.confirmation"),
      async () => {
        try {
          const response = await deletePatientOperation(patientId);

          if (!response.success) {
            openNotification("error", response.errors!);
            throw new Error(response.error);
          }

          closeForm();

          if (currentProfile?.id === patientId) return logout();

          afterSaveCallback?.("delete", patient!);
          openNotification("success", t("patients.actions.deleted"));
        } catch (error) {
          console.error(error || t("common.errors.unknown"));
        } finally {
          setIsSubmitting(false);
        }
      },
    );
  }, [
    t,
    openConfirmationModal,
    deletePatientOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
    currentProfile?.id,
    logout,
    patient,
  ]);

  return (
    <PatientFormContext.Provider
      value={{
        isFormOpen,
        patient,
        isSubmitting,
        loadingPatient,
        therapistId,
        openForm,
        closeForm,
        submitPatient,
        deletePatient,
      }}
    >
      {children}
      <PatientDrawer />
    </PatientFormContext.Provider>
  );
};
