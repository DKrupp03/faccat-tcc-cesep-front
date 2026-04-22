import { Flex, Typography, Skeleton, Progress } from "antd";

import { COLORS } from "@/shared/theme";

import styles from "./CommonHeaderCards.module.css";

const { Title, Text } = Typography;

type CardType = {
  title: string;
  text: string;
  value: string | number;
  progress: number;
};

type CommonHeaderCardsProps = {
  cards: CardType[];
  loading?: boolean;
};

export const CommonHeaderCards = ({
  cards,
  loading,
}: CommonHeaderCardsProps) => {
  const getProgressColor = (percent?: number): string => {
    if (!percent || percent < 30) return COLORS.pink;
    if (percent < 60) return COLORS.gren;
    return COLORS.blue;
  };

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
          justify="center" gap={10} vertical
          className={styles.card}
        >
          <Flex
            justify="space-between" align="center"
            className={styles.cardInfo}
          >
            <Flex vertical>
              <Title level={5}>
                {card.title}
              </Title>
              <Text>
                {card.text}
              </Text>
            </Flex>
            <Title level={4}>
              {card.value}
            </Title>
          </Flex>

          <Progress
            percent={card.progress || 100}
            showInfo={false}
            size={["100%", 5]}
            strokeColor={getProgressColor(card.progress)}
          />
        </Flex>
      ))}
    </Flex>
  );
};
