/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { Flex } from "antd";

import { CommonButton, type CommonButtonProps } from "../CommonButton/CommonButton";

import { CommonField } from "../CommonField/CommonField";

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
  label?: string;
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
      buttonVariant="noBorder"
      hoverEffect={!isActive}
      onClick={() => onChange?.(value)}
      className={isActive ? `${styles.button} ${styles.buttonActive}` : styles.button}
      {...buttonProps}
    >
      {children}
    </CommonButton>
  );
};

const CommonGroupButtonsBase: React.FC<GroupProps> = ({ value, onChange, children, label }) => {
  return (
    <CommonField label={label} className={styles.container}>
      <GroupContext.Provider value={{ value, onChange }}>
        <Flex className={styles.group}>
          {children}
        </Flex>
      </GroupContext.Provider>
    </CommonField>
  );
};

export const CommonGroupButtons = Object.assign(CommonGroupButtonsBase, { Button });

export type CommonGroupButtonsProps = GroupProps;
export type CommonGroupButtonProps = ButtonProps;
