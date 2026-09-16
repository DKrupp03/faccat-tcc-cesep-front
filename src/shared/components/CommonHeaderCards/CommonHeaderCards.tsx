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

export const CommonHeaderCards = ({
  cards,
  loading,
}: CommonHeaderCardsProps) => {
  return (
    <div
      className={styles.cards}
      style={{ gridTemplateColumns: `repeat(${cards.length}, minmax(0, 1fr))` }}
    >
      {cards.map((card, index) => loading ? (
        <Skeleton
          key={index}
          paragraph={{ rows: 1 }}
          className={styles.card}
          active
        />
      ) : (
        <Flex
          key={index}
          vertical gap={TOKENS.space[8]}
          className={styles.card}
        >
          <span className={styles.label}>
            {card.text}
          </span>
          <span className={styles.value} style={{ color: card.valueColor }}>
            {card.value}
          </span>
        </Flex>
      ))}
    </div>
  );
};
