import { useContext } from "react";

import { ProfilesFormContext } from "../contexts/ProfilesFormContext";

export const useProfilesForm = () => {
  const context = useContext(ProfilesFormContext);

  if (!context) {
    throw new Error("useProfilesForm must be used within a ProfilesProvider");
  }

  return context;
};
