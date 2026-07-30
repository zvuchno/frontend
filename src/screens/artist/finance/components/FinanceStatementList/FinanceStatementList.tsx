import { useEffect, useState } from "react";

import { type TFinanceStatement } from "../../model/finance.types";
import { FinanceStatement } from "../FinanceStatement/FinanceStatement";
import { StatementHeading } from "../StatementHeading/StatementHeading";
import styles from "./FinanceStatementList.module.scss";

export const FinanceStatementList = ({ statements }: { statements: TFinanceStatement[] }) => {
  const [tableMode, setTableMode] = useState<"row" | "column">("row");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1025) {
        setTableMode("row");
      } else {
        setTableMode("column");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.financeStatementContent}>
      <StatementHeading mode={tableMode} />
      <div className={styles.financeStatementList}>
        {statements.map((statement) => (
          <FinanceStatement key={statement.number} statement={statement} mode={tableMode} />
        ))}
      </div>
    </div>
  );
};
