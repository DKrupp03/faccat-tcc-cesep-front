import api from "@/shared/api/client";
import type { CommonResponse } from "@/shared/types/common";
import type {
  MedicalRecordType,
  MedicalRecordsPayload,
  MedicalRecordResponse,
  MedicalRecordsResponse,
} from "../types/medicalRecord";

const MedicalRecordsService = {
  async getMedicalRecord(
    patientId: number,
    medicalRecordId: number,
  ): Promise<MedicalRecordResponse> {
    const response = await api.get(`/profiles/${patientId}/medical_records/${medicalRecordId}`);
    return response.data;
  },

  async getMedicalRecords(
    patientId: number,
    params: MedicalRecordsPayload,
  ): Promise<MedicalRecordsResponse> {
    const response = await api.get(`/profiles/${patientId}/medical_records`, { params });
    return response.data;
  },

  async createMedicalRecord(
    patientId: number,
    medicalRecord: Partial<MedicalRecordType>,
  ): Promise<MedicalRecordResponse> {
    const response = await api.post(
      `/profiles/${patientId}/medical_records`,
      { medical_record: medicalRecord },
    );

    return response.data;
  },

  async updateMedicalRecord(
    patientId: number,
    medicalRecord: Partial<MedicalRecordType>,
  ): Promise<MedicalRecordResponse> {
    const response = await api.put(
      `/profiles/${patientId}/medical_records/${medicalRecord.id}`,
      { medical_record: medicalRecord },
    );

    return response.data;
  },

  async deleteMedicalRecord(
    patientId: number,
    medicalRecordId: number,
  ): Promise<CommonResponse> {
    const response = await api.delete(`/profiles/${patientId}/medical_records/${medicalRecordId}`);
    return response.data;
  },
};

export default MedicalRecordsService;
