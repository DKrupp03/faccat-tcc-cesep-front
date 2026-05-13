import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import {
  IconFilter,
  IconReload,
  IconPlus,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonOrderButton } from "@/shared/components/CommonOrderButton/CommonOrderButton";

import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import type { MedicalRecordsOrder } from "../../types/medicalRecord";

export const MedicalRecordsHeader = () => {
  const { t } = useTranslation();
  const {
    openFilter,
    filtratePanel,
    orderBy,
    filter,
    openForm,
  } = useMedicalRecords();

  const orderOptions = useMemo(() => ([
    {
      value: "date_desc",
      label: t("patients.medicalRecords.order.dateDesc"),
      icon: <IconSortDescending size={16} />,
    },
    {
      value: "date_asc",
      label: t("patients.medicalRecords.order.dateAsc"),
      icon: <IconSortAscending size={16} />,
    },
  ]), [t]);

  return (
    <>
      <CommonOrderButton
        value={orderBy}
        onChange={(newOrderBy) => filtratePanel(filter, newOrderBy as MedicalRecordsOrder)}
        options={orderOptions}
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
      <Tooltip title={t("patients.medicalRecords.actions.create")}>
        <CommonButton
          onClick={() => openForm()}
          icon={<IconPlus size={18} />}
          size="large"
          buttonVariant="primary"
          circular
        />
      </Tooltip>
    </>
  );
};
