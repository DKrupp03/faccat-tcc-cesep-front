import { createContext } from "react";

export type ConfirmationModalOptions = {
  danger?: boolean;
  confirmLabel?: string;
};

export type ModalsContextType = {
  openConfirmationModal: (
    title: string,
    description: string,
    onConfirm: () => void,
    onCancel?: () => void,
    options?: ConfirmationModalOptions,
  ) => void;
};

export const ModalsContext = createContext<ModalsContextType | null>(null);
