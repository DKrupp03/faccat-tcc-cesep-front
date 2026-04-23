import React, { useMemo, useCallback, useState } from "react";
import { Flex, Popover, type PopoverProps } from "antd";

import { CommonButton, type CommonButtonProps } from "../CommonButton/CommonButton";

type CommonDropdownProps = PopoverProps & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  options?: CommonButtonProps[];
  width?: number | string;
  padding?: number;
  children: React.ReactNode;
};

export const CommonDropdown = ({
  prefix,
  suffix,
  options,
  children,
  width = 200,
  padding = 6,
  ...props
}: CommonDropdownProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisibleChange = useCallback((newVisible: boolean) => {
    setVisible(newVisible);

    //if (newVisible) {
    //  document.body.style.overflow = "hidden";
    //} else {
    //  document.body.style.overflow = "";
    //}
  }, []);

  const content = useMemo(() => (
    <Flex vertical gap={8} style={{ width }}>
      {prefix}

      {options && (
        <Flex vertical gap={4}>
          {options.map((option) => (
            <CommonButton {...option}>
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
      onOpenChange={handleVisibleChange}
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
