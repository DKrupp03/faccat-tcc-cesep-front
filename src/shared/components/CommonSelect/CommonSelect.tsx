import { useState, useRef, useCallback, type ReactNode } from "react";
import { Select, Flex, type SelectProps, type RefSelectProps } from "antd";

import styles from "./CommonSelect.module.css";

type CommonSelectProps = SelectProps & {
  icon?: ReactNode;
  label?: string;
};

const blurActive = () => {
  setTimeout(() => (document.activeElement as HTMLElement)?.blur(), 0);
};

export const CommonSelect: React.FC<CommonSelectProps> = ({
  icon,
  label,
  onFocus,
  onBlur,
  onChange,
  onClear,
  onOpenChange,
  ...props
}: CommonSelectProps) => {
  const [focused, setFocused] = useState(false);
  const selectRef = useRef<RefSelectProps>(null);

  const hasValue = props.value !== undefined && props.value !== null && props.value !== "";
  const isFloating = focused || hasValue;

  const handleFocus = useCallback((e: React.FocusEvent<HTMLElement>) => {
    setFocused(true);
    onFocus?.(e);
  }, [onFocus]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    setFocused(false);
    onBlur?.(e);
  }, [onBlur]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) blurActive();
    onOpenChange?.(open);
  }, [onOpenChange]);

  const handleClear = useCallback(() => {
    blurActive();
    onClear?.();
  }, [onClear]);

  const handleChange = useCallback<NonNullable<SelectProps["onChange"]>>((value, option) => {
    onChange?.(value, option);
  }, [onChange]);

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
        ref={selectRef}
        size="large"
        className={`${styles.select} ${icon ? styles.selectWithPrefix : ""}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onClear={handleClear}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </div>
  );
};
