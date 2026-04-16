import { useState, type ReactNode } from "react";
import { Input, Flex, type InputProps } from "antd";
import type { PasswordProps } from "antd/es/input/Password";

import styles from "./CommonTextInput.module.css";

type CommonTextInputProps = InputProps & {
  icon?: ReactNode;
  password?: boolean;
  label?: string;
};

export const CommonTextInput: React.FC<CommonTextInputProps> = ({
  icon,
  password = false,
  label,
  onFocus,
  onBlur,
  ...props
}: CommonTextInputProps) => {
  const [focused, setFocused] = useState(false);

  const hasValue = !!props.value || !!props.defaultValue;
  const isFloating = focused || hasValue;

  const prefix = icon
    ? <Flex className={styles.prefix}>{icon}</Flex>
    : undefined;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const labelEl = label ? (
    <span className={`${styles.label} ${icon ? styles.labelWithPrefix : ""} ${isFloating ? styles.labelFloating : ""}`}>
      {label}
    </span>
  ) : null;

  if (password) {
    return (
      <div className={styles.wrapper}>
        {labelEl}
        <Input.Password
          prefix={prefix}
          size="large"
          className={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...(props as PasswordProps)}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {labelEl}
      <Input
        prefix={prefix}
        size="large"
        className={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
};
