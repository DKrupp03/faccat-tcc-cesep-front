import api from "@/shared/api/client";
import type { CommonResponse } from "@/shared/types/common";
import type {
  PatientResponse,
  PatientsResponse,
  PatientsPayload,
  Patient,
} from "../types/patient";

const patientToFormData = (patient: Partial<Patient>): FormData => {
  const formData = new FormData();

  Object.entries(patient).forEach(([key, value]) => {
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

const PatientsService = {
  async getPatient(id: number): Promise<PatientResponse> {
    const response = await api.get(`/profiles/${id}`);
    return response.data;
  },

  async getPatients(params: PatientsPayload): Promise<PatientsResponse> {
    const response = await api.get("/profiles", { params });
    return response.data;
  },

  async createPatient(patient: Partial<Patient>): Promise<PatientResponse> {
    const hasFile = patient.photo instanceof File;
    const data = hasFile ? patientToFormData(patient) : { profile: patient };
    const headers = hasFile ? { "Content-Type": undefined } : {};
    const response = await api.post("/profiles", data, { headers });
    return response.data;
  },

  async updatePatient(patient: Partial<Patient>): Promise<PatientResponse> {
    const hasFile = patient.photo instanceof File;
    const hasRemovePhoto = patient.remove_photo === true;
    const useFormData = hasFile || hasRemovePhoto;
    const data = useFormData ? patientToFormData(patient) : { profile: patient };
    const headers = useFormData ? { "Content-Type": undefined } : {};
    const response = await api.put(`/profiles/${patient.id}`, data, { headers });
    return response.data;
  },

  async deletePatient(patientId: number): Promise<CommonResponse> {
    const response = await api.delete(`/profiles/${patientId}`);
    return response.data;
  },
};

export default PatientsService;
