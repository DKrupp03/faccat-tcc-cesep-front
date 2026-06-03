import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App, ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { antdTheme } from "./shared/theme";

dayjs.locale("pt-br");
import AppRoot from "./App";
import "./i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={antdTheme} locale={ptBR}>
      <App>
        <AppRoot />
      </App>
    </ConfigProvider>
  </StrictMode>,
);
