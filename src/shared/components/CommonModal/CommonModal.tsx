import { useMemo } from "react";
import { Flex, Modal, Typography } from "antd";
import { IconX } from "@tabler/icons-react";

import { CommonButton } from "../CommonButton/CommonButton";
import { COLORS } from "@/shared/theme";

import styles from "./CommonModal.module.css";

type CommonModalProps = {
  title: string;
  isOpen: boolean;
  close: () => void;
  footer: React.ReactNode;
  children: React.ReactNode;
};

const { Title } = Typography;

export const CommonModal = ({
  title,
  isOpen,
  close,
  footer,
  children,
}: CommonModalProps) => {
  const titleContent = useMemo(() => (
    <Flex
      justify="space-between" align="center"
      className={styles.header}
    >
      <Title level={5}>
        {title}
      </Title>
      <CommonButton
        onClick={close}
        icon={<IconX size={18} color={COLORS.white} stroke={3} />}
        size="small"
        buttonVariant="danger"
        circular
      />
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
      centered
    >
      <Flex className={styles.body}>
        {children}
      </Flex>
    </Modal>
  );
};
