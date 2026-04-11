import { useContext } from "react";
import { ModulesContext } from "../contexts/ModulesContext";

export const useModules = () => {
  const context = useContext(ModulesContext);

  if (!context) {
    throw new Error("useAuth must be used within an ModulesProvider");
  }

  return context;
}
