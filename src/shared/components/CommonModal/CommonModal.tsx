import { useMemo } from "react";
import { Flex, Modal, Typography } from "antd";

import { CommonCloseButton } from "../CommonCloseButton/CommonCloseButton";

import styles from "./CommonModal.module.css";

type CommonModalProps = {
  title: string;
  isOpen: boolean;
  close: () => void;
  footer: React.ReactNode;
  children: React.ReactNode;
  zIndex?: number;
};

const { Title } = Typography;

export const CommonModal = ({
  title,
  isOpen,
  close,
  footer,
  children,
  zIndex,
}: CommonModalProps) => {
  const titleContent = useMemo(() => (
    <Flex
      justify="space-between" align="center"
      className={styles.header}
    >
      <Title level={5}>
        {title}
      </Title>
      <CommonCloseButton onClick={close} />
    </Flex>
  ), [title, close]);

  const footerContent = useMemo(() => (
    <Flex
      justify="end" gap={12}
      className={styles.footer}
    >
      {footer}
    </Flex>
  ), [footer]);

  return (
    <Modal
      title={titleContent}
      open={isOpen}
      onCancel={close}
      footer={footerContent}
      closeIcon={false}
      mask={{ blur: true }}
      className={styles.modal}
      zIndex={zIndex}
      centered
    >
      <Flex className={styles.body}>
        {children}
      </Flex>
    </Modal>
  );
};
