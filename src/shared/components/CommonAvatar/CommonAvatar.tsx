import { useMemo } from "react";
import { Avatar, type AvatarProps } from "antd";

import { type Profile } from "@/modules/auth/types/profile";
import { COLORS } from "@/shared/theme";

const AVATAR_STYLE = {
  backgroundColor: COLORS.primary.outline,
  color: COLORS.primary.grey,
};

type CommonAvatarProps = AvatarProps & {
  profile: Profile;
  style?: React.CSSProperties;
};

export const CommonAvatar = ({
  profile,
  style,
  ...props
}: CommonAvatarProps) => {
  const nameInitials = useMemo(() => {
    const words = profile.name.trim().split(/\s+/);

    return words
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }, [profile.name]);

  return (
    <Avatar
      size={35}
      shape="square"
      style={{ ...AVATAR_STYLE, ...style }}
      src={profile.photo_url ?? undefined}
      {...props}
    >
      {nameInitials}
    </Avatar>
  );
};
