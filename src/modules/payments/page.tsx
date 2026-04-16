import { useEffect } from "react";

import { useModules } from "@/shared/hooks/useModules";

const PaymentosPage = () => {
  const { changeActiveModule } = useModules();

  useEffect(() => {
    changeActiveModule("payments");
  }, [changeActiveModule]);

  return <div>PAGAMENTOS</div>;
};

export default PaymentosPage;
