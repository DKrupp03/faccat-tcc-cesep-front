import React, { useMemo } from "react";
import { Dropdown, Typography, type DropdownProps, type MenuProps } from "antd";

import styles from "./CommonDropdown.module.css";

const { Text } = Typography;

type DropdownSize = "small" | "medium" | "large";

type CommonDropdownProps = DropdownProps & {
  items: MenuProps["items"],
  children: React.ReactNode;
  size?: DropdownSize;
};

export const CommonDropdown = ({
  items,
  children,
  size = "small",
  ...props
}: CommonDropdownProps) => {
  const styledItems = useMemo(() => (
    items?.map((item) => {
      const base = item as { label?: React.ReactNode; danger?: boolean; };

      return {
        ...item!,
        label: (
          <Text className={`${styles.text} ${styles[`text--${size}`]}`}>
            {base.label}
          </Text>
        ),
      };
    })
  ), [items, size]);

  return (
    <Dropdown
      menu={{ items: styledItems }}
      trigger={["click"]}
      {...props}
    >
      {children}
    </Dropdown>
  );
}
