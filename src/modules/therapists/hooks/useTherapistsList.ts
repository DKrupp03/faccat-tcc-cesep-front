import { useContext } from "react";

import { TherapistsListContext } from "../contexts/TherapistsListContext";

export const useTherapistsList = () => {
  const context = useContext(TherapistsListContext);

  if (!context) {
    throw new Error("useTherapistsList must be used within a TherapistsListProvider");
  }

  return context;
};
