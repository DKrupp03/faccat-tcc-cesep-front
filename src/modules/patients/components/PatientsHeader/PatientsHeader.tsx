import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import {
  IconFilter,
  IconReload,
  IconPlus,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonOrderButton } from "@/shared/components/CommonOrderButton/CommonOrderButton";
import type { ProfilesOrder } from "@/shared/types/profile";

import { usePatientsList } from "../../hooks/usePatientsList";
import { usePatientForm } from "../../hooks/usePatientForm";

type PatientsHeaderProps = {
  onCreateClick?: () => void;
};

export const PatientsHeader = ({ onCreateClick }: PatientsHeaderProps = {}) => {
  const { t } = useTranslation();
  const { openFilter, filtratePanel, orderBy, filter } = usePatientsList();
  const { openForm } = usePatientForm();

  const patientsOrderOptions = useMemo(() => ([
    {
      value: "name_asc",
      label: t("common.order.nameAsc"),
      icon: <IconSortAscendingLetters size={16} />,
    },
    {
      value: "name_desc",
      label: t("common.order.nameDesc"),
      icon: <IconSortDescendingLetters size={16} />,
    },
  ]), [t]);

  return (
    <>
      <CommonOrderButton
        value={orderBy}
        onChange={(newOrderBy) => filtratePanel(filter, newOrderBy as ProfilesOrder)}
        options={patientsOrderOptions}
      />
      <Tooltip title={t("common.actions.reload")}>
        <CommonButton
          onClick={() => filtratePanel()}
          icon={<IconReload size={18} />}
          size="large"
          circular
          outline
        />
      </Tooltip>
      <Tooltip title={t("common.actions.filtrate")}>
        <CommonButton
          onClick={openFilter}
          icon={<IconFilter size={18} />}
          size="large"
          circular
          outline
        />
      </Tooltip>
      <Tooltip title={t("patients.actions.create")}>
        <CommonButton
          onClick={onCreateClick ?? (() => openForm())}
          icon={<IconPlus size={18} />}
          size="large"
          buttonVariant="primary"
          circular
        />
      </Tooltip>
    </>
  );
};
