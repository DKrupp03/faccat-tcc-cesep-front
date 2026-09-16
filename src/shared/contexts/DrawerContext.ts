import { createContext } from "react";

// Conteúdo renderizado dentro de uma CommonDrawer (o cabeçalho da gaveta já
// traz título e ações, então tabelas internas omitem o próprio cabeçalho).
export const DrawerContext = createContext(false);
