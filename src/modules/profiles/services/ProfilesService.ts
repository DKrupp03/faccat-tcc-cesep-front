import api from "@/shared/api/client";
import type { CommonResponse } from "@/shared/types/common";
import type {
  ProfileResponse,
  ProfilesResponse,
  ProfilesPayload,
  ProfileSubmitPayload,
  Profile,
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

  async createProfile(user: ProfileSubmitPayload): Promise<ProfileResponse> {
    const response = await api.post("/signup", { user });
    return response.data;
  },

  async createPatientProfile(profile: Partial<Profile>): Promise<ProfileResponse> {
    const response = await api.post("/profiles", { profile });
    return response.data;
  },

  async updateProfile(profile: Partial<Profile>): Promise<ProfileResponse> {
    const response = await api.put(`/profiles/${profile.id}`, { profile });
    return response.data;
  },

  async deleteProfile(profileId: number): Promise<CommonResponse> {
    const response = await api.delete(`/profiles/${profileId}`);
    return response.data;
  },
};

export default ProfilesService;
