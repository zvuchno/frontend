import { useState } from "react";

import clsx from "clsx";
import Link from "next/link";

import { type TFinanceReportPreview } from "@/entities/financeReports";

import AarrowInCircle from "../../../../../../public/icons/arrow-right.svg";
import styles from "./FinanceStatement.module.scss";
import { FinanceStatementDetails } from "./FinanceStatementDetails";

export const FinanceStatement = ({
  statement,
  mode,
}: {
  statement: TFinanceReportPreview;
  mode: "row" | "column";
}) => {
  const [isStatementOpen, setIsStatementOpen] = useState(false);

  return (
    <div className={clsx(styles.financeStatement, isStatementOpen && styles.detailStatement)}>
      <div className={styles.financeStatementHeading}>
        <span className={styles.financeStatementItem}>{statement.id}</span>
        {mode === "row" && (
          <>
            <span className={styles.financeStatementItem}>{statement.period_start}</span>
            <span className={styles.financeStatementItem}>{statement.period_end}</span>
          </>
        )}
        {mode === "column" && (
          <>
            <span className={styles.financeStatementItem}>
              {`${statement.period_start} ${statement.period_end}`}
            </span>
          </>
        )}
        <span className={styles.financeStatementItem}>{statement.created_at}</span>
        <span className={styles.financeStatementItem}>{`${statement.items_count} шт.`}</span>
        <span className={styles.financeStatementItem}>{`${statement.sales_amount} руб.`}</span>
        <span className={styles.financeStatementItem}>
          <Link href={statement.file_url} className={styles.financeStatementLink}>
            скачать
          </Link>
        </span>
        <span className={styles.financeStatementItem}>
          <button
            className={styles.financeStatementButton}
            onClick={() => setIsStatementOpen((prev) => !prev)}
          >
            <AarrowInCircle
              className={clsx(styles.financeStatementButtonImage, isStatementOpen && styles.open)}
            />
          </button>
        </span>
      </div>

      {isStatementOpen && <FinanceStatementDetails id={statement.id} />}
    </div>
  );
};
