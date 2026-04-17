import { useMemo } from "react";
import { Avatar, type AvatarProps } from "antd";

import { type Profile } from "@/modules/auth/types/profile";

import styles from "./CommonAvatar.module.css";

type CommonAvatarProps = AvatarProps & {
  profile: Profile;
};

export const CommonAvatar = ({
  profile,
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
      className={styles.avatar}
      src={profile.photo_url}
      {...props}
    >
      {nameInitials}
    </Avatar>
  );
};
