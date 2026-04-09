import { Flex } from "antd";

import logo from "@/shared/assets/logo.png";

import styles from "./AuthCardContainer.module.css";

export const AuthCardContainer = ({ children }: { children: React.ReactNode }) => (
  <Flex
    align="center"
    justify="center"
    className={styles.page}
  >
    <Flex
      gap={32}
      vertical
      className={styles.card}
    >
      <Flex justify="center">
        <img
          src={logo}
          alt="CESEP"
          className={styles.logo}
        />
      </Flex>

      {children}
    </Flex>
  </Flex>
);
