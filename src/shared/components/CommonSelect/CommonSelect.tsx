import { useState, type ReactNode } from "react";
import { Select, Flex, type SelectProps } from "antd";

import styles from "./CommonSelect.module.css";

type CommonSelectProps = SelectProps & {
  icon?: ReactNode;
  label?: string;
};

export const CommonSelect: React.FC<CommonSelectProps> = ({
  icon,
  label,
  onFocus,
  onBlur,
  ...props
}: CommonSelectProps) => {
  const [focused, setFocused] = useState(false);

  const hasValue = props.value !== undefined && props.value !== null && props.value !== "";
  const isFloating = focused || hasValue;

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const labelEl = label ? (
    <span className={`${styles.label} ${icon ? styles.labelWithPrefix : ""} ${isFloating ? styles.labelFloating : ""}`}>
      {label}
    </span>
  ) : null;

  return (
    <div className={styles.wrapper}>
      {labelEl}
      {icon && <Flex className={styles.prefix}>{icon}</Flex>}
      <Select
        size="large"
        className={`${styles.select} ${icon ? styles.selectWithPrefix : ""}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
};
