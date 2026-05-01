import React, { useMemo, useState } from "react";
import { Flex, Popover, type PopoverProps } from "antd";

import { CommonButton, type CommonButtonProps } from "../CommonButton/CommonButton";

type CommonDropdownProps = PopoverProps & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  options?: CommonButtonProps[];
  width?: number | string;
  minWidth?: number | string;
  padding?: number;
  children: React.ReactNode;
};

export const CommonDropdown = ({
  prefix,
  suffix,
  options,
  children,
  width,
  minWidth,
  padding = 6,
  ...props
}: CommonDropdownProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const content = useMemo(() => (
    <Flex vertical gap={8} style={{ width, minWidth }}>
      {prefix}

      {options && (
        <Flex vertical gap={4}>
          {options.map((option) => (
            <CommonButton
              {...option}
              onClick={(e) => {
                option.onClick?.(e);
                setVisible(false);
              }}
            >
              {option.children}
            </CommonButton>
          ))}
        </Flex>
      )}

      {suffix}
    </Flex>
  ), [
    prefix,
    options,
    suffix,
    width,
  ]);

  return (
    <Popover
      open={visible}
      content={content}
      onOpenChange={setVisible}
      arrow={false}
      trigger="click"
      styles={{ container: { padding } }}
      {...props}
    >
      <span>
        {children}
      </span>
    </Popover>
  );
};
