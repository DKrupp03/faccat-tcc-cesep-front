import React, { createContext, useContext } from "react";
import { Flex } from "antd";

import { CommonButton, type CommonButtonProps } from "../CommonButton/CommonButton";
import { COLORS } from "@/shared/theme";

import styles from "./CommonGroupButtons.module.css";

type GroupContextValue = {
  value?: string | number;
  onChange?: (value: string | number) => void;
};

const GroupContext = createContext<GroupContextValue>({});

type GroupProps = {
  value?: string | number;
  onChange?: (value: string | number) => void;
  children: React.ReactNode;
};

type ButtonProps = Omit<CommonButtonProps, "outline" | "onClick"> & {
  value: string | number;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ value, children, ...buttonProps }) => {
  const { value: groupValue, onChange } = useContext(GroupContext);
  const isActive = value === groupValue;

  return (
    <CommonButton
      outline
      hoverEffect={!isActive}
      onClick={() => onChange?.(value)}
      className={styles.button}
      style={isActive ? {
        border: `1px solid ${COLORS.grey50}`,
        color: COLORS.grey90,
        backgroundColor: COLORS.grey30,
      } : undefined}
      {...buttonProps}
    >
      {children}
    </CommonButton>
  );
};

const CommonGroupButtonsBase: React.FC<GroupProps> = ({ value, onChange, children }) => {
  return (
    <GroupContext.Provider value={{ value, onChange }}>
      <Flex className={styles.group}>
        {children}
      </Flex>
    </GroupContext.Provider>
  );
};

export const CommonGroupButtons = Object.assign(CommonGroupButtonsBase, { Button });

export type CommonGroupButtonsProps = GroupProps;
export type CommonGroupButtonProps = ButtonProps;
