import { IconChevronLeft } from "@tabler/icons-react";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

type CommonBackButtonProps = {
  onClick: () => void;
};

export const CommonBackButton = ({ onClick }: CommonBackButtonProps) => {
  return (
    <CommonButton
      size="small"
      onClick={onClick}
      circular
      outline
    >
      <IconChevronLeft size={16} />
    </CommonButton>
  );
};
