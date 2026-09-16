import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import { IconDoor } from "@tabler/icons-react";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

import { RoomsModal } from "../RoomsModal/RoomsModal";

// Cadastro de salas: exclusivo do admin (o backend também bloqueia).
export const ServicesRoomsButton = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  if (!profile?.admin) return null;

  return (
    <>
      <Tooltip title={t("services.rooms.title")}>
        <CommonButton
          onClick={open}
          icon={<IconDoor size={18} />}
          outline
        />
      </Tooltip>
      <RoomsModal isOpen={isOpen} close={close} />
    </>
  );
};
