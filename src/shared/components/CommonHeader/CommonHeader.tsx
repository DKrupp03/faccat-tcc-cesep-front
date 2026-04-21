import { Flex, Typography } from "antd";
import { IconMenu2 } from "@tabler/icons-react";

import { CommonButton } from "../CommonButton/CommonButton";

import styles from "./CommonHeader.module.css";

const { Title } = Typography;

type CommonHeaderProps = {
  title: string;
  options?: { label: string; onClick: () => void; }[];
  buttons?: React.ReactNode[];
};

export const CommonHeader = ({
  title,
  options,
  buttons,
}: CommonHeaderProps) => {
  return (
    <Flex
      justify="space-between" align="center"
      className={styles.header}
    >
      <Flex align="center" gap={16}>
        {options && (
          <CommonButton
            onClick={() => {}}
            icon={<IconMenu2 size={16} />}
            className={styles.optionsButton}
          />
        )}

        <Title level={3}>
          {title}
        </Title>
      </Flex>

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
