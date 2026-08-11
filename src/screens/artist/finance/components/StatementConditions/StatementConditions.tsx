import styles from "./StatementConditions.module.scss";

export const StatementConditions = () => (
  <div className={styles.statementConditions}>
    <p className={styles.statementConditionsTitle}>ВАЖНО:</p>
    <ul className={styles.statementConditionsList}>
      <li className={styles.statementConditionsItem}>
        * Отчет за текущий календарный месяц формируется автоматическм <span>1-го числа</span>
        следующего месяца
      </li>
      <li className={styles.statementConditionsItem}>
        * Если выбранный диапазон дат включает в себя более одного календарного месяца, будут
        отображены отчеты отдельно по каждому календарному месяцу заданного периода
      </li>
      <li className={styles.statementConditionsItem}>
        * При выборе неполного календарного месяца будет отображен отчет за полный месяц, в который
        входят выбранные даты
      </li>
    </ul>
  </div>
);
