import { useEffect, useState } from "react";

import { type TFinanceReportPreview } from "@/entities/financeReports";

import { FinanceStatement } from "../FinanceStatement/FinanceStatement";
import { StatementHeading } from "../StatementHeading/StatementHeading";
import styles from "./FinanceStatementList.module.scss";

export const FinanceStatementList = ({ statements }: { statements: TFinanceReportPreview[] }) => {
  const [tableMode, setTableMode] = useState<"row" | "column">("row");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 850 || (width < 769 && width > 480)) {
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
        {statements.map((statement, index) => (
          <FinanceStatement key={index} statement={statement} mode={tableMode} />
        ))}
      </div>
    </div>
  );
};
