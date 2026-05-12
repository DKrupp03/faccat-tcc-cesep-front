import { TherapistsListProvider } from "./TherapistsListProvider";
import { TherapistFormProvider } from "./TherapistFormProvider";
import { useTherapistsList } from "../hooks/useTherapistsList";

type TherapistsProviderProps = {
  children: React.ReactNode;
};

export const TherapistsProvider = ({ children }: TherapistsProviderProps) => (
  <TherapistsListProvider>
    <TherapistsProviderInner>{children}</TherapistsProviderInner>
  </TherapistsListProvider>
);

const TherapistsProviderInner = ({ children }: { children: React.ReactNode }) => {
  const { therapistFormCallback } = useTherapistsList();

  return (
    <TherapistFormProvider afterSaveCallback={therapistFormCallback}>
      {children}
    </TherapistFormProvider>
  );
};
