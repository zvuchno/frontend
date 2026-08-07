import DatePicker from "react-datepicker";
import { type FieldError } from "react-hook-form";

import clsx from "clsx";
import { ru } from "date-fns/locale";

import styles from "../../artistFormPersonal.module.scss";
import { type TArtistFormPersonalField } from "../../utils/types";

export const CalendarField = ({
  field,
  fieldError,
  value,
  onChange,
  onBlur,
}: {
  field: TArtistFormPersonalField;
  fieldError?: FieldError;
  value: Date | null;
  onChange: (date: Date | null) => void;
  onBlur: () => void;
}) => (
  <DatePicker
    id={`${field.row}.${field.column}`}
    className={clsx("input-calendar input_size_small", {
      ["error"]: !!fieldError,
    })}
    wrapperClassName={styles.datePickerWrapper}
    calendarClassName={styles.calendarPopper}
    dateFormat='dd.MM.yyyy'
    locale={ru}
    selected={value}
    onBlur={onBlur}
    onChange={(date: Date | null) => onChange(date)}
    placeholderText='дд.мм.гггг'
    peekNextMonth
    showMonthDropdown
    showYearDropdown
    dropdownMode='select'
    showIcon
    maxDate={new Date()}
    onKeyDown={(e) => {
      e.preventDefault();
    }}
  />
);
