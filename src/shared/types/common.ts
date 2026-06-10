export type ErrorsType = string[];

export type CommonResponse = {
  success: boolean;
  error?: string;
  errors?: ErrorsType;
};

export type CommonPanelResponse = CommonResponse & {
  total: number;
  total_filtered: number;
  total_active?: number;
};