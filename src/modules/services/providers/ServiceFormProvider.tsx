import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { useNotification } from "@/shared/hooks/useNotification";
import { useModals } from "@/shared/hooks/useModals";

import { ServiceFormContext } from "../contexts/ServiceFormContext";
import { useServicesOperations } from "../hooks/useServicesOperations";
import type { Service } from "../types/service";
import { ServiceDrawer } from "../components/ServiceDrawer/ServiceDrawer";

type ServiceFormProviderProps = {
  afterSaveCallback?: (
    operation: "create" | "update" | "delete",
    service: Service,
  ) => void;
  therapistId?: number;
  patientId?: number;
  children: React.ReactNode;
};

export const ServiceFormProvider = ({
  afterSaveCallback,
  therapistId,
  patientId,
  children,
}: ServiceFormProviderProps) => {
  const { t } = useTranslation();
  const { openNotification } = useNotification();
  const { openConfirmationModal } = useModals();
  const {
    fetchService,
    createService: createServiceOperation,
    updateService: updateServiceOperation,
    deleteService: deleteServiceOperation,
  } = useServicesOperations();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [service, setService] = useState<Service>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingService, setLoadingService] = useState<boolean>(false);

  const openForm = useCallback(async (serviceId?: number) => {
    if (serviceId) {
      setLoadingService(true);

      try {
        const response = await fetchService(serviceId);

        if (response.success) {
          setService(response.service);
        }
      } finally {
        setLoadingService(false);
      }
    } else {
      setService(undefined);
    }

    setIsFormOpen(true);
  }, [fetchService]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setService(undefined);
  }, []);

  const createService = useCallback(async (serviceData: Partial<Service>) => {
    try {
      const response = await createServiceOperation(serviceData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      afterSaveCallback?.("create", response.service);
      closeForm();
      openNotification("success", t("services.actions.created"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, createServiceOperation, afterSaveCallback, openNotification, closeForm]);

  const updateService = useCallback(async (serviceData: Partial<Service>) => {
    try {
      const response = await updateServiceOperation(serviceData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      afterSaveCallback?.("update", response.service);
      closeForm();
      openNotification("success", t("services.actions.updated"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, updateServiceOperation, afterSaveCallback, openNotification, closeForm]);

  const submitService = useCallback(async (formValues: Partial<Service>) => {
    setIsSubmitting(true);

    if (service?.id) {
      await updateService({ ...formValues, id: service.id });
    } else {
      await createService(formValues);
    }
  }, [updateService, createService, service]);

  const deleteService = useCallback(async (serviceId: number) => {
    openConfirmationModal(
      t("services.actions.delete"),
      t("services.actions.delete.confirmation"),
      async () => {
        try {
          const response = await deleteServiceOperation(serviceId);

          if (!response.success) {
            openNotification("error", response.errors!);
            throw new Error(response.error);
          }

          closeForm();
          afterSaveCallback?.("delete", service!);
          openNotification("success", t("services.actions.deleted"));
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
    deleteServiceOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
    service,
  ]);

  return (
    <ServiceFormContext.Provider
      value={{
        therapistId,
        patientId,
        isFormOpen,
        service,
        isSubmitting,
        loadingService,
        openForm,
        closeForm,
        submitService,
        deleteService,
      }}
    >
      {children}
      <ServiceDrawer />
    </ServiceFormContext.Provider>
  );
};
