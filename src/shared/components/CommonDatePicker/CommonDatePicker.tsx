import { useState } from "react";
import { DatePicker, type DatePickerProps } from "antd";
import type { BaseInfo } from "@rc-component/picker/es/interface";

import styles from "./CommonDatePicker.module.css";

type CommonDatePickerProps = DatePickerProps & {
  label?: string;
  required?: boolean;
};

export const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
  label,
  onFocus,
  onBlur,
  required,
  ...props
}: CommonDatePickerProps) => {
  const [focused, setFocused] = useState(false);

  const hasValue = !!props.value || !!props.defaultValue;
  const isFloating = focused || hasValue;

  const handleFocus = (e: React.FocusEvent<HTMLElement>, info: BaseInfo) => {
    setFocused(true);
    onFocus?.(e, info);
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>, info: BaseInfo) => {
    setFocused(false);
    onBlur?.(e, info);
  };

  const labelEl = label ? (
    <span className={`${styles.label} ${isFloating ? styles.labelFloating : ""}`}>
      {label} {required && <span className={styles.required}>*</span>}
    </span>
  ) : null;

  return (
    <div className={styles.wrapper}>
      {labelEl}
      <DatePicker
        size="large"
        className={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=""
        format={{
          format: "DD/MM/YYYY",
          type: "mask",
        }}
        {...props}
      />
    </div>
  );
};
