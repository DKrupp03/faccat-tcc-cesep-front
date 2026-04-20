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
        <Flex
          key={index}
          align="center" gap={24}
          className={styles.card}
        >
          <Skeleton
            paragraph={false}
            className={styles.iconContainerSkeleton}
            active
          />
          <Skeleton
            title={false}
            paragraph={{ rows: 2 }}
            active
          />
        </Flex>
      ) : (
        <Flex
          key={index}
          align="center" gap={24}
          className={styles.card}
        >
          <Flex
            justify="center" align="center"
            className={styles.iconContainer}
          >
            {card.icon}
          </Flex>
          <Flex vertical>
            <Text>
              {card.text}
            </Text>
            <Title level={4}>
              {card.value}
            </Title>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
