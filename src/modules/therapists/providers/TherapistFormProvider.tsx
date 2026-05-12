import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useNotification } from "@/shared/hooks/useNotification";
import { useModals } from "@/shared/hooks/useModals";

import { TherapistFormContext } from "../contexts/TherapistFormContext";
import { useTherapistsOperations } from "../hooks/useTherapistsOperations";
import type { Therapist } from "../types/therapist";
import { TherapistDrawer } from "../components/TherapistDrawer/TherapistDrawer";

type TherapistFormProviderProps = {
  afterSaveCallback?: (
    operation: "create" | "update" | "delete",
    therapist: Therapist,
  ) => void;
  children: React.ReactNode;
};

export const TherapistFormProvider = ({
  afterSaveCallback,
  children,
}: TherapistFormProviderProps) => {
  const { t } = useTranslation();
  const {
    logout,
    profile: currentProfile,
    setProfile: setCurrentProfile,
  } = useAuth();
  const { openNotification } = useNotification();
  const { openConfirmationModal } = useModals();
  const {
    fetchTherapist,
    createTherapist: createTherapistOperation,
    updateTherapist: updateTherapistOperation,
    deleteTherapist: deleteTherapistOperation,
  } = useTherapistsOperations();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [therapist, setTherapist] = useState<Therapist>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingTherapist, setLoadingTherapist] = useState<boolean>(false);

  const openForm = useCallback(async (therapistId?: number) => {
    if (therapistId) {
      setLoadingTherapist(true);

      try {
        const response = await fetchTherapist(therapistId);

        if (response.success) {
          setTherapist(response.profile);
        }
      } finally {
        setLoadingTherapist(false);
      }
    } else {
      setTherapist(undefined);
    }

    setIsFormOpen(true);
  }, [fetchTherapist]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setTherapist(undefined);
  }, []);

  const createTherapist = useCallback(async (therapistData: Partial<Therapist>) => {
    try {
      const response = await createTherapistOperation(therapistData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      afterSaveCallback?.("create", response.profile);
      closeForm();
      openNotification("success", t("therapists.actions.created"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [
    t,
    createTherapistOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
  ]);

  const updateTherapist = useCallback(async (therapistData: Partial<Therapist>) => {
    try {
      const response = await updateTherapistOperation(therapistData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      if (currentProfile?.id === response.profile.id) {
        setCurrentProfile(response.profile);
      }

      afterSaveCallback?.("update", response.profile);
      closeForm();
      openNotification("success", t("therapists.actions.updated"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [
    t,
    updateTherapistOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
    currentProfile,
    setCurrentProfile,
  ]);

  const submitTherapist = useCallback(async (formValues: Partial<Therapist>) => {
    setIsSubmitting(true);
    formValues.role = "therapist";

    if (therapist?.id) {
      await updateTherapist({ ...formValues, id: therapist.id });
    } else {
      await createTherapist(formValues);
    }
  }, [updateTherapist, createTherapist, therapist]);

  const deleteTherapist = useCallback(async (therapistId: number) => {
    openConfirmationModal(
      t("therapists.actions.delete"),
      t("therapists.actions.delete.confirmation"),
      async () => {
        try {
          const response = await deleteTherapistOperation(therapistId);

          if (!response.success) {
            openNotification("error", response.errors!);
            throw new Error(response.error);
          }

          closeForm();

          if (currentProfile?.id === therapistId) return logout();

          afterSaveCallback?.("delete", therapist!);
          openNotification("success", t("therapists.actions.deleted"));
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
    deleteTherapistOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
    currentProfile?.id,
    logout,
    therapist,
  ]);

  return (
    <TherapistFormContext.Provider
      value={{
        isFormOpen,
        therapist,
        isSubmitting,
        loadingTherapist,
        openForm,
        closeForm,
        submitTherapist,
        deleteTherapist,
      }}
    >
      {children}
      <TherapistDrawer />
    </TherapistFormContext.Provider>
  );
};
