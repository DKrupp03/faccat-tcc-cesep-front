import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";

export type MedicalRecordsOrder = "date_desc" | "date_asc";

export type MedicalRecordsFilter = {
  date_start?: string;
  date_end?: string;
  // 1 (vistos), 0 (não vistos) ou -1 (todos), como o filtro de situação.
  reviewed?: number;
};

export type MedicalRecordsPayload = {
  medical_records: MedicalRecordsFilter;
  order_by: MedicalRecordsOrder;
  page?: number;
  per_page?: number;
};

export type MedicalRecordAttachment = {
  id: number;
  name: string;
  url: string;
};

export type MedicalRecordReviewer = {
  id: number;
  name: string;
};

export type MedicalRecordType = {
  id: number;
  title: string;
  date: string;
  evolution: string;
  documentary_record?: string | null;
  supervision_record?: string | null;
  service_id?: number;
  reviewed?: boolean;
  reviewer_id?: number | null;
  reviewed_at?: string | null;
  reviewer?: MedicalRecordReviewer | null;
  attachments?: MedicalRecordAttachment[];
  new_attachments?: File[];
  remove_attachment_ids?: number[];
};

export type MedicalRecordResponse = CommonResponse & {
  medical_record: MedicalRecordType;
};

export type MedicalRecordsResponse = CommonPanelResponse & {
  medical_records: MedicalRecordType[];
};
