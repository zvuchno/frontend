import DatePicker from "react-datepicker";

import { ru } from "date-fns/locale";

import styles from "../ui/ArtistFinance.module.scss";

export const CalendarPicker = () => {
  return (
    <div className={styles.calendarPicker}>
      <p className={styles.calendarPickerTitle}>Период</p>
      <div className={styles.calendarPickerDates}>
        <DatePicker
          className={styles.calendarPickerCalendarInput}
          wrapperClassName={styles.datePickerWrapper}
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
        -
        <DatePicker
          className={styles.calendarPickerCalendarInput}
          wrapperClassName={styles.datePickerWrapper}
          dateFormat='dd.MM.yyyy'
          locale={ru}
          //selected={value instanceof Date ? value : null}
          //onChange={(date: Date | null) => onChange(date)}
          placeholderText='__.__.__'
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
