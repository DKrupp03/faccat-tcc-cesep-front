import { type BreadcrumbProps } from "antd";

export type ErrorsType = { [key: string]: string }[] | string[];

export type CommonResponse = {
  success: boolean;
  error?: string;
  errors?: ErrorsType;
};

export type CommonHeaderType = {
  submodules?: BreadcrumbProps["items"];
  rightContent?: React.ReactNode;
};