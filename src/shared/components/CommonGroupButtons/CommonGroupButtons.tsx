/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { Flex } from "antd";

import { CommonButton, type CommonButtonProps } from "../CommonButton/CommonButton";
import { CommonField } from "../CommonField/CommonField";

import styles from "./CommonGroupButtons.module.css";

type GroupContextValue = {
  value?: string | number;
  onChange?: (value: string | number) => void;
  tone: "neutral" | "accent";
};

const GroupContext = createContext<GroupContextValue>({ tone: "neutral" });

type GroupProps = {
  value?: string | number;
  onChange?: (value: string | number) => void;
  children: React.ReactNode;
  label?: string;
  // "neutral": trilho cinza, ativo branco; "accent": trilho branco, ativo cheio
  tone?: "neutral" | "accent";
  fit?: boolean;
  // "compact": trilho baixo para barras de cabeçalho (ex.: Calendário/Lista)
  size?: "default" | "compact";
};

type ButtonProps = Omit<CommonButtonProps, "outline" | "onClick"> & {
  value: string | number;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ value, children, ...buttonProps }) => {
  const { value: groupValue, onChange, tone } = useContext(GroupContext);
  const isActive = value === groupValue;
  const activeClass = tone === "accent" ? styles.buttonActiveAccent : styles.buttonActive;

  return (
    <CommonButton
      buttonVariant="noBorder"
      hoverEffect={!isActive}
      onClick={() => onChange?.(value)}
      className={isActive ? `${styles.button} ${activeClass}` : styles.button}
      {...buttonProps}
    >
      {children}
    </CommonButton>
  );
};

const CommonGroupButtonsBase: React.FC<GroupProps> = ({
  value,
  onChange,
  children,
  label,
  tone = "neutral",
  fit = false,
  size = "default",
}) => {
  const groupClass = [
    styles.group,
    tone === "accent" ? styles.groupAccent : "",
    fit ? styles.groupFit : "",
    size === "compact" ? styles.groupCompact : "",
  ].filter(Boolean).join(" ");

  return (
    <CommonField
      label={label}
      className={fit ? `${styles.container} ${styles.containerFit}` : styles.container}
    >
      <GroupContext.Provider value={{ value, onChange, tone }}>
        <Flex className={groupClass}>
          {children}
        </Flex>
      </GroupContext.Provider>
    </CommonField>
  );
};

export const CommonGroupButtons = Object.assign(CommonGroupButtonsBase, { Button });

export type CommonGroupButtonsProps = GroupProps;
export type CommonGroupButtonProps = ButtonProps;
