import { createContext } from "react";

export type ModalsContextType = {
  openConfirmationModal: (
    title: string,
    description: string,
    onConfirm: () => void,
    onCancel?: () => void,
  ) => void;
};

export const ModalsContext = createContext<ModalsContextType | null>(null);
