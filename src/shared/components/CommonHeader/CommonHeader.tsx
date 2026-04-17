import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography, Breadcrumb, type BreadcrumbProps } from "antd";

import { useModules } from "@/shared/hooks/useModules";

import styles from "./CommonHeader.module.css";

const { Title, Text } = Typography;

export const CommonHeader = () => {
  const { t } = useTranslation();
  const {
    headerContent,
    activeModule,
  } = useModules();

  const styledItems = useMemo(() => {
    const allItems: BreadcrumbProps["items"] = [
      {
        title: t("common.mainMenu"),
      },
      {
        title: t(`common.modules.${activeModule}`),
      },
      ...(headerContent.submodules ? headerContent.submodules : []),
    ];

    return allItems.map((item, index) => ({
      ...item,
      title: index === (allItems.length - 1) ? (
        <Title level={3} className={styles.breadcrumbSelectedItem}>
          {item.title}
        </Title>
      ) : (
        <Text className={styles.breadcrumbItem}>
          {item.title}
        </Text>
      ),
    }));
  }, [t, activeModule, headerContent.submodules]);

  const separator = <Flex align="center" className={styles.breadcrumbSeparator}>{">"}</Flex>;

  return (
    <Flex
      justify="space-between" align="center"
      className={styles.headerContainer}
    >
      <Breadcrumb
        separator={separator}
        items={styledItems}
      />

      {headerContent.rightContent}
    </Flex>
  );
};
