import { useState } from "react";
import { Input } from "antd";
import type { TextAreaProps } from "antd/es/input/TextArea";

import styles from "./CommonTextArea.module.css";

const { TextArea } = Input;

type CommonTextAreaProps = TextAreaProps & {
  label?: string;
  required?: boolean;
};

export const CommonTextArea: React.FC<CommonTextAreaProps> = ({
  label,
  onFocus,
  onBlur,
  required = false,
  ...props
}: CommonTextAreaProps) => {
  const [focused, setFocused] = useState(false);

  const hasValue = !!props.value || !!props.defaultValue;
  const isFloating = focused || hasValue;

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const labelEl = label ? (
    <span className={`${styles.label} ${isFloating ? styles.labelFloating : ""}`}>
      {label} {required && <span className={styles.required}>*</span>}
    </span>
  ) : null;

  return (
    <div className={styles.wrapper}>
      {labelEl}
      <TextArea
        size="large"
        className={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
};
