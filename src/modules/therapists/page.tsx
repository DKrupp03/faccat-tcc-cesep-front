import { useEffect } from "react";

import { useModules } from "@/shared/hooks/useModules";

const TherapistsPage = () => {
  const { changeActiveModule } = useModules();

  useEffect(() => {
    changeActiveModule("therapists");
  }, []);

  return <div>TERAPEUTAS</div>;
}

export default TherapistsPage;
