import { Flex, Skeleton } from "antd";

import { TOKENS } from "../../theme";

import styles from "./CommonHeaderCards.module.css";

type CardType = {
  text: string;
  value: string | number;
  valueColor?: string;
};

type CommonHeaderCardsProps = {
  cards: CardType[];
  loading?: boolean;
};

// Mantém a altura da linha de texto (via espaço não quebrável) e sobrepõe o skeleton,
// para que o card tenha o mesmo tamanho carregando e carregado.
const SkeletonLine = ({ width }: { width: number }) => (
  <span className={styles.skeletonLine}>
    {"\u00A0"}
    <Skeleton.Input
      active
      size="small"
      styles={{
        root: { position: "absolute", inset: 0, display: "flex", alignItems: "center" },
        content: { width, minWidth: 0, height: "1em" },
      }}
    />
  </span>
);

export const CommonHeaderCards = ({
  cards,
  loading,
}: CommonHeaderCardsProps) => {
  return (
    <div
      className={styles.cards}
      style={{ gridTemplateColumns: `repeat(${cards.length}, minmax(0, 1fr))` }}
    >
      {cards.map((card, index) => (
        <Flex
          key={index}
          vertical gap={TOKENS.space[8]}
          className={styles.card}
        >
          <span className={styles.label}>
            {loading ? (
              <SkeletonLine width={160} />
            ) : card.text}
          </span>
          <span
            className={styles.value}
            style={loading ? undefined : { color: card.valueColor }}
          >
            {loading ? (
              <SkeletonLine width={96} />
            ) : card.value}
          </span>
        </Flex>
      ))}
    </div>
  );
};
