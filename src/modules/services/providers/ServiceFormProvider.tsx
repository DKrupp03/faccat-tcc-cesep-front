import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { useNotification } from "@/shared/hooks/useNotification";
import { useModals } from "@/shared/hooks/useModals";

import { ServiceFormContext } from "../contexts/ServiceFormContext";
import { useServicesOperations } from "../hooks/useServicesOperations";
import type { Service, ServiceFormValues, ServiceScope } from "../types/service";
import { ServiceDrawer } from "../components/ServiceDrawer/ServiceDrawer";
import {
  ServiceScopeModal,
  type ServiceScopeAction,
} from "../components/ServiceScopeModal/ServiceScopeModal";

type ServiceFormProviderProps = {
  afterSaveCallback?: (
    operation: "create" | "update" | "delete",
    service: Service,
    scope?: ServiceScope,
  ) => void;
  therapistId?: number;
  patientId?: number;
  renderFormDrawer?: boolean;
  keepFormOpenOnSubmit?: boolean;
  children: React.ReactNode;
};

// Ação de uma série recorrente aguardando a escolha do escopo na modal.
type PendingScopeAction = {
  action: ServiceScopeAction;
  run: (scope: ServiceScope) => Promise<void>;
};

export const ServiceFormProvider = ({
  afterSaveCallback,
  therapistId,
  patientId,
  renderFormDrawer = true,
  keepFormOpenOnSubmit = false,
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
  const [pendingScopeAction, setPendingScopeAction] = useState<PendingScopeAction>();

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

  const createService = useCallback(async (serviceData: ServiceFormValues) => {
    try {
      const response = await createServiceOperation(serviceData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      afterSaveCallback?.("create", response.service);
      if (keepFormOpenOnSubmit) {
        setService(response.service);
      } else {
        closeForm();
      }
      openNotification("success", t("services.actions.created"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, createServiceOperation, afterSaveCallback, openNotification, closeForm, keepFormOpenOnSubmit]);

  const updateService = useCallback(async (
    serviceData: ServiceFormValues,
    scope: ServiceScope = "single",
  ) => {
    try {
      const response = await updateServiceOperation(serviceData, scope);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      afterSaveCallback?.("update", response.service, scope);
      if (keepFormOpenOnSubmit) {
        setService(response.service);
      } else {
        closeForm();
      }
      openNotification("success", t("services.actions.updated"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, updateServiceOperation, afterSaveCallback, openNotification, closeForm, keepFormOpenOnSubmit]);

  const removeService = useCallback(async (
    serviceId: number,
    scope: ServiceScope = "single",
  ) => {
    try {
      const response = await deleteServiceOperation(serviceId, scope);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      closeForm();
      afterSaveCallback?.("delete", service!, scope);
      openNotification("success", t("services.actions.deleted"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, deleteServiceOperation, afterSaveCallback, openNotification, closeForm, service]);

  const submitService = useCallback(async (formValues: ServiceFormValues) => {
    if (!service?.id) {
      setIsSubmitting(true);
      await createService(formValues);
      return;
    }

    const values = { ...formValues, id: service.id };

    // Ocorrência de uma série: o escopo da edição é escolhido na modal.
    if (service.recurrence_id) {
      setPendingScopeAction({
        action: "update",
        run: async (scope) => {
          setIsSubmitting(true);
          await updateService(values, scope);
        },
      });
      return;
    }

    setIsSubmitting(true);
    await updateService(values);
  }, [updateService, createService, service]);

  const deleteService = useCallback(async (serviceId: number) => {
    if (service?.recurrence_id) {
      setPendingScopeAction({
        action: "delete",
        run: async (scope) => {
          setIsSubmitting(true);
          await removeService(serviceId, scope);
        },
      });
      return;
    }

    openConfirmationModal(
      t("services.actions.delete"),
      t("services.actions.delete.confirmation"),
      () => {
        setIsSubmitting(true);
        removeService(serviceId);
      },
    );
  }, [t, openConfirmationModal, removeService, service]);

  const closeScopeModal = useCallback(() => setPendingScopeAction(undefined), []);

  const handleSelectScope = useCallback((scope: ServiceScope) => {
    const pending = pendingScopeAction;
    setPendingScopeAction(undefined);
    pending?.run(scope);
  }, [pendingScopeAction]);

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
      {renderFormDrawer && <ServiceDrawer />}
      <ServiceScopeModal
        action={pendingScopeAction?.action}
        close={closeScopeModal}
        onSelect={handleSelectScope}
      />
    </ServiceFormContext.Provider>
  );
};
