import { Tooltip } from "antd";
import { IconHelpCircle } from "@tabler/icons-react";

import { COLORS } from "@/shared/theme";

interface CommonIconHelpParams {
  text: string;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const CommonIconHelp = ({
  text,
  color,
  size = 16,
  style,
}: CommonIconHelpParams) => {
  return (
    <Tooltip
      title={<span dangerouslySetInnerHTML={{ __html: text }} />}
      zIndex={9999}
    >
      <IconHelpCircle
        size={size}
        color={color || COLORS.blue}
        style={{ cursor: "help", ...style }}
      />
    </Tooltip>
  );
};