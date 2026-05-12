import api from "@/shared/api/client";
import type { AnamneseType, AnamneseResponse } from "../types/anamnese";

const PatientAnamneseService = {
  async createPatientAnamnese(
    patientId: number,
    anamnese: Partial<AnamneseType>,
  ): Promise<AnamneseResponse> {
    const response = await api.post(`/profiles/${patientId}/anamneses`, { anamnese });
    return response.data;
  },

  async updatePatientAnamnese(
    patientId: number,
    anamnese: Partial<AnamneseType>,
  ): Promise<AnamneseResponse> {
    const response = await api.put(`/profiles/${patientId}/anamneses/${anamnese.id}`, { anamnese });
    return response.data;
  },
};

export default PatientAnamneseService;
