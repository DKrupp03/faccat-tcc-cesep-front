import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonIconHelp } from "@/shared/components/CommonHelpIcon/CommonHelpIcon";
import ProfilesSelectService from "@/shared/services/ProfilesSelectService";
import type { ProfileRole } from "@/shared/types/profile";

type SelectedProfile = {
  id: number;
  name: string;
};

type ProfilesSelectProps = Omit<SelectProps, "options"> & {
  role: ProfileRole;
  label?: string;
  required?: boolean;
  showHelp?: boolean;
  therapistId?: number;
  patientId?: number;
  selectedProfile?: SelectedProfile;
};

export const ProfilesSelect: React.FC<ProfilesSelectProps> = ({
  role,
  showHelp,
  label,
  therapistId,
  patientId,
  selectedProfile,
  ...props
}) => {
  const { t } = useTranslation();

  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchProfiles = useCallback(async (name?: string) => {
    const response = await ProfilesSelectService.getProfiles(role, { name, therapistId, patientId });

    return response.success
      ? response.profiles.map((p) => ({ label: p.name, value: p.id }))
      : null;
  }, [role, therapistId, patientId]);

  useEffect(() => {
    let active = true;
    fetchProfiles().then((opts) => {
      if (active && opts) setOptions(opts);
    });
    return () => {
      active = false;
    };
  }, [fetchProfiles]);

  const handleSearch = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchProfiles(value || undefined).then((opts) => {
        if (opts) setOptions(opts);
      });
    }, 200);
  }, [fetchProfiles]);

  // Garante que o perfil já selecionado apareça com o nome, mesmo que não
  // esteja na página atual de opções carregadas (paginação da busca).
  const mergedOptions = useMemo(() => {
    if (selectedProfile && !options.some((option) => option.value === selectedProfile.id)) {
      return [{ label: selectedProfile.name, value: selectedProfile.id }, ...options];
    }

    return options;
  }, [options, selectedProfile]);

  return (
    <CommonSelect
      label={label || t(`common.roles.${role}`)}
      options={mergedOptions}
      icon={showHelp ? <CommonIconHelp text={t("common.help.defaultValue")} /> : undefined}
      allowClear
      showSearch={{ filterOption: false, onSearch: handleSearch }}
      {...props}
    />
  );
};
