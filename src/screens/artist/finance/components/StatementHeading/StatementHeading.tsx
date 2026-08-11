import styles from "./StatementHeading.module.scss";

const headingColumnNames = ["Дата начала", "Дата конца", "Сумма"];

const headingColumnNamesChanged = ["Период отчета", "Сумма"];

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
