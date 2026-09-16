import { Flex, Typography } from "antd";

import { TOKENS } from "../../theme";

import styles from "./CommonHeader.module.css";

const { Title } = Typography;

type CommonHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export const CommonHeader = ({
  title,
  children,
}: CommonHeaderProps) => {
  return (
    <Flex
      justify="space-between" align="center"
      className={styles.header}
    >
      <Title level={3} className={styles.title}>
        {title}
      </Title>

      <Flex align="center" gap={TOKENS.space[8]}>
        {children}
      </Flex>
    </Flex>
  );
};
