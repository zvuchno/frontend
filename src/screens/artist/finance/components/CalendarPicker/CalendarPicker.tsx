import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

import { ru } from "date-fns/locale";

import styles from "./CalendarPicker.module.scss";

export const CalendarPicker = () => {
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");

  const firstDatePickerRef = useRef<DatePicker>(null);
  const lastDatePickerRef = useRef<DatePicker>(null);

  return (
    <div className={styles.calendarPicker}>
      <p className={styles.calendarPickerTitle}>Период</p>
      <div
        className={styles.calendarPickerDates}
        onClick={
          !firstDate
            ? () => firstDatePickerRef.current?.setOpen(true)
            : () => lastDatePickerRef.current?.setOpen(true)
        }
      >
        <DatePicker
          id='finance-period-first-day'
          ref={firstDatePickerRef}
          popperClassName={styles.calendarPickerPopperFirst}
          dateFormat='dd.MM.yyyy'
          locale={ru}
          //selected={value instanceof Date ? value : null}
          //onChange={(date: Date | null) => onChange(date)}
          placeholderText='__. __. __'
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          showPopperArrow={false}
        />
        <DatePicker
          id='finance-period-last-day'
          ref={lastDatePickerRef}
          popperClassName={styles.calendarPickerPopperLast}
          dateFormat='dd.MM.yyyy'
          locale={ru}
          //selected={value instanceof Date ? value : null}
          //onChange={(date: Date | null) => onChange(date)}
          placeholderText='__. __. __'
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          showPopperArrow={false}
        />
      </div>
    </div>
  );
};
