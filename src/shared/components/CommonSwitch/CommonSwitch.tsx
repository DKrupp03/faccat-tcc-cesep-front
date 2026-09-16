import { Flex, Typography, Switch } from "antd";

import { TOKENS } from "../../theme";

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
    <Flex gap={TOKENS.space[12]} align="center">
      <Switch
        checked={value}
        onChange={onChange}
        disabled={disabled}
      />
      <Text className={value ? `${styles.label} ${styles.labelActive}` : styles.label}>
        {label}
      </Text>
      {icon}
    </Flex>
  );
};
