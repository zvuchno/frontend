"use client";

import { useState } from "react";

import { CalendarPicker } from "../components/CalendarPicker/CalendarPicker";
import { FinanceStatementList } from "../components/FinanceStatementList/FinanceStatementList";
import { type TFinanceStatement } from "../model/finance.types";
import styles from "./ArtistFinance.module.scss";

export const ArtistFinance = () => {
  const state: TFinanceStatement[] = [
    {
      number: 1,
      firstDate: "01.06.2026",
      lastDate: "30.06.2026",
      createdAt: "05.07.2026",
      itemsSold: "15 шт.",
      totalSum: "150 000 руб.",
      url: "url",
    },
    {
      number: 2,
      firstDate: "01.05.2026",
      lastDate: "30.05.2026",
      createdAt: "10.07.2026",
      itemsSold: "20 шт.",
      totalSum: "250 000 руб.",
      url: "url",
    },
    {
      number: 3,
      firstDate: "01.03.2026",
      lastDate: "30.03.2026",
      createdAt: "18.07.2026",
      itemsSold: "35 шт.",
      totalSum: "430 000 руб.",
      url: "url",
    },
  ];

  const [statements, setStatements] = useState<TFinanceStatement[]>(state);

  return (
    <section className={styles.artistFinance}>
      <CalendarPicker />
      {statements.length > 0 ? (
        <FinanceStatementList statements={statements} />
      ) : (
        <div className={styles.artistFinanceEmpty}>За выбранный период отчеты отсутствуют</div>
      )}
    </section>
  );
};
