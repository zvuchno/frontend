import clsx from "clsx";

import { formatSum } from "@/shared/utils/formatSum";

import styles from "../OrderSummary.module.scss";

type TSummaryDetails = {
  subtotal: string;
  delivery?: string;
  total: string;
};

export const SummaryDetails = ({ delivery, subtotal, total }: TSummaryDetails) => (
  <div className={styles.summaryDetails}>
    <div className={clsx(styles.summarySubtotalSum, styles.mainText)}>
      <span>Товары</span>
      <span>{formatSum(subtotal) ?? 0} ₽</span>
    </div>
    <div className={clsx(styles.summaryDeliverySum, styles.mainText)}>
      <span>Доставка</span>
      <span>{formatSum(String(delivery)) + " ₽"}</span>
    </div>
    <div className={styles.summaryTotal}>
      <span>Итого:</span>
      <span>{formatSum(total ? total : 0)} ₽</span>
    </div>
  </div>
);
