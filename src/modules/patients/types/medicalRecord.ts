import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";

export type MedicalRecordsOrder = "date_desc" | "date_asc";

export type MedicalRecordsFilter = {
  date_start?: string;
  date_end?: string;
};

export type MedicalRecordsPayload = {
  medical_records: MedicalRecordsFilter;
  order_by: MedicalRecordsOrder;
  page?: number;
  per_page?: number;
};

export type MedicalRecordType = {
  id: number;
  title: string;
  date: string;
  observations: string;
  service_id?: number;
  // service: ServiceType;
};

export type MedicalRecordResponse = CommonResponse & {
  medical_record: MedicalRecordType;
};

export type MedicalRecordsResponse = CommonPanelResponse & {
  medical_records: MedicalRecordType[];
};
