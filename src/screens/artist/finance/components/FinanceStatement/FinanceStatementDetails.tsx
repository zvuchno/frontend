import { useGetFinanceReportDetails } from "@/entities/financeReports";

import { Definition, Loader } from "@/shared/ui";

import styles from "../FinanceStatement/FinanceStatement.module.scss";

export const FinanceStatementDetails = ({ id }: { id: number }) => {
  const { data, isLoading } = useGetFinanceReportDetails(id.toString());

  const statementDetails = data;

  enum REPORT_STATUS {
    pending = "Формируется",
    ready = "Готов",
    failed = "Ошибка",
  }

  if (isLoading)
    return (
      <Loader marginBlockStart={0} display='flex' alignItems='center' justifyContent='center' />
    );

  return (
    <div className={styles.financeStatementDetails}>
      {statementDetails && (
        <>
          <Definition label='Статус отчета' value={REPORT_STATUS[statementDetails.status]} />
          <Definition
            label='Количество заказов'
            value={`${statementDetails.orders_count ? statementDetails.orders_count : 0} шт.`}
          />
          <Definition
            label='Донаты'
            value={`${statementDetails.donation_amount ? statementDetails.donation_amount : 0} руб.`}
          />

          <Definition
            label='Предоставленные скидки'
            value={`${statementDetails.discount_amount ? statementDetails.discount_amount : 0} руб.`}
          />
          <Definition
            label='Стоимость доставки'
            value={`${statementDetails.delivery_amount ? statementDetails.delivery_amount : 0} руб.`}
          />
          <Definition
            label='Сумма комиссии'
            value={`${statementDetails.commission_amount ? statementDetails.commission_amount : 0} руб.`}
          />
        </>
      )}
      {!statementDetails && <span>Ошибка получения отчета. Попробуйте позже</span>}
    </div>
  );
};
