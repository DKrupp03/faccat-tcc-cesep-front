import { Flex, Typography } from "antd";

import { TOKENS } from "../../theme";

import styles from "./CommonHeader.module.css";

const { Title } = Typography;

type CommonHeaderProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export const CommonHeader = ({
  title,
  subtitle,
  children,
}: CommonHeaderProps) => {
  return (
    <Flex
      justify="space-between" align="center"
      className={styles.header}
    >
      <Flex vertical gap={TOKENS.space[2]}>
        <Title level={3} className={styles.title}>
          {title}
        </Title>
        {subtitle && (
          <span className={styles.subtitle}>{subtitle}</span>
        )}
      </Flex>

      <Flex align="center" gap={TOKENS.space[8]}>
        {children}
      </Flex>
    </Flex>
  );
};
