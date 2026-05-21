import { useContext } from "react";

import { ServicesListContext } from "../contexts/ServicesListContext";

export const useServicesList = () => {
  const context = useContext(ServicesListContext);

  if (!context) {
    throw new Error("useServicesList must be used within a ServicesListProvider");
  }

  return context;
};
