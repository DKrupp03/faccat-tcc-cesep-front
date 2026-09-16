import { IconX } from "@tabler/icons-react";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

type CommonCloseButtonProps = {
  onClick: () => void;
  outline?: boolean;
  className?: string;
};

// Gaveta: 40px, branco com sombra. Modal: 34px, fundo neutro.
export const CommonCloseButton = ({ onClick, outline = false, className }: CommonCloseButtonProps) => {
  return (
    <CommonButton
      onClick={onClick}
      icon={<IconX size={18} />}
      buttonVariant="outline"
      outline={outline}
      className={className}
    />
  );
};
