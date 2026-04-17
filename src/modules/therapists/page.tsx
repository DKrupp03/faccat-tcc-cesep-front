import { useEffect } from "react";

import { useModules } from "@/shared/hooks/useModules";

const TherapistsPage = () => {
  const { changeActiveModule } = useModules();

  useEffect(() => {
    changeActiveModule("therapists");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>TERAPEUTAS</div>;
};

export default TherapistsPage;
