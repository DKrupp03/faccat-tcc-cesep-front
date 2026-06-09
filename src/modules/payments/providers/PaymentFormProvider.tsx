import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { useNotification } from "@/shared/hooks/useNotification";
import { useModals } from "@/shared/hooks/useModals";

import { PaymentFormContext } from "../contexts/PaymentFormContext";
import { usePaymentsOperations } from "../hooks/usePaymentsOperations";
import type { Payment } from "../types/payment";
import { PaymentDrawer } from "../components/PaymentDrawer/PaymentDrawer";

type PaymentFormProviderProps = {
  afterSaveCallback?: (
    operation: "create" | "update" | "delete",
    payment: Payment,
  ) => void;
  children: React.ReactNode;
};

export const PaymentFormProvider = ({
  afterSaveCallback,
  children,
}: PaymentFormProviderProps) => {
  const { t } = useTranslation();
  const { openNotification } = useNotification();
  const { openConfirmationModal } = useModals();
  const {
    fetchPayment,
    createPayment: createPaymentOperation,
    updatePayment: updatePaymentOperation,
    deletePayment: deletePaymentOperation,
  } = usePaymentsOperations();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [payment, setPayment] = useState<Payment>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingPayment, setLoadingPayment] = useState<boolean>(false);

  const openForm = useCallback(async (paymentId?: number) => {
    if (paymentId) {
      setLoadingPayment(true);

      try {
        const response = await fetchPayment(paymentId);

        if (response.success) {
          setPayment(response.payment);
        }
      } finally {
        setLoadingPayment(false);
      }
    } else {
      setPayment(undefined);
    }

    setIsFormOpen(true);
  }, [fetchPayment]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setPayment(undefined);
  }, []);

  const createPayment = useCallback(async (paymentData: Partial<Payment>) => {
    try {
      const response = await createPaymentOperation(paymentData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      afterSaveCallback?.("create", response.payment);
      closeForm();
      openNotification("success", t("payments.actions.created"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, createPaymentOperation, afterSaveCallback, openNotification, closeForm]);

  const updatePayment = useCallback(async (paymentData: Partial<Payment>) => {
    try {
      const response = await updatePaymentOperation(paymentData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      afterSaveCallback?.("update", response.payment);
      closeForm();
      openNotification("success", t("payments.actions.updated"));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, updatePaymentOperation, afterSaveCallback, openNotification, closeForm]);

  const submitPayment = useCallback(async (formValues: Partial<Payment>) => {
    setIsSubmitting(true);

    if (payment?.id) {
      await updatePayment({ ...formValues, id: payment.id });
    } else {
      await createPayment(formValues);
    }
  }, [updatePayment, createPayment, payment]);

  const deletePayment = useCallback(async (paymentId: number) => {
    openConfirmationModal(
      t("payments.actions.delete"),
      t("payments.actions.delete.confirmation"),
      async () => {
        try {
          const response = await deletePaymentOperation(paymentId);

          if (!response.success) {
            openNotification("error", response.errors!);
            throw new Error(response.error);
          }

          closeForm();
          afterSaveCallback?.("delete", payment!);
          openNotification("success", t("payments.actions.deleted"));
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
    deletePaymentOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
    payment,
  ]);

  return (
    <PaymentFormContext.Provider
      value={{
        isFormOpen,
        payment,
        isSubmitting,
        loadingPayment,
        openForm,
        closeForm,
        submitPayment,
        deletePayment,
      }}
    >
      {children}
      <PaymentDrawer />
    </PaymentFormContext.Provider>
  );
};
