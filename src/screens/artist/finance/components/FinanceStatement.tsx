import { useState } from "react";

import clsx from "clsx";
import Link from "next/link";

import AarrowInCircle from "../../../../../public/icons/arrow-right.svg";
import { type TFinanceStatement } from "../model/finance.types";
import styles from "../ui/ArtistFinance.module.scss";

export const FinanceStatement = ({
  statement,
  mode,
}: {
  statement: TFinanceStatement;
  mode: "row" | "column";
}) => {
  const isOpen = false;
  const [isStatementOpen, setIsStatementOpen] = useState(isOpen);

  return (
    <div className={clsx(styles.financeStatement, isStatementOpen && styles.detailStatement)}>
      <span className={styles.financeStatementItem}>{statement.number}</span>
      {mode === "row" && (
        <>
          <span className={styles.financeStatementItem}>{statement.firstDate}</span>
          <span className={styles.financeStatementItem}>{statement.lastDate}</span>
        </>
      )}
      {mode === "column" && (
        <>
          <span className={styles.financeStatementItem}>
            {`${statement.firstDate} ${statement.lastDate}`}
          </span>
        </>
      )}
      <span className={styles.financeStatementItem}>{statement.createdAt}</span>
      <span className={styles.financeStatementItem}>{statement.itemsSold}</span>
      <span className={styles.financeStatementItem}>{statement.totalSum}</span>
      <span className={styles.financeStatementItem}>
        <Link href={statement.url} className={styles.financeStatementLink}>
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
  );
};
