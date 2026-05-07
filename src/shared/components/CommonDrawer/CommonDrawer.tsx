import { useMemo, useRef } from "react";
import { Drawer, Flex, Typography } from "antd";

import { CommonCloseButton } from "../CommonCloseButton/CommonCloseButton";
import { CommonTabs, type CommonTabsProps } from "../CommonTabs/CommonTabs";

import styles from "./CommonDrawer.module.css";

type CommonDrawerProps = Partial<CommonTabsProps> & {
  title: string;
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
  isOpen,
  close,
  header,
  footer,
  width = "90%",
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
      <Title level={5}>
        {title}
      </Title>
      <Flex align="center" gap={12}>
        <Flex gap={8}>
          {header}
        </Flex>
        <CommonCloseButton onClick={close} />
      </Flex>
    </Flex>
  ), [title, close, header]);

  const footerContent = useMemo(() => (
    <Flex
      justify="end" gap={12}
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
          {children}
        </Flex>
      </Flex>
    </Drawer>
  );
};
