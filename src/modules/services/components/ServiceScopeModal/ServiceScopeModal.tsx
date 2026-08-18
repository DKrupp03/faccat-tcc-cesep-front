import { useTranslation } from "react-i18next";

import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

import type { ServiceScope } from "../../types/service";

export type ServiceScopeAction = "update" | "delete";

type ServiceScopeModalProps = {
  action?: ServiceScopeAction;
  close: () => void;
  onSelect: (scope: ServiceScope) => void;
};

const SCOPES: ServiceScope[] = ["single", "future", "all"];

// Uma ocorrência de série recorrente não pode ser editada/excluída sem antes
// escolher o alcance da ação — por isso uma modal própria em vez da de confirmação.
export const ServiceScopeModal = ({ action, close, onSelect }: ServiceScopeModalProps) => {
  const { t } = useTranslation();

  const isDelete = action === "delete";

  const description = isDelete
    ? t("services.recurrence.scope.deleteDescription")
    : t("services.recurrence.scope.editDescription");

  return (
    <CommonModal
      title={t("services.recurrence.scope.title")}
      isOpen={!!action}
      close={close}
      zIndex={9999}
      footer={
        <>
          <CommonButton onClick={close} outline>
            {t("common.actions.cancel")}
          </CommonButton>
          {SCOPES.map((scope) => (
            <CommonButton
              key={scope}
              onClick={() => onSelect(scope)}
              buttonVariant={isDelete ? "danger" : "primary"}
            >
              {t(`services.recurrence.scope.${scope}`)}
            </CommonButton>
          ))}
        </>
      }
    >
      <span dangerouslySetInnerHTML={{ __html: description }} />
    </CommonModal>
  );
};
