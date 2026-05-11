import { useCallback, useState } from "react";
import { Collapse, Flex, Typography } from "antd";
import { IconChevronDown, IconChevronUp, IconPlus } from "@tabler/icons-react";

import { CommonButton } from "../CommonButton/CommonButton";

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
}: CommonCollapseProps) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(
    hideExpandButton ? true : initialOpen
  );

  const handleChangeCollapse = useCallback((key: string[]) => {
    if (hideExpandButton) return;
    setIsCollapseOpen(key.length > 0)
  }, [hideExpandButton]);

  const expandButton = useCallback(() => {
    if (hideExpandButton) return;

    return (
      <CommonButton
        onClick={() => setIsCollapseOpen((prev) => !prev)}
        icon={isCollapseOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        size="small"
        circular
        outline
      />
    )
  }, [hideExpandButton, isCollapseOpen]);

  return (
    <Collapse
      ghost
      className={icon ? styles.collapseWithIcon : styles.collapse}
      activeKey={isCollapseOpen ? "1" : undefined}
      onChange={handleChangeCollapse}
      expandIcon={expandButton}
      expandIconPlacement={expandIconPlacement}
      collapsible="icon"
      items={[{
        key: 1,
        label: (
          <Flex align="center" gap={12}>
            {icon && (
              <Flex
                justify="center" align="center"
                className={styles.iconContainer}
              >
                {icon}
              </Flex>
            )}
            <Title level={5}>
              {title}
            </Title>
          </Flex>
        ),
        extra: (
          <Flex gap={12} align="center">
            {extraPlacement === "start" && extra}

            {shouldShowAddButton && (
              <CommonButton
                onClick={onClickAdd}
                icon={<IconPlus size={16} />}
                size="small"
                buttonVariant="primary"
                circular
              />
            )}

            {extraPlacement === "end" && extra}
          </Flex>
        ),
        children: (
          <div className={styles.content}>
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
            paddingTop: 16,
          },
        },
      }]}
    />
  );
}