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
  value,
  ...props
}) => {
  const { t } = useTranslation();

  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [resolvedProfile, setResolvedProfile] = useState<SelectedProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchProfiles = useCallback(async (name?: string) => {
    setLoading(true);
    try {
      const response = await ProfilesSelectService.getProfiles(role, { name, therapistId, patientId });

      return response.success
        ? response.profiles.map((p) => ({ label: p.name, value: p.id }))
        : null;
    } finally {
      setLoading(false);
    }
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

  const handleSearch = useCallback((search: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchProfiles(search || undefined).then((opts) => {
        if (opts) setOptions(opts);
      });
    }, 200);
  }, [fetchProfiles]);

  // Self-heal: se há um valor selecionado mas seu nome é desconhecido (não está
  // na página carregada, não veio via selectedProfile e ainda não foi resolvido),
  // busca o perfil pelo id para exibir o nome no lugar do id.
  useEffect(() => {
    if (value === undefined || value === null) return;
    if (selectedProfile?.id === value) return;
    if (resolvedProfile?.id === value) return;
    if (options.some((option) => option.value === value)) return;

    let active = true;
    ProfilesSelectService.getProfile(Number(value)).then((response) => {
      if (active && response.success) {
        setResolvedProfile({ id: response.profile.id, name: response.profile.name });
      }
    });
    return () => {
      active = false;
    };
  }, [value, options, selectedProfile, resolvedProfile]);

  // Garante que o perfil já selecionado apareça com o nome, mesmo que não esteja
  // na página atual de opções carregadas. Prioriza selectedProfile (sem requisição)
  // e, na sua ausência, o perfil resolvido pelo self-heal — sempre casando com o
  // valor atual.
  const mergedOptions = useMemo(() => {
    const known =
      selectedProfile?.id === value
        ? selectedProfile
        : resolvedProfile?.id === value
          ? resolvedProfile
          : null;

    if (known && !options.some((option) => option.value === known.id)) {
      return [{ label: known.name, value: known.id }, ...options];
    }

    return options;
  }, [options, selectedProfile, resolvedProfile, value]);

  return (
    <CommonSelect
      label={label || t(`common.roles.${role}`)}
      options={mergedOptions}
      value={value}
      loading={loading}
      icon={showHelp ? <CommonIconHelp text={t("common.help.defaultValue")} /> : undefined}
      allowClear
      showSearch={{ filterOption: false, onSearch: handleSearch }}
      {...props}
    />
  );
};
