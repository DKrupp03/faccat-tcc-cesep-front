export type ErrorsType = { [key: string]: string }[] | string[];

export type CommonResponse = {
  success: boolean;
  error?: string;
  errors?: ErrorsType;
};
