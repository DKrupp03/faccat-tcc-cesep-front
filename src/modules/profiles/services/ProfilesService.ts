import api from "@/shared/api/client";
import type { CommonResponse } from "@/shared/types/common";
import type {
  ProfileResponse,
  ProfilesResponse,
  ProfilesPayload,
  ProfileSubmitPayload,
  Profile,
} from "../types/profile";

const profileToFormData = (profile: Partial<Profile>): FormData => {
  const formData = new FormData();

  Object.entries(profile).forEach(([key, value]) => {
    if (key === "photo" && value instanceof File) {
      formData.append("profile[photo]", value, value.name);
    } else if (key === "remove_photo" && value === true) {
      formData.append("profile[remove_photo]", "1");
    } else if (value !== undefined && value !== null) {
      formData.append(`profile[${key}]`, String(value));
    }
  });

  return formData;
};

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
    const hasFile = user.profile?.photo instanceof File;

    if (!hasFile) {
      const response = await api.post("/signup", { user });
      return response.data;
    }

    const formData = new FormData();
    formData.append("user[email]", user.email);
    Object.entries(user.profile).forEach(([key, value]) => {
      if (key === "photo" && value instanceof File) {
        formData.append("user[profile][photo]", value, value.name);
      } else if (value !== undefined && value !== null) {
        formData.append(`user[profile][${key}]`, String(value));
      }
    });

    const response = await api.post("/signup", formData, { headers: { "Content-Type": undefined } });
    return response.data;
  },

  async createPatientProfile(profile: Partial<Profile>): Promise<ProfileResponse> {
    const hasFile = profile.photo instanceof File;
    const data = hasFile ? profileToFormData(profile) : { profile };
    const headers = hasFile ? { "Content-Type": undefined } : {};
    const response = await api.post("/profiles", data, { headers });
    return response.data;
  },

  async updateProfile(profile: Partial<Profile>): Promise<ProfileResponse> {
    const hasFile = profile.photo instanceof File;
    const hasRemovePhoto = profile.remove_photo === true;
    const useFormData = hasFile || hasRemovePhoto;
    const data = useFormData ? profileToFormData(profile) : { profile };
    const headers = useFormData ? { "Content-Type": undefined } : {};
    const response = await api.put(`/profiles/${profile.id}`, data, { headers });
    return response.data;
  },

  async deleteProfile(profileId: number): Promise<CommonResponse> {
    const response = await api.delete(`/profiles/${profileId}`);
    return response.data;
  },
};

export default ProfilesService;
