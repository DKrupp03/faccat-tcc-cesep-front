import { Avatar, type AvatarProps } from "antd";
import { IconUser } from "@tabler/icons-react";

import styles from "./CommonAvatar.module.css";

type CommonAvatarProps = AvatarProps & {
  photoUrl?: string;
  circular?: boolean;
};

export const CommonAvatar = ({
  photoUrl,
  circular = false,
  ...props
}: CommonAvatarProps) => {
  const size = props.size || 35;

  return (
    <Avatar
      size={size}
      shape={circular ? "circle" : "square"}
      className={styles.avatar}
      icon={<IconUser size={Number(size) * 0.6} stroke={1.5} />}
      src={photoUrl}
      {...props}
    />
  );
};
