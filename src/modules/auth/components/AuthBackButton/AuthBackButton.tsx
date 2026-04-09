import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { colors } from "@/shared/theme";
import { PATHS } from "@/routes/paths";

import styles from "./AuthBackButton.module.css";

export const AuthBackButton = () => {
  const navigate = useNavigate();

  return (
    <CommonButton
      size="small"
      className={styles.backButton}
      onClick={() => navigate(PATHS.login)}
    >
      <IconChevronLeft color={colors.gray[300]} />
    </CommonButton>
  );
};
