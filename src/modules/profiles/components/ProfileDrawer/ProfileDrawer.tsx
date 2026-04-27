import { CommonDrawer } from "@/shared/components/CommonDrawer/CommonDrawer";

type ProfileDrawerProps = {
  profileId?: number;
  isOpen: boolean;
  close: () => void;
};

export const ProfileDrawer = ({
  profileId,
  isOpen,
  close,
}: ProfileDrawerProps) => {
  return (
    <>
      <CommonDrawer
        isOpen={isOpen}
        close={close}
        title="Profile"
      >
        teste
      </CommonDrawer>
    </>
  );
};
