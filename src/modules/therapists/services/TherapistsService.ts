import api from "@/shared/api/client";
import type { CommonResponse } from "@/shared/types/common";
import type {
  TherapistResponse,
  TherapistsResponse,
  TherapistsPayload,
  TherapistSubmitPayload,
  Therapist,
} from "../types/therapist";

const therapistToFormData = (therapist: Partial<Therapist>): FormData => {
  const formData = new FormData();

  Object.entries(therapist).forEach(([key, value]) => {
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

const TherapistsService = {
  async getTherapist(id: number): Promise<TherapistResponse> {
    const response = await api.get(`/profiles/${id}`);
    return response.data;
  },

  async getTherapists(params: TherapistsPayload): Promise<TherapistsResponse> {
    const response = await api.get("/profiles", { params });
    return response.data;
  },

  async createTherapist(user: TherapistSubmitPayload): Promise<TherapistResponse> {
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

  async updateTherapist(therapist: Partial<Therapist>): Promise<TherapistResponse> {
    const hasFile = therapist.photo instanceof File;
    const hasRemovePhoto = therapist.remove_photo === true;
    const useFormData = hasFile || hasRemovePhoto;
    const data = useFormData ? therapistToFormData(therapist) : { profile: therapist };
    const headers = useFormData ? { "Content-Type": undefined } : {};
    const response = await api.put(`/profiles/${therapist.id}`, data, { headers });
    return response.data;
  },

  async deleteTherapist(therapistId: number): Promise<CommonResponse> {
    const response = await api.delete(`/profiles/${therapistId}`);
    return response.data;
  },
};

export default TherapistsService;
