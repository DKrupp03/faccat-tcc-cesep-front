import { Flex, Typography } from "antd";

import styles from "./CommonHeader.module.css";

const { Title } = Typography;

type CommonHeaderProps = {
  title: string;
  buttons?: React.ReactNode[];
};

export const CommonHeader = ({
  title,
  buttons,
}: CommonHeaderProps) => {
  return (
    <Flex
      justify="space-between" align="center"
      className={styles.header}
    >
      <Title level={3}>
        {title}
      </Title>

      {buttons && (
        <Flex gap={8}>
          {buttons.map((button) => (
            button
          ))}
        </Flex>
      )}
    </Flex>
  );
};
