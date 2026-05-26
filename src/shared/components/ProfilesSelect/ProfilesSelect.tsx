import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonIconHelp } from "@/shared/components/CommonHelpIcon/CommonHelpIcon";
import ProfilesSelectService from "@/shared/services/ProfilesSelectService";
import type { ProfileRole } from "@/shared/types/profile";

type ProfilesSelectProps = Omit<SelectProps, "options"> & {
  role: ProfileRole;
  label?: string;
  required?: boolean;
  showHelp?: boolean;
  therapistId?: number;
  patientId?: number;
};

export const ProfilesSelect: React.FC<ProfilesSelectProps> = ({
  role,
  showHelp,
  label,
  therapistId,
  patientId,
  ...props
}) => {
  const { t } = useTranslation();

  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getProfiles = useCallback(async (name?: string) => {
    const response = await ProfilesSelectService.getProfiles(role, { name, therapistId, patientId });

    if (response.success) {
      setOptions(response.profiles.map((p) => ({ label: p.name, value: p.id })));
    }
  }, [role, therapistId, patientId]);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const handleSearch = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      getProfiles(value || undefined);
    }, 200);
  }, [getProfiles]);

  return (
    <CommonSelect
      label={label || t(`common.columns.${role}`)}
      options={options}
      icon={showHelp ? <CommonIconHelp text={t("common.help.defaultValue")} /> : undefined}
      allowClear
      showSearch={{ filterOption: false, onSearch: handleSearch }}
      {...props}
    />
  );
};
