import api from "@/shared/api/client";
import { type ProfileResponse } from "../../auth/types/profile";

const ProfilesService = {
  async getProfile(id: number): Promise<ProfileResponse> {
    const response = await api.get(`/profiles/${id}`);

    return response.data;
  },
};

export default ProfilesService;
