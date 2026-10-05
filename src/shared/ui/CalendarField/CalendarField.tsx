import DatePicker from "react-datepicker";
import { type FieldError } from "react-hook-form";

import clsx from "clsx";
import { ru } from "date-fns/locale";

import { handleDateFormatter } from "../../utils/handleDateFormatter";
import styles from "./CalendarField.module.scss";

type CalendarFieldProps = {
  field?: unknown;
  fieldError?: FieldError;
  value: Date | null;
  index: number;
  id?: string;
  allowFuture?: boolean;
  formatRawInput?: boolean;
  className?: string;
  wrapperClassName?: string;
  popperClassName?: string;
  onChange?: (date: Date | null) => void;
  onBlur?: () => void;
};

export const CalendarField = ({
  field,
  fieldError,
  value,
  index,
  id,
  allowFuture = false,
  formatRawInput = true,
  className,
  wrapperClassName,
  popperClassName,
  onChange,
  onBlur,
}: CalendarFieldProps) => {
  return (
    <DatePicker
      id={
        typeof field === "object" && field !== null && "row" in field && "column" in field
          ? `${String(field.row)}.${String(field.column)}`
          : id !== undefined
            ? id
            : `date-input-${index}`
      }
      className={clsx("input-calendar input_size_small", {
        ["error"]: !!fieldError,
        className,
      })}
      wrapperClassName={clsx(styles.datePickerWrapper, wrapperClassName)}
      calendarClassName={clsx(styles.calendarPopper)}
      popperClassName={popperClassName}
      dateFormat='dd.MM.yyyy'
      locale={ru}
      selected={value}
      onBlur={onBlur}
      onChange={onChange}
      placeholderText='дд.мм.гггг'
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode='select'
      showIcon
      maxDate={allowFuture ? undefined : new Date()}
      isClearable
      autoComplete='nope'
      onChangeRaw={
        formatRawInput
          ? (e) => {
              const input = e?.target;
              if (input instanceof HTMLInputElement) {
                input.value = handleDateFormatter(input.value);
              }
            }
          : undefined
      }
      showPopperArrow={false}
    />
  );
};
