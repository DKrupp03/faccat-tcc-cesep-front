import { Flex, Typography, Skeleton } from "antd";

import styles from "./CommonHeaderCards.module.css";

const { Title, Text } = Typography;

type CardType = {
  text: string;
  value: string | number;
  icon: React.ReactNode;
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
    <Flex
      gap={24} justify="center" align="center"
      className={styles.cards}
    >
      {cards.map((card, index) => loading ? (
        <Skeleton
          key={index}
          paragraph={{ rows: 3 }}
          className={styles.card}
          title={false}
          active
        />
      ) : (
        <Flex
          key={index}
          align="center" gap={16}
          className={styles.card}
        >
          <Flex
            justify="center" align="center"
            className={styles.iconContainer}
          >
            {card.icon}
          </Flex>
          <Flex vertical>
            <Title level={4}>
              {card.value}
            </Title>
            <Text>
              {card.text}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
