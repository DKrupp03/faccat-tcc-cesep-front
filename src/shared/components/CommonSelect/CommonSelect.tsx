import { useRef, useCallback, type ReactNode } from "react";
import { Select, Flex, Spin, type SelectProps, type RefSelectProps } from "antd";

import { CommonField } from "../CommonField/CommonField";

import styles from "./CommonSelect.module.css";

type CommonSelectProps = SelectProps & {
  icon?: ReactNode;
  label?: string;
  required?: boolean;
};

const blurActive = () => {
  setTimeout(() => (document.activeElement as HTMLElement)?.blur(), 0);
};

const loadingIndicator = <Spin size="small" />;

export const CommonSelect: React.FC<CommonSelectProps> = ({
  icon,
  label,
  onChange,
  onClear,
  onOpenChange,
  loading,
  labelRender,
  notFoundContent,
  required = false,
  ...props
}: CommonSelectProps) => {
  const selectRef = useRef<RefSelectProps>(null);

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

  return (
    <CommonField label={label} required={required}>
      {icon && <Flex className={styles.prefix}>{icon}</Flex>}
      <Select
        ref={selectRef}
        size="large"
        variant="filled"
        className={`${styles.select} ${icon ? styles.selectWithPrefix : ""}`}
        classNames={{ popup: { root: styles.popup } }}
        onChange={handleChange}
        onClear={handleClear}
        onOpenChange={handleOpenChange}
        labelRender={loading ? () => loadingIndicator : labelRender}
        notFoundContent={loading ? loadingIndicator : notFoundContent}
        {...props}
      />
    </CommonField>
  );
};
