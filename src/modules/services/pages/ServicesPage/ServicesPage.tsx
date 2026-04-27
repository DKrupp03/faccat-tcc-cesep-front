import { useEffect } from "react";

import { useModules } from "@/shared/hooks/useModules";

const ServicesPage = () => {
  const { changeActiveModule } = useModules();

  useEffect(() => {
    changeActiveModule("services");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>ATENDIMENTOS</div>;
};

export default ServicesPage;
