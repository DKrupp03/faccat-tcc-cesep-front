import api from "@/shared/api/client";
import type {
  ProfileResponse,
  ProfilesResponse,
  ProfilesPayload,
} from "../types/profile";

const ProfilesService = {
  async getProfile(id: number): Promise<ProfileResponse> {
    const response = await api.get(`/profiles/${id}`);

    return response.data;
  },

  async getProfiles(params: ProfilesPayload): Promise<ProfilesResponse> {
    const response = await api.get("/profiles", { params });

    return response.data;
  },
};

export default ProfilesService;
