import { useEffect } from "react";

import { useModules } from "@/shared/hooks/useModules";

const ServicesPage = () => {
  const { changeActiveModule } = useModules();

  useEffect(() => {
    changeActiveModule("services");
  }, []);

  return <div>ATENDIMENTOS</div>;
}

export default ServicesPage;
