import { Avatar, type AvatarProps } from "antd";
import { IconUser } from "@tabler/icons-react";

import styles from "./CommonAvatar.module.css";

type CommonAvatarProps = AvatarProps & {
  photoUrl?: string;
};

export const CommonAvatar = ({
  photoUrl,
  ...props
}: CommonAvatarProps) => {
  const size = props.size || 32;

  return (
    <Avatar
      size={size}
      shape="circle"
      className={styles.avatar}
      icon={<IconUser size={Number(size) * 0.55} stroke={1.7} />}
      src={photoUrl}
      {...props}
    />
  );
};
