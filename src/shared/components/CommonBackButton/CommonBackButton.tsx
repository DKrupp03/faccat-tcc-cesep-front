import { IconChevronLeft } from "@tabler/icons-react";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

import styles from "./CommonBackButton.module.css";

type CommonBackButtonProps = {
  onClick: () => void;
};

// Botão de ícone neutro de 34px (mesmo padrão do fechar da modal).
export const CommonBackButton = ({ onClick }: CommonBackButtonProps) => {
  return (
    <CommonButton
      onClick={onClick}
      icon={<IconChevronLeft size={18} />}
      className={styles.button}
    />
  );
};
