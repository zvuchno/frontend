import { type TFinanceReportPreview, useDownloadReport } from "@/entities/financeReports";

import { formatDate } from "@/shared/utils/formatDate";

import styles from "./FinanceStatement.module.scss";

export const FinanceStatement = ({
  statement,
  mode,
}: {
  statement: TFinanceReportPreview;
  mode: "row" | "column";
}) => {
  const { mutate } = useDownloadReport();

  return (
    <>
      <div className={styles.financeStatement}>
        {/*<span className={styles.financeStatementItem}>{statement.id}</span>*/}
        {mode === "row" && (
          <>
            <span className={styles.financeStatementItem}>
              {formatDate(statement.period_start)}
            </span>
            <span className={styles.financeStatementItem}>{formatDate(statement.period_end)}</span>
          </>
        )}
        {mode === "column" && (
          <>
            <span className={styles.financeStatementItem}>
              {`${formatDate(statement.period_start)}- ${formatDate(statement.period_end)}`}
            </span>
          </>
        )}
        {/*<span className={styles.financeStatementItem}>{statement.created_at}</span>*/}
        {/*<span className={styles.financeStatementItem}>{`${statement.items_count} шт.`}</span>*/}
        <span className={styles.financeStatementItem}>{`${statement.sales_amount} руб.`}</span>
        <span className={styles.financeStatementItem}>
          <button
            className={styles.financeStatementDownload}
            onClick={() => mutate(statement.download_url)}
          >
            скачать
          </button>
        </span>
        {/*<span className={styles.financeStatementItem}>
          <button
            className={styles.financeStatementButton}
            onClick={() => setIsStatementOpen((prev) => !prev)}
          >
            <AarrowInCircle
              className={clsx(styles.financeStatementButtonImage, isStatementOpen && styles.open)}
            />
          </button>
        </span>*/}
      </div>

      {/*isStatementOpen && <FinanceStatementDetails id={statement.id} />*/}
    </>
  );
};
