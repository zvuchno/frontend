import { useEffect, useRef, useState } from "react";
import type DatePicker from "react-datepicker";

import { formatDateToApi } from "@/shared/utils/formatDate";

import styles from "./CalendarPicker.module.scss";
import { DatePickerInput } from "./DatePickerInput";

export const CalendarPicker = ({
  onSelectFirstDay,
  onSelectLastDay,
}: {
  onSelectFirstDay: (date: string) => void;
  onSelectLastDay: (date: string) => void;
}) => {
  const [firstDate, setFirstDate] = useState<Date | null>(null);
  const [lastDate, setLastDate] = useState<Date | null>(null);

  const firstDatePickerRef = useRef<DatePicker>(null);
  const lastDatePickerRef = useRef<DatePicker>(null);

  const apiDateFrom = formatDateToApi(firstDate);
  const apiDateTo = formatDateToApi(lastDate);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onSelectFirstDay(apiDateFrom !== null ? apiDateFrom : "");

    onSelectLastDay(apiDateTo !== null ? apiDateTo : "");
  }, [apiDateFrom, apiDateTo, onSelectFirstDay, onSelectLastDay]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const isInputOrPopper = target.closest("input") || target.closest(".react-datepicker");

    if (isInputOrPopper) {
      return;
    }

    setFirstDate(null);
    setLastDate(null);
    setMessage("Выберите дату начала периода");
    firstDatePickerRef.current?.setOpen(true);

    if (errorMessage) {
      setErrorMessage("");
    }

    if (!firstDate) {
      firstDatePickerRef.current?.setOpen(true);
      setMessage("Выберите дату начала периода");
    }
  };

  const maxDate = new Date();

  return (
    <div className={styles.calendarPicker}>
      <p className={styles.calendarPickerTitle}>Период</p>
      <div className={styles.calendarPickerWrapper}>
        <div className={styles.calendarPickerDates} onClick={handleContainerClick}>
          <DatePickerInput
            id={"finance-period-first-day"}
            selectedDateType={"firstDate"}
            selectedDate={firstDate}
            firstDatePickerRef={firstDatePickerRef}
            lastDatePickerRef={lastDatePickerRef}
            setErrorMessage={setErrorMessage}
            setMessage={setMessage}
            setDate={setFirstDate}
            otherDate={lastDate ?? undefined}
            maxDate={maxDate}
          />
          <DatePickerInput
            id={"finance-period-last-day"}
            selectedDateType={"lastDate"}
            selectedDate={lastDate}
            firstDatePickerRef={firstDatePickerRef}
            lastDatePickerRef={lastDatePickerRef}
            setErrorMessage={setErrorMessage}
            setMessage={setMessage}
            setDate={setLastDate}
            otherDate={firstDate ?? undefined}
            maxDate={maxDate}
          />
        </div>
        {message && <span className={styles.calendarPickerMessage}>{message}</span>}
        {errorMessage && <span className={styles.calendarPickerError}>{errorMessage}</span>}
      </div>
    </div>
  );
};
