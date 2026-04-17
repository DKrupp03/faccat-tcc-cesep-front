import { Flex, Typography } from "antd";

import styles from "./CommonHeaderCards.module.css";

const { Title, Text } = Typography;

type CardType = {
  text: string;
  value: string | number;
  icon: React.ReactNode;
};

type CommonHeaderCardsProps = {
  cards: CardType[];
};

export const CommonHeaderCards = ({
  cards,
}: CommonHeaderCardsProps) => {
  return (
    <Flex
      gap={24} justify="center" align="center"
      className={styles.cards}
    >
      {cards.map((card) => (
        <Flex
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
