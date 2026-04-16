import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import { IconFilter, IconPlus } from "@tabler/icons-react";

import { useModules } from "@/shared/hooks/useModules";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonReloadButton } from "@/shared/components/CommonReloadButton/CommonReloadButton";

const TherapistsPage = () => {
  const { t } = useTranslation();
  const {
    changeActiveModule,
    setHeaderContent,
  } = useModules();

  useEffect(() => {
    changeActiveModule("therapists");

    setHeaderContent({
      rightContent: (
        <Flex gap={16}>
          <CommonButton
            icon={<IconFilter size={16} />}
            iconPlacement="end"
            size="large"
            outline
          >
            {t("common.actions.filtrate")}
          </CommonButton>

          <CommonReloadButton
            onClick={() => {}}
          />

          <CommonButton
            type="primary"
            icon={<IconPlus size={18} />}
            size="large"
          >
            {"Criar terapeuta"}
          </CommonButton>
        </Flex>
      ),
    });
  }, [changeActiveModule]);

  return <div>TERAPEUTAS</div>;
};

export default TherapistsPage;
