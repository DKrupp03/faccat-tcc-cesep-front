import { useMemo } from "react";
import { Avatar, type AvatarProps } from "antd";

import styles from "./CommonAvatar.module.css";

type CommonAvatarProps = AvatarProps & {
  name: string;
  photoUrl?: string;
};

export const CommonAvatar = ({
  name,
  photoUrl,
  ...props
}: CommonAvatarProps) => {
  const nameInitials = useMemo(() => {
    const words = name.trim().split(/\s+/);

    return words
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }, [name]);

  return (
    <Avatar
      size={35}
      shape="square"
      className={styles.avatar}
      src={photoUrl}
      {...props}
    >
      {nameInitials}
    </Avatar>
  );
};
