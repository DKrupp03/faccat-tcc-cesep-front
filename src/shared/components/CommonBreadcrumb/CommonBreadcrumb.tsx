import { useTranslation } from "react-i18next";
import { Breadcrumb, type BreadcrumbProps } from "antd";
import { useMemo } from "react";

import { COLORS } from "@/shared/theme";
import { useModules } from "@/shared/hooks/useModules";

export const CommonBreadcrumb = () => {
  const { t } = useTranslation();
  const {
    activeModule,
    headerContent,
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

    const itemStyle = (isLast: boolean) => isLast
      ? { color: COLORS.primary[500], fontWeight: "bold" }
      : { color: COLORS.gray[250] };

    return allItems.map((item, index) => ({
      ...item,
      title: (
        <span style={itemStyle(index === (allItems.length - 1))}>
          {item.title}
        </span>
      ),
    }));
  }, [t, activeModule, headerContent.submodules]);

  const separator = <span style={{ color: COLORS.gray[250] }}>{">"}</span>;

  return (
    <Breadcrumb
      separator={separator}
      items={styledItems}
    />
  );
};
