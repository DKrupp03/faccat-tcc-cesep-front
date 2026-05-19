import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { CommonModal } from "../components/CommonModal/CommonModal";
import { CommonButton } from "../components/CommonButton/CommonButton";
import { ModalsContext } from "../contexts/ModalsContext";

type ConfirmationModalState = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
} | null;

export const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [confirmationModal, setConfirmationModal] = useState<ConfirmationModalState>(null);

  const openConfirmationModal = useCallback((
    title: string,
    description: string,
    onConfirm: () => void,
    onCancel?: () => void,
  ) => {
    setConfirmationModal({ title, description, onConfirm, onCancel });
  }, []);

  const closeConfirmationModal = useCallback(() => {
    confirmationModal?.onCancel?.();
    setConfirmationModal(null);
  }, [confirmationModal]);

  const handleConfirm = useCallback(() => {
    confirmationModal?.onConfirm();
    setConfirmationModal(null);
  }, [confirmationModal]);

  return (
    <ModalsContext.Provider value={{ openConfirmationModal }}>
      {children}

      <CommonModal
        title={confirmationModal?.title ?? ""}
        isOpen={!!confirmationModal}
        close={closeConfirmationModal}
        zIndex={9999}
        footer={
          <>
            <CommonButton onClick={closeConfirmationModal} outline>
              {t("common.actions.cancel")}
            </CommonButton>
            <CommonButton onClick={handleConfirm} buttonVariant="primary">
              {t("common.actions.confirm")}
            </CommonButton>
          </>
        }
      >
        {confirmationModal?.description && (
          <span dangerouslySetInnerHTML={{ __html: confirmationModal.description }} />
        )}
      </CommonModal>
    </ModalsContext.Provider>
  );
};
