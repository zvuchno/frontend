import { type RefObject } from "react";
import DatePicker from "react-datepicker";

import { ru } from "date-fns/locale";

import styles from "./CalendarPicker.module.scss";

type TDatePickerProps = {
  id: string;
  selectedDateType: "firstDate" | "lastDate";
  selectedDate: Date | null;
  otherDate?: Date;
  firstDatePickerRef: RefObject<DatePicker | null>;
  lastDatePickerRef: RefObject<DatePicker | null>;
  setErrorMessage: (message: string) => void;
  setMessage: (message: string) => void;
  setDate: (date: Date | null) => void;
};

export const DatePickerInput = ({
  id,
  selectedDateType,
  selectedDate,
  otherDate,
  firstDatePickerRef,
  lastDatePickerRef,
  setErrorMessage,
  setMessage,
  setDate,
}: TDatePickerProps) => {
  const datePickerRefs = {
    firstDate: firstDatePickerRef,
    lastDate: lastDatePickerRef,
  };

  const otherDateType = selectedDateType === "firstDate" ? "lastDate" : "firstDate";

  const getCompareRule = (type: "lastDate" | "firstDate") => {
    return (date: Date, otherDate: Date) => {
      return type === "firstDate" ? date > otherDate : date < otherDate;
    };
  };
  const compare = getCompareRule(selectedDateType);

  const choosePeriodMessage = {
    firstDate: "Выберите дату начала периода",
    lastDate: "Выберите дату окончания периода",
  };

  const errorMessage = {
    firstDate: "Дата начала периода не может быть позже даты окончания",
    lastDate: "Дата окончания периода не может быть раньше даты начала",
  };

  return (
    <DatePicker
      id={id}
      ref={selectedDateType === "firstDate" ? firstDatePickerRef : lastDatePickerRef}
      popperClassName={styles.calendarPickerPopperFirst}
      dateFormat='dd.MM.yyyy'
      locale={ru}
      selected={selectedDate}
      placeholderText='__.__.__'
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode='select'
      showPopperArrow={false}
      autoComplete='off'
      popperPlacement='bottom-start'
      popperModifiers={[
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top", "bottom", "right"],
          },
          fn(state) {
            return state;
          },
        },
      ]}
      onKeyDown={(e) => e.preventDefault()}
      onInputClick={() => {
        setErrorMessage("");

        setMessage(choosePeriodMessage[selectedDateType]);

        datePickerRefs[otherDateType].current?.setOpen(false);
      }}
      onClickOutside={() => {
        datePickerRefs[selectedDateType].current?.setOpen(false);

        setMessage("");
      }}
      onChange={(date: Date | null) => {
        datePickerRefs[otherDateType].current?.setOpen(false);

        if (date && !otherDate) {
          setMessage(choosePeriodMessage[otherDateType]);
          datePickerRefs[selectedDateType].current?.setOpen(false);
          datePickerRefs[otherDateType].current?.setOpen(true);
        }

        if (date && otherDate) {
          if (compare(date, otherDate)) {
            setDate(null);
            setMessage("");
            setErrorMessage(errorMessage[selectedDateType]);
            return;
          }
          setMessage("");
        }

        setDate(date);
      }}
    />
  );
};
