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

import { useServicesList } from "../../hooks/useServicesList";
import { useServiceForm } from "../../hooks/useServiceForm";
import type { ServicesOrder } from "../../types/service";

export const ServicesHeader = () => {
  const { t } = useTranslation();
  const { openFilter, filtratePanel, orderBy, filter } = useServicesList();
  const { openForm } = useServiceForm();

  const servicesOrderOptions = useMemo(() => ([
    {
      value: "datetime_start_desc",
      label: t("services.order.dateDesc"),
      icon: <IconSortDescending size={16} />,
    },
    {
      value: "datetime_start_asc",
      label: t("services.order.dateAsc"),
      icon: <IconSortAscending size={16} />,
    },
  ]), [t]);

  return (
    <>
      <CommonOrderButton
        value={orderBy}
        onChange={(newOrderBy) => filtratePanel(filter, newOrderBy as ServicesOrder)}
        options={servicesOrderOptions}
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
      <Tooltip title={t("services.actions.create")}>
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
