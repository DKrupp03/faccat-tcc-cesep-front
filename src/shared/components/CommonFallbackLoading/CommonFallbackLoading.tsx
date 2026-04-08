import { Flex, Spin } from "antd";

import logo from "@/shared/assets/logo.png";

export const CommonFallbackLoading = () => {
  return (
    <Flex
      vertical gap={20} justify="center" align="center"
      style={{ height: "100vh" }}
    >
      <img
        src={logo}
        alt="CESEP"
        style={{ height: 100 }}
      />

      <Spin />
    </Flex>
  );
}
