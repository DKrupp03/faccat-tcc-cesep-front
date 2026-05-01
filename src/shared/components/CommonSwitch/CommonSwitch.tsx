import { Flex, Typography, Switch } from "antd";

import styles from "./CommonSwitch.module.css";

type CommonSwitchProps = {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  value?: boolean;
  onChange?: (checked: boolean) => void;
};

const { Text } = Typography;

export const CommonSwitch = ({
  label,
  icon,
  disabled,
  value,
  onChange,
}: CommonSwitchProps) => {
  return (
    <Flex gap={12} align="center">
      <Switch
        checked={value}
        onChange={onChange}
        disabled={disabled}
      />
      <Text
        className={styles.label}
        style={{ fontWeight: value ? 550 : 500 }}
      >
        {label}
      </Text>
      {icon}
    </Flex>
  );
};
