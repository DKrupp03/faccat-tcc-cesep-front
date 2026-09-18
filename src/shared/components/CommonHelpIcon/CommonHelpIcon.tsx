import { Tooltip } from "antd";
import { IconHelpCircle } from "@tabler/icons-react";

import { TOKENS } from "@/shared/theme";
import { sanitizeRichText } from "@/shared/utils/sanitize";

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
      title={<span dangerouslySetInnerHTML={{ __html: sanitizeRichText(text) }} />}
      zIndex={9999}
    >
      <IconHelpCircle
        size={size}
        color={color || TOKENS.color.textMuted}
        style={{ cursor: "help", ...style }}
      />
    </Tooltip>
  );
};