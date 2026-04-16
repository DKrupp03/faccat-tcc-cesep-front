import { BrowserRouter } from "react-router-dom";

import { GlobalProviders } from "./shared/providers/GlobalProviders";
import AppRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalProviders>
        <AppRoutes />
      </GlobalProviders>
    </BrowserRouter>
  );
};

export default App;
