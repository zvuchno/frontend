import { useEffect, useState } from "react";

import styles from "../ui/ArtistFinance.module.scss";

const headingColumnNames = [
  "Номер отчета",
  "Дата начала",
  "Дата конца",
  "Дата формирования",
  "Продано",
  "Сумма",
];

const headingColumnNamesChanged = [
  "Номер",
  "Период отчета",
  "Дата формирования",
  "Продано",
  "Сумма",
];

export const StatementHeading = ({ mode }: { mode: "row" | "column" }) => {
  const names = mode === "row" ? headingColumnNames : headingColumnNamesChanged;
  return (
    <div className={styles.financeStatementHeading}>
      {names.map((name, index) => (
        <span key={index} className={styles.financeStatementHeadingColumn}>
          {name}
        </span>
      ))}
    </div>
  );
};
