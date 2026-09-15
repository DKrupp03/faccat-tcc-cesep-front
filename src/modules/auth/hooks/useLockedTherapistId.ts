import { useMemo } from "react";

import { useAuth } from "./useAuth";

// Terapeuta comum tem os painéis travados nele mesmo. Admin e supervisor (que
// enxerga também os subordinados) navegam sem a trava — o backend já limita
// o que cada um pode ver.
export const useLockedTherapistId = () => {
  const { profile } = useAuth();

  return useMemo(() => (
    profile?.role === "therapist" && !profile.admin && !profile.subordinates?.length
      ? profile.id
      : undefined
  ), [profile]);
};
