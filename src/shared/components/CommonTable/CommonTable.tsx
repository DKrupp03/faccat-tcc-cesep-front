import { useMemo } from "react";
import { Empty, Flex, Table, type TableProps, Typography, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { IconPlus } from "@tabler/icons-react";

import { CommonButton } from "../CommonButton/CommonButton";

import styles from "./CommonTable.module.css";

export type CommonTableProps<T extends object = object> = TableProps<T> & {
  titleHeader?: string;
  header?: React.ReactNode;
  loading?: boolean;
  pagination?: boolean;
  page?: number;
  total?: number;
  loadMore?: (newPage: number) => void;
  loadingMore?: boolean;
};

const { Title } = Typography;

export const CommonTable = <T extends object = object>({
  titleHeader,
  header,
  loading,
  pagination,
  page,
  total,
  loadMore,
  loadingMore,
  ...props
}: CommonTableProps<T>) => {
  const { t } = useTranslation();

  const shouldShowPagination = useMemo(() => (
    pagination && props.dataSource && props.dataSource.length < total!
  ), [pagination, total, props.dataSource]);

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

      {shouldShowPagination && (
        <Flex justify="center" className={styles.footer}>
          <CommonButton
            onClick={() => loadMore!(page! + 1)}
            icon={<IconPlus size={14} />}
            buttonVariant="primary"
            size="small"
            circular
            outline
            loading={loadingMore}
            className={styles.loadMoreButton}
          >
            {t("common.actions.loadMore")}
          </CommonButton>
        </Flex>
      )}
    </Flex>
  );
};
