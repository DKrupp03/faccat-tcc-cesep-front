import styles from "./CommonField.module.css";

type CommonFieldProps = {
  label?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

// Rótulo acima do campo (padrão C).
export const CommonField = ({
  label,
  required = false,
  className,
  children,
}: CommonFieldProps) => (
  <div className={`${styles.field} ${className ?? ""}`}>
    {label && (
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    )}
    {children}
  </div>
);
