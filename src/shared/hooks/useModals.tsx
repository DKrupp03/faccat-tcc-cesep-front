import { useContext } from "react";

import { ModalsContext } from "../contexts/ModalsContext";

export const useModals = () => {
  const context = useContext(ModalsContext);

  if (!context) {
    throw new Error("useModals must be used within ModalsProvider");
  }

  return context;
};
