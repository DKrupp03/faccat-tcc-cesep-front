import styles from "./CommonField.module.css";

type CommonFieldProps = {
  label?: string;
  required?: boolean;
  labelSuffix?: React.ReactNode;
  // id do controle (o Form.Item injeta); liga o rótulo ao campo
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
};

// Rótulo acima do campo (padrão C).
export const CommonField = ({
  label,
  required = false,
  labelSuffix,
  htmlFor,
  className,
  children,
}: CommonFieldProps) => (
  <div className={`${styles.field} ${className ?? ""}`}>
    {label && (
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
        {required && <span className={styles.required}>*</span>}
        {labelSuffix}
      </label>
    )}
    {children}
  </div>
);
