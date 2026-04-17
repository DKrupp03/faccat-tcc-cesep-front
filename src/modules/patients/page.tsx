import { useEffect } from "react";

import { useModules } from "@/shared/hooks/useModules";

const PatientsPage = () => {
  const { changeActiveModule } = useModules();

  useEffect(() => {
    changeActiveModule("patients");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>PACIENTES</div>;
};

export default PatientsPage;
