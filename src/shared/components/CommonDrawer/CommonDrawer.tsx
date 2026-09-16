import { useMemo, useRef } from "react";
import { Drawer, Flex, Typography } from "antd";

import { CommonCloseButton } from "../CommonCloseButton/CommonCloseButton";
import { CommonTabs, type CommonTabsProps } from "../CommonTabs/CommonTabs";
import { DrawerContext } from "../../contexts/DrawerContext";

import { TOKENS } from "../../theme";

import styles from "./CommonDrawer.module.css";

type CommonDrawerProps = Partial<CommonTabsProps> & {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  close: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  showTabs?: boolean;
  children: React.ReactNode;
};

const { Title } = Typography;

export const CommonDrawer = ({
  title,
  subtitle,
  isOpen,
  close,
  header,
  footer,
  width = "85%",
  showTabs = false,
  children,
  ...props
}: CommonDrawerProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleAfterOpenChange = (open: boolean) => {
    if (!open) contentRef.current?.scrollTo({ top: 0 });
  };

  const titleContent = useMemo(() => (
    <Flex
      justify="space-between" align="center"
      className={styles.header}
    >
      <Flex vertical gap={TOKENS.space[2]}>
        <Title level={5} className={styles.title}>
          {title}
        </Title>
        {subtitle && (
          <span className={styles.subtitle}>{subtitle}</span>
        )}
      </Flex>
      <Flex align="center" gap={TOKENS.space[12]}>
        {header && (
          <Flex align="center" gap={TOKENS.space[8]} className={styles.toolbar}>
            {header}
          </Flex>
        )}
        <CommonCloseButton onClick={close} outline />
      </Flex>
    </Flex>
  ), [title, subtitle, close, header]);

  const footerContent = useMemo(() => (
    <Flex
      justify="end" align="center" gap={TOKENS.space[12]}
      className={styles.footer}
    >
      {footer}
    </Flex>
  ), [footer]);

  return (
    <Drawer
      title={titleContent}
      onClose={close}
      open={isOpen}
      afterOpenChange={handleAfterOpenChange}
      footer={footerContent}
      className={styles.drawer}
      styles={{ wrapper: { width } }}
      mask={{ blur: true }}
      closeIcon={false}
      destroyOnHidden
    >
      <Flex className={styles.body}>
        {showTabs && (
          <CommonTabs
            tabs={props.tabs!}
            activeTab={props.activeTab!}
            onChangeTab={props.onChangeTab!}
            containerClass={styles.tabsContainer}
          />
        )}
        <Flex ref={contentRef} className={styles.content}>
          <DrawerContext.Provider value>
            {children}
          </DrawerContext.Provider>
        </Flex>
      </Flex>
    </Drawer>
  );
};
