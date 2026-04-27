import { IconX } from "@tabler/icons-react";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { COLORS } from "@/shared/theme";

type CommonCloseButtonProps = {
  onClick: () => void;
};

export const CommonCloseButton = ({ onClick }: CommonCloseButtonProps) => {
  return (
    <CommonButton
      onClick={onClick}
      icon={<IconX size={18} color={COLORS.white} stroke={3} />}
      size="small"
      buttonVariant="danger"
      circular
    />
  );
};
