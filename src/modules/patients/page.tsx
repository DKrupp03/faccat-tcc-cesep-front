import { useEffect } from "react";

import { useModules } from "@/shared/hooks/useModules";

const PatientsPage = () => {
  const { changeActiveModule } = useModules();

  useEffect(() => {
    changeActiveModule("patients");
  }, [changeActiveModule]);

  return <div>PACIENTES</div>;
};

export default PatientsPage;
