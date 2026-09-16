import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import { IconAlertTriangle } from "@tabler/icons-react";

import { CommonModal } from "../components/CommonModal/CommonModal";
import { CommonButton } from "../components/CommonButton/CommonButton";
import { ModalsContext, type ConfirmationModalOptions } from "../contexts/ModalsContext";
import { TOKENS } from "../theme";

import styles from "./ModalsProvider.module.css";

type ConfirmationModalState = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  options?: ConfirmationModalOptions;
} | null;

export const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [confirmationModal, setConfirmationModal] = useState<ConfirmationModalState>(null);

  const openConfirmationModal = useCallback((
    title: string,
    description: string,
    onConfirm: () => void,
    onCancel?: () => void,
    options?: ConfirmationModalOptions,
  ) => {
    setConfirmationModal({ title, description, onConfirm, onCancel, options });
  }, []);

  const closeConfirmationModal = useCallback(() => {
    confirmationModal?.onCancel?.();
    setConfirmationModal(null);
  }, [confirmationModal]);

  const handleConfirm = useCallback(() => {
    confirmationModal?.onConfirm();
    setConfirmationModal(null);
  }, [confirmationModal]);

  const danger = !!confirmationModal?.options?.danger;

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
            <CommonButton onClick={handleConfirm} buttonVariant={danger ? "danger" : "primary"}>
              {confirmationModal?.options?.confirmLabel ?? t("common.actions.confirm")}
            </CommonButton>
          </>
        }
      >
        {confirmationModal?.description && (
          <Flex align="flex-start" gap={TOKENS.space[12]}>
            {danger && (
              <Flex justify="center" align="center" className={styles.dangerIcon}>
                <IconAlertTriangle size={18} />
              </Flex>
            )}
            <p
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: confirmationModal.description }}
            />
          </Flex>
        )}
      </CommonModal>
    </ModalsContext.Provider>
  );
};
