import { Flex, Spin } from "antd";

import logo from "@/shared/assets/logo.png";
import { TOKENS } from "@/shared/theme";

import styles from "./CommonFallbackLoading.module.css";

export const CommonFallbackLoading = () => {
  return (
    <Flex
      vertical gap={TOKENS.space[20]} justify="center" align="center"
      className={styles.page}
    >
      <img
        src={logo}
        alt="CESEP"
        className={styles.logo}
      />
      <Spin />
    </Flex>
  );
};
