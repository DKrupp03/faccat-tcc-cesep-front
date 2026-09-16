import { useCallback, useState } from "react";
import { Collapse, Flex, Typography } from "antd";
import { IconChevronDown, IconChevronUp, IconPlus } from "@tabler/icons-react";

import { CommonButton } from "../CommonButton/CommonButton";
import { TOKENS } from "../../theme";

import styles from "./CommonCollapse.module.css";

type CommonCollapseProps = {
  title: string;
  icon?: React.ReactNode;
  shouldShowAddButton?: boolean;
  onClickAdd?: () => void;
  children?: React.ReactNode;
  initialOpen?: boolean;
  extra?: React.ReactNode;
  extraPlacement?: "start" | "end";
  expandIconPlacement?: "start" | "end";
  hideExpandButton?: boolean;
  // "block": bloco suave dentro de formulário; "card": seção em cartão (anamnese)
  variant?: "block" | "card" | "plain";
};

const { Title } = Typography;

export const CommonCollapse = ({
  title,
  icon,
  shouldShowAddButton,
  onClickAdd,
  children,
  initialOpen = true,
  extra,
  extraPlacement = "end",
  expandIconPlacement = "end",
  hideExpandButton = false,
  variant = "block",
}: CommonCollapseProps) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(
    hideExpandButton ? true : initialOpen
  );

  const handleChangeCollapse = useCallback((key: string[]) => {
    if (hideExpandButton) return;
    setIsCollapseOpen(key.length > 0);
  }, [hideExpandButton]);

  const expandButton = useCallback(() => {
    if (hideExpandButton) return;

    return (
      <CommonButton
        onClick={() => setIsCollapseOpen((prev) => !prev)}
        icon={isCollapseOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        className={styles.expandButton}
        outline={variant === "block"}
      />
    );
  }, [hideExpandButton, isCollapseOpen, variant]);

  const className = [
    styles.collapse,
    styles[variant],
    isCollapseOpen ? styles.open : "",
  ].filter(Boolean).join(" ");

  return (
    <Collapse
      ghost
      className={className}
      activeKey={isCollapseOpen ? "1" : undefined}
      onChange={handleChangeCollapse}
      expandIcon={expandButton}
      expandIconPlacement={expandIconPlacement}
      collapsible="icon"
      items={[{
        key: 1,
        label: (
          <Flex align="center" gap={TOKENS.space[12]}>
            {icon && (
              <Flex
                justify="center" align="center"
                className={styles.iconContainer}
              >
                {icon}
              </Flex>
            )}
            <Title level={5} className={styles.title}>
              {title}
            </Title>
          </Flex>
        ),
        extra: (
          <Flex gap={TOKENS.space[8]} align="center">
            {extraPlacement === "start" && extra}

            {shouldShowAddButton && (
              <CommonButton
                onClick={onClickAdd}
                icon={<IconPlus size={16} />}
                className={styles.addButton}
                buttonVariant="primary"
              />
            )}

            {extraPlacement === "end" && extra}
          </Flex>
        ),
        children: (
          <div>
            {children}
          </div>
        ),
        styles: {
          header: {
            padding: 0,
            alignItems: "center",
          },
          body: {
            padding: 0,
            paddingTop: variant === "card" ? TOKENS.space[24] : TOKENS.space[16],
          },
        },
      }]}
    />
  );
};
