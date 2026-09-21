import { useEffect, useState } from "react";

import ServicesSelectService from "@/shared/services/ServicesSelectService";
import type { ServiceProfile } from "@/modules/services/types/service";

type FetchedTherapist = {
  serviceId: number;
  therapist?: ServiceProfile;
};

// Terapeuta do atendimento escolhido no formulário. O prontuário traz o
// atendimento, mas só com os ids; o nome vem do próprio atendimento.
export const useServiceTherapist = (serviceId?: number) => {
  const [fetched, setFetched] = useState<FetchedTherapist>();

  useEffect(() => {
    if (!serviceId) return;

    let active = true;

    ServicesSelectService.getService(serviceId).then((response) => {
      if (!active || !response.success) return;
      setFetched({ serviceId, therapist: response.service.therapist });
    });

    return () => {
      active = false;
    };
  }, [serviceId]);

  // A resposta guarda o atendimento que a originou: trocar de atendimento
  // zera o terapeuta até o novo chegar, em vez de exibir o anterior.
  return fetched?.serviceId === serviceId ? fetched?.therapist : undefined;
};
