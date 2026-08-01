"use client";

import { useState } from "react";

import { useGetFinanceReports } from "@/entities/financeReports";

import { CalendarPicker } from "../components/CalendarPicker/CalendarPicker";
import { FinanceStatementList } from "../components/FinanceStatementList/FinanceStatementList";
import styles from "./ArtistFinance.module.scss";

export const ArtistFinance = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const { data } = useGetFinanceReports(dateFrom, dateTo, "month");
  const reports = data?.results;

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <section className={styles.artistFinance}>
      <CalendarPicker onSelectFirstDay={setDateFrom} onSelectLastDay={setDateTo} />

      {reports && reports.length > 0 ? (
        <FinanceStatementList statements={reports} />
      ) : (
        dateFrom.length !== 0 &&
        dateTo.length !== 0 && (
          <div
            className={styles.artistFinanceEmpty}
          >{`За период с ${formatDate(dateFrom)} по ${formatDate(dateTo)} отчеты отсутствуют`}</div>
        )
      )}
    </section>
  );
};
