import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonIconHelp } from "@/shared/components/CommonHelpIcon/CommonHelpIcon";

import { useProfilesOperations } from "../../hooks/useProfilesOperations";

type ProfilesSelectProps = Omit<SelectProps, "options"> & {
  role: "patient" | "therapist";
  required?: boolean;
  showHelp?: boolean;
};

export const ProfilesSelect: React.FC<ProfilesSelectProps> = ({ role, showHelp, ...props }) => {
  const { t } = useTranslation();
  const { fetchProfiles } = useProfilesOperations();

  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getProfiles = useCallback(async (name?: string) => {
    const response = await fetchProfiles({ active: 1, role, name }, "name_asc", 1);

    if (response.success) {
      setOptions(response.profiles.map((p) => ({ label: p.name, value: p.id })));
    }
  }, [role, fetchProfiles]);

  useEffect(() => {
    getProfiles();
  }, []);

  const handleSearch = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      getProfiles(value || undefined);
    }, 200);
  }, [getProfiles]);

  return (
    <CommonSelect
      label={t(`common.columns.${role}`)}
      options={options}
      icon={showHelp ? <CommonIconHelp text={t("profiles.help.defaultValue")} /> : undefined}
      allowClear
      showSearch={{ filterOption: false, onSearch: handleSearch }}
      {...props}
    />
  );
};
