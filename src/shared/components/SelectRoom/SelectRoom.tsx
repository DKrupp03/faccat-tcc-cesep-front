import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import RoomsService from "@/shared/services/RoomsService";
import type { Room } from "@/shared/types/room";

type SelectRoomProps = Omit<SelectProps, "options"> & {
  label?: string;
  required?: boolean;
  // Sala já vinculada ao registro: exibe o nome antes de a lista carregar.
  selectedRoom?: Room | null;
};

const toOption = (room: Room): DefaultOptionType => ({
  label: room.name,
  value: room.id,
});

export const SelectRoom: React.FC<SelectRoomProps> = ({
  label,
  selectedRoom,
  value,
  onOpenChange,
  ...props
}) => {
  const { t } = useTranslation();

  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const response = await RoomsService.getRooms();
      return response.success ? response.rooms.map(toOption) : null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchRooms().then((fetched) => {
      if (active && fetched) setOptions(fetched);
    });
    return () => {
      active = false;
    };
  }, [fetchRooms]);

  // Recarrega ao abrir: o admin pode ter alterado as salas com o formulário
  // já montado.
  const handleOpenChange = useCallback((open: boolean) => {
    onOpenChange?.(open);
    if (!open) return;

    fetchRooms().then((fetched) => {
      if (fetched) setOptions(fetched);
    });
  }, [onOpenChange, fetchRooms]);

  const mergedOptions = useMemo(() => {
    if (!selectedRoom || selectedRoom.id !== value) return options;
    if (options.some((option) => option.value === selectedRoom.id)) return options;

    return [toOption(selectedRoom), ...options];
  }, [options, selectedRoom, value]);

  return (
    <CommonSelect
      label={label || t("services.columns.room")}
      options={mergedOptions}
      value={value}
      loading={loading}
      onOpenChange={handleOpenChange}
      allowClear
      {...props}
    />
  );
};
