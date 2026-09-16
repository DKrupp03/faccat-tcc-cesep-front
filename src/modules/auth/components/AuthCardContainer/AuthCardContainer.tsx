import { Flex } from "antd";

import logo from "@/shared/assets/logoCesepFull.png";

import { TOKENS } from "@/shared/theme";

import styles from "./AuthCardContainer.module.css";

export const AuthCardContainer = ({ children }: { children: React.ReactNode }) => (
  <Flex
    align="center"
    justify="center"
    className={styles.page}
  >
    <Flex
      gap={TOKENS.space[32]}
      vertical
      className={styles.card}
    >
      <Flex justify="center">
        <img
          src={logo}
          alt="cesep — Centro de Serviços em Psicologia"
          className={styles.logo}
        />
      </Flex>

      {children}
    </Flex>
  </Flex>
);
