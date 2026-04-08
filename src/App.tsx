import { BrowserRouter } from "react-router-dom";

import { GlobalProviders } from "./shared/providers/GlobalProviders";
import AppRoutes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalProviders>
        <AppRoutes />
      </GlobalProviders>
    </BrowserRouter>
  );
}
