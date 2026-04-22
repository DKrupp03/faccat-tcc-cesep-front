import type React from "react";
import { Empty, Flex, Table, type TableProps, Typography, Skeleton } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./CommonTable.module.css";

type CommonTypeProps<T extends object = object> = TableProps<T> & {
  titleHeader?: string;
  header?: React.ReactNode;
  loading?: boolean;
};

const { Title } = Typography;

export const CommonTable = <T extends object = object>({
  titleHeader,
  header,
  loading,
  ...props
}: CommonTypeProps<T>) => {
  const { t } = useTranslation();

  return loading ? (
    <Skeleton
      className={styles.card}
      style={{ padding: "10px 20px" }}
      paragraph={{ rows: 8 }}
      active
    />
  ) : (
    <Flex
      vertical
      className={styles.card}
    >
      <Flex
        justify="space-between" align="center"
        className={styles.header}
      >
        <Title level={5}>
          {titleHeader}
        </Title>
        {header}
      </Flex>

      <Table
        className={styles.table}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={t("common.noData")}
            />
          ),
        }}
        dataSource={props.dataSource}
        columns={props.columns}
        pagination={false}
      />
    </Flex>
  );
};
