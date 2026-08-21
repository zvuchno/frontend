"use client";

import { useState } from "react";

import { useGetFinanceReports } from "@/entities/financeReports";

import { Loader, Paginator } from "@/shared/ui";
import { formatDate } from "@/shared/utils/formatDate";

import { CalendarPicker } from "../components/CalendarPicker/CalendarPicker";
import { FinanceStatementList } from "../components/FinanceStatementList/FinanceStatementList";
//import { StatementConditions } from "../components/StatementConditions/StatementConditions";
import styles from "./ArtistFinance.module.scss";

export const ArtistFinance = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetFinanceReports(dateFrom, dateTo, "month", currentPage);
  const limit = 5;

  const allresults = data?.count ?? 0;

  const pageCount = Math.ceil(allresults / limit);

  const reportsToShow = data?.results ?? [];

  return (
    <section className={styles.artistFinance}>
      <CalendarPicker onSelectFirstDay={setDateFrom} onSelectLastDay={setDateTo} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {reportsToShow.length > 0 ? (
            <>
              {pageCount > 1 && (
                <Paginator
                  count={pageCount}
                  currentPage={currentPage}
                  className={styles.artistFinancePaginator}
                  onHandleCurrent={setCurrentPage}
                />
              )}
              <FinanceStatementList statements={reportsToShow} />
            </>
          ) : (
            dateFrom.length !== 0 &&
            dateTo.length !== 0 && (
              <div
                className={styles.artistFinanceEmpty}
              >{`За период с ${formatDate(dateFrom)} по ${formatDate(dateTo)} отчеты отсутствуют`}</div>
            )
          )}
        </>
      )}
      {/*<StatementConditions />*/}
    </section>
  );
};
