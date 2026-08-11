import styles from "./StatementConditions.module.scss";

export const StatementConditions = () => (
  <div className={styles.statementConditions}>
    <p className={styles.statementConditionsTitle}>ВАЖНО:</p>
    <ul className={styles.statementConditionsList}>
      <li className={styles.statementConditionsItem}>
        * Ежемесячные отчеты агента формируются автоматически <span>1-го числа</span> месяца,
        следующего за отчетным
      </li>
      <li className={styles.statementConditionsItem}>
        * Если выбранный диапазон дат включает в себя более одного календарного месяца, отчеты по
        каждому календарному месяцу заданного периода будут отображены отдельно
      </li>
      <li className={styles.statementConditionsItem}>
        * При выборе неполного календарного месяца будет отображен отчет за полный месяц, в который
        входят выбранные даты
      </li>
    </ul>
  </div>
);
