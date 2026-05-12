import api from "@/shared/api/client";
import type { CommonPanelResponse } from "@/shared/types/common";
import type { ProfileRole } from "@/shared/types/profile";

type ProfilesSelectOption = {
  id: number;
  name: string;
};

type ProfilesSelectResponse = CommonPanelResponse & {
  profiles: ProfilesSelectOption[];
};

const ProfilesSelectService = {
  async getProfiles(role: ProfileRole, name?: string): Promise<ProfilesSelectResponse> {
    const response = await api.get("/profiles", {
      params: {
        profiles: { active: 1, role, name },
        order_by: "name_asc",
        page: 1,
      },
    });
    return response.data;
  },
};

export default ProfilesSelectService;
