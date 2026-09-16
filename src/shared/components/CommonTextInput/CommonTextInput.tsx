import type { ReactNode } from "react";
import { Input, Flex, type InputProps } from "antd";
import type { PasswordProps } from "antd/es/input/Password";

import { CommonField } from "../CommonField/CommonField";

import styles from "./CommonTextInput.module.css";

type CommonTextInputProps = InputProps & {
  icon?: ReactNode;
  password?: boolean;
  label?: string;
  required?: boolean;
};

export const CommonTextInput: React.FC<CommonTextInputProps> = ({
  icon,
  password = false,
  label,
  required = false,
  ...props
}: CommonTextInputProps) => {
  const prefix = icon
    ? <Flex className={styles.prefix}>{icon}</Flex>
    : undefined;

  return (
    <CommonField label={label} required={required}>
      {password ? (
        <Input.Password
          prefix={prefix}
          size="large"
          variant="filled"
          className={styles.input}
          {...(props as PasswordProps)}
        />
      ) : (
        <Input
          prefix={prefix}
          size="large"
          variant="filled"
          className={styles.input}
          {...props}
        />
      )}
    </CommonField>
  );
};
