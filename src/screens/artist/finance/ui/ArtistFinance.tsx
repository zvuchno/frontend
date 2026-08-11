"use client";

import { useState } from "react";

import { useGetFinanceReports } from "@/entities/financeReports";

import { Loader, Paginator } from "@/shared/ui";
import { formatDate } from "@/shared/utils/formatDate";

import { CalendarPicker } from "../components/CalendarPicker/CalendarPicker";
import { FinanceStatementList } from "../components/FinanceStatementList/FinanceStatementList";
import { StatementConditions } from "../components/StatementConditions/StatementConditions";
import styles from "./ArtistFinance.module.scss";

export const ArtistFinance = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetFinanceReports(dateFrom, dateTo, "month");
  const limit = 5;

  const allresults = data?.pages.flatMap((page) => page.results) ?? [];

  const pageCount = Math.ceil(allresults.length / limit);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const reportsToShow = allresults?.slice(startIndex, endIndex);

  return (
    <section className={styles.artistFinance}>
      <CalendarPicker onSelectFirstDay={setDateFrom} onSelectLastDay={setDateTo} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {allresults && allresults.length > 0 ? (
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
      <StatementConditions />
    </section>
  );
};
