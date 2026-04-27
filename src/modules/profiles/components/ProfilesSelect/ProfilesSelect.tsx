import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";

import { useProfiles } from "../../hooks/useProfiles";
import { useProfilesOperations } from "../../hooks/useProfilesOperations";

type ProfilesSelectProps = Omit<SelectProps, "options"> & {
  role: "patient" | "therapist";
};

export const ProfilesSelect: React.FC<ProfilesSelectProps> = ({ role, ...props }) => {
  const { t } = useTranslation();
  const { isFilterOpen } = useProfiles();
  const { fetchProfiles } = useProfilesOperations();

  const [options, setOptions] = useState<DefaultOptionType[]>([]);

  const load = useCallback(async () => {
    const response = await fetchProfiles({ active: 1, role }, "name_asc");

    if (response.success) {
      setOptions(response.profiles.map((p) => ({ label: p.name, value: p.id })));
    }
  }, [role, fetchProfiles]);

  useEffect(() => {
    if (isFilterOpen) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterOpen]);

  return (
    <CommonSelect
      label={t(`profiles.columns.${role}`)}
      options={options}
      allowClear
      {...props}
    />
  );
};
