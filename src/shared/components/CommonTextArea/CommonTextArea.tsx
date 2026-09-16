import { Input } from "antd";
import type { TextAreaProps } from "antd/es/input/TextArea";

import { CommonField } from "../CommonField/CommonField";

import styles from "./CommonTextArea.module.css";

const { TextArea } = Input;

type CommonTextAreaProps = TextAreaProps & {
  label?: string;
  required?: boolean;
};

export const CommonTextArea: React.FC<CommonTextAreaProps> = ({
  label,
  required = false,
  ...props
}: CommonTextAreaProps) => (
  <CommonField label={label} required={required}>
    <TextArea
      size="large"
      variant="filled"
      className={styles.input}
      {...props}
    />
  </CommonField>
);
