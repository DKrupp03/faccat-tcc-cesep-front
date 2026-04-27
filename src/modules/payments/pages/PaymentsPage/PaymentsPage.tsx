import { useEffect } from "react";

import { useModules } from "@/shared/hooks/useModules";

const PaymentsPage = () => {
  const { changeActiveModule } = useModules();

  useEffect(() => {
    changeActiveModule("payments");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>PAGAMENTOS</div>;
};

export default PaymentsPage;
