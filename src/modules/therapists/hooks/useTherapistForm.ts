import { useContext } from "react";

import { TherapistFormContext } from "../contexts/TherapistFormContext";

export const useTherapistForm = () => {
  const context = useContext(TherapistFormContext);

  if (!context) {
    throw new Error("useTherapistForm must be used within a TherapistFormProvider");
  }

  return context;
};
