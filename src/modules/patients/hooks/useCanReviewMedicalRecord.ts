import { useMemo } from "react";

import { useAuth } from "@/modules/auth/hooks/useAuth";

// O visto é do supervisor do terapeuta que fez o atendimento — e a supervisão
// se lê do próprio perfil: supervisionar alguém é tê-lo como subordinado
// (mesma regra que o backend aplica ao gravar). Quem manda é o terapeuta do
// atendimento escolhido, não o do prontuário, senão o campo nasceria
// desabilitado ao criar, que é justamente quando a supervisão entra.
export const useCanReviewMedicalRecord = (therapistId?: number) => {
  const { profile } = useAuth();

  return useMemo(() => (
    !!therapistId && !!profile?.subordinates?.some(({ id }) => id === therapistId)
  ), [profile, therapistId]);
};
