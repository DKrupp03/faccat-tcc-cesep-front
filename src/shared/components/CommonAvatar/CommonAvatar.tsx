import { Avatar, type AvatarProps } from "antd";
import { IconUser } from "@tabler/icons-react";

import styles from "./CommonAvatar.module.css";

type CommonAvatarProps = AvatarProps & {
  photoUrl?: string;
  name?: string;
  tone?: "accent" | "neutral";
};

const getInitials = (name?: string) => {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
};

export const CommonAvatar = ({
  photoUrl,
  name,
  tone = "accent",
  className,
  ...props
}: CommonAvatarProps) => {
  const size = Number(props.size || 32);
  const initials = getInitials(name);
  const sizeClass = size >= 56 ? styles.large : size >= 40 ? styles.medium : styles.small;

  return (
    <Avatar
      size={size}
      shape="circle"
      className={[styles.avatar, styles[tone], sizeClass, className].filter(Boolean).join(" ")}
      icon={initials ? undefined : <IconUser size={size * 0.55} stroke={1.7} />}
      src={photoUrl}
      {...props}
    >
      {initials || undefined}
    </Avatar>
  );
};
