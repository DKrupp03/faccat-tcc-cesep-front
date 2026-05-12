import styles from "./SectionsCard.module.css";

type SectionsCardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const SectionsCard = ({ children, style }: SectionsCardProps) => {
  return (
    <div
      className={styles.card}
      style={style}
    >
      {children}
    </div>
  );
};
