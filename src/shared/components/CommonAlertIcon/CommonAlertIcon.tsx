import { Tooltip } from "antd";
import { IconExclamationCircle } from "@tabler/icons-react";

import { TOKENS } from "@/shared/theme";
import { sanitizeRichText } from "@/shared/utils/sanitize";

interface CommonIconAlertParams {
  text: string;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const CommonIconAlert = ({
  text,
  color,
  size = 16,
  style,
}: CommonIconAlertParams) => {
  return (
    <Tooltip
      title={<span dangerouslySetInnerHTML={{ __html: sanitizeRichText(text) }} />}
      zIndex={9999}
    >
      <IconExclamationCircle
        size={size}
        color={color || TOKENS.color.warning}
        style={{ cursor: "help", ...style }}
      />
    </Tooltip>
  );
};
