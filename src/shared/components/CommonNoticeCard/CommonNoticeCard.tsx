import { Flex } from "antd";
import { IconInfoCircle, IconExclamationCircle } from "@tabler/icons-react";

import { TOKENS } from "../../theme";
import { sanitizeRichText } from "../../utils/sanitize";

import styles from "./CommonNoticeCard.module.css";

type CommonNoticeCardVariant = "info" | "warning";

type CommonNoticeCardProps = {
  title?: string;
  // Cada item vira um marcador da lista; aceitam as tags de ênfase do i18n.
  items?: string[];
  variant?: CommonNoticeCardVariant;
  className?: string;
  children?: React.ReactNode;
};

const ICONS = {
  info: IconInfoCircle,
  warning: IconExclamationCircle,
};

// Card de aviso: o mesmo formato dos demais cards do sistema (raio 2xl e
// sombra xs), em fundo de estado, para explicar uma regra do bloco que vem
// logo abaixo sem disputar espaço com os campos.
export const CommonNoticeCard = ({
  title,
  items = [],
  variant = "info",
  className,
  children,
}: CommonNoticeCardProps) => {
  const Icon = ICONS[variant];

  return (
    <Flex
      gap={TOKENS.space[12]}
      className={`${styles.card} ${styles[variant]} ${className ?? ""}`}
    >
      <Icon size={18} className={styles.icon} />
      <Flex vertical gap={TOKENS.space[6]} className={styles.content}>
        {title && <span className={styles.title}>{title}</span>}
        {items.length > 0 && (
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: sanitizeRichText(item) }}
              />
            ))}
          </ul>
        )}
        {children}
      </Flex>
    </Flex>
  );
};
