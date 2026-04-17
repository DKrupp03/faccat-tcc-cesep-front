import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";

import { useModules } from "@/shared/hooks/useModules";

import styles from "./CommonHeader.module.css";

const { Title } = Typography;

export const CommonHeader = () => {
  const { t } = useTranslation();
  const { activeModule } = useModules();

  return (
    <Flex
      justify="start" align="center"
      className={styles.header}
    >
      <Title level={4}>
        {t(`common.modules.${activeModule}`)}
      </Title>
    </Flex>
  );
};
