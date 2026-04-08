export type CommonResponse = {
  success: boolean;
  error?: string;
  errors?: { [key: string]: string }[] | string[];
};
