import { Flex, Typography, Switch } from "antd";

import styles from "./CommonSwitch.module.css";

type CommonSwitchProps = {
  label: string;
  value?: boolean;
  onChange?: (checked: boolean) => void;
};

const { Text } = Typography;

export const CommonSwitch = ({ label, value, onChange }: CommonSwitchProps) => {
  return (
    <Flex gap={20} align="center">
      <Switch checked={value} onChange={onChange} />
      <Text
        className={styles.label}
        style={{ fontWeight: value ? 550 : 500 }}
      >
        {label}
      </Text>
    </Flex>
  );
};
