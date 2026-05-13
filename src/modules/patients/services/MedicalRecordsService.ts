import api from "@/shared/api/client";
import type { CommonResponse } from "@/shared/types/common";
import type {
  MedicalRecordType,
  MedicalRecordsPayload,
  MedicalRecordResponse,
  MedicalRecordsResponse,
} from "../types/medicalRecord";

const medicalRecordToFormData = (record: Partial<MedicalRecordType>): FormData => {
  const formData = new FormData();

  Object.entries(record).forEach(([key, value]) => {
    if (key === "new_attachments" && Array.isArray(value)) {
      value.forEach((file) => {
        if (file instanceof File) {
          formData.append("medical_record[attachments][]", file, file.name);
        }
      });
    } else if (key === "remove_attachment_ids" && Array.isArray(value)) {
      value.forEach((id) => {
        formData.append("medical_record[remove_attachment_ids][]", String(id));
      });
    } else if (key === "attachments") {
      // server-side read DTO, never sent back
      return;
    } else if (value !== undefined && value !== null) {
      formData.append(`medical_record[${key}]`, String(value));
    }
  });

  return formData;
};

const hasFiles = (record: Partial<MedicalRecordType>): boolean => {
  const newFiles = record.new_attachments;
  return Array.isArray(newFiles) && newFiles.some((f) => f instanceof File);
};

const hasRemovals = (record: Partial<MedicalRecordType>): boolean => {
  return Array.isArray(record.remove_attachment_ids) && record.remove_attachment_ids.length > 0;
};

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
    const useFormData = hasFiles(medicalRecord);
    const data = useFormData
      ? medicalRecordToFormData(medicalRecord)
      : { medical_record: medicalRecord };
    const headers = useFormData ? { "Content-Type": undefined } : {};
    const response = await api.post(
      `/profiles/${patientId}/medical_records`,
      data,
      { headers },
    );

    return response.data;
  },

  async updateMedicalRecord(
    patientId: number,
    medicalRecord: Partial<MedicalRecordType>,
  ): Promise<MedicalRecordResponse> {
    const useFormData = hasFiles(medicalRecord) || hasRemovals(medicalRecord);
    const data = useFormData
      ? medicalRecordToFormData(medicalRecord)
      : { medical_record: medicalRecord };
    const headers = useFormData ? { "Content-Type": undefined } : {};
    const response = await api.put(
      `/profiles/${patientId}/medical_records/${medicalRecord.id}`,
      data,
      { headers },
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
