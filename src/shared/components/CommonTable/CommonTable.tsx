import { useContext, useMemo } from "react";
import { Empty, Flex, Table, type TableProps, Typography, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { IconPlus } from "@tabler/icons-react";

import { CommonButton } from "../CommonButton/CommonButton";
import { TOKENS } from "../../theme";
import { DrawerContext } from "../../contexts/DrawerContext";

import styles from "./CommonTable.module.css";

export type CommonTableProps<T extends object = object> = TableProps<T> & {
  titleHeader?: string;
  header?: React.ReactNode;
  // texto de apoio à direita do título (ex.: ordenação atual)
  headerNote?: string;
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
  headerNote,
  loading,
  pagination,
  page,
  total,
  loadMore,
  loadingMore,
  ...props
}: CommonTableProps<T>) => {
  const { t } = useTranslation();
  const inDrawer = useContext(DrawerContext);

  const shouldShowPagination = useMemo(() => (
    pagination && props.dataSource && props.dataSource.length < total!
  ), [pagination, total, props.dataSource]);

  return loading ? (
    <Skeleton
      className={styles.card}
      style={{ padding: TOKENS.space[24] }}
      paragraph={{ rows: 8 }}
      active
    />
  ) : (
    <Flex
      vertical
      className={styles.card}
    >
      {!inDrawer && (titleHeader || header || headerNote) && (
        <Flex
          justify="space-between" align="center"
          className={styles.header}
        >
          <Title level={5} className={styles.title}>
            {titleHeader}
          </Title>
          {headerNote && (
            <span className={styles.headerNote}>{headerNote}</span>
          )}
          {header}
        </Flex>
      )}

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
        rowKey={props.rowKey}
        dataSource={props.dataSource}
        columns={props.columns}
        pagination={false}
      />

      {shouldShowPagination && (
        <Flex justify="center" className={styles.footer}>
          <CommonButton
            onClick={() => loadMore!(page! + 1)}
            icon={<IconPlus size={16} />}
            buttonVariant="primary"
            outline
            loading={loadingMore}
          >
            {t("common.actions.loadMore")}
          </CommonButton>
        </Flex>
      )}
    </Flex>
  );
};
