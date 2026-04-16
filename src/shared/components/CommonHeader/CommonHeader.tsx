import { Flex } from "antd";

import { useModules } from "@/shared/hooks/useModules";
import { CommonBreadcrumb } from "@/shared/components/CommonBreadcrumb/CommonBreadcrumb";

export const CommonHeader = () => {
  const { headerContent } = useModules();

  return (
    <Flex justify="space-between" vertical gap={24}>
      <CommonBreadcrumb />

      {headerContent.rightContent}
    </Flex>
  );
};
