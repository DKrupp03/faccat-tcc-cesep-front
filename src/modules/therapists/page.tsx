import { useEffect } from "react";
import { Flex } from "antd";
import { IconStethoscope, IconFilter } from "@tabler/icons-react";

import { useModules } from "@/shared/hooks/useModules";
import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";
import { COLORS } from "@/shared/theme";

const TherapistsPage = () => {
  const { changeActiveModule } = useModules();

  useEffect(() => {
    changeActiveModule("therapists");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex vertical gap={24} style={{ width: "100%" }}>
      <CommonHeaderCards
        cards={[
          {
            text: "Total de terapeutas",
            value: 65,
            icon: (
              <IconStethoscope
                size={30}
                color={COLORS.primary.grey}
              />
            )
          },
          {
            text: "Terapeutas filtrados",
            value: 20,
            icon: (
              <IconFilter
                size={30}
                color={COLORS.primary.grey}
              />
            )
          }
        ]}
      />
    </Flex>
  );
};

export default TherapistsPage;
