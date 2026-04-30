import { useContext } from "react";

import { ProfilesListContext } from "../contexts/ProfilesListContext";

export const useProfilesList = () => {
  const context = useContext(ProfilesListContext);

  if (!context) {
    throw new Error("useProfilesList must be used within a ProfilesProvider");
  }

  return context;
};
