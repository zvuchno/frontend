import { useCallback, useMemo, type SetStateAction } from "react";
import { type ControllerFieldState } from "react-hook-form";

import clsx from "clsx";
import { isValid, parseISO } from "date-fns";

import { CalendarField } from "@/shared/ui/CalendarField/CalendarField";

import s from "./addPromocodeForm.module.scss";

export const PromocodeDateField = ({
  value,
  fieldState,
  children,
  label,
  forInput,
  className,
  setFormError,
  onChange,
}: {
  value?: string | null;
  fieldState: ControllerFieldState;
  children?: React.ReactNode;
  label: string;
  forInput: string;
  className?: string;
  setFormError: (value: SetStateAction<string | null>) => void;
  onChange: (value: string | null) => void;
}) => {
  const selectedDate = useMemo(() => {
    if (!value) return null;
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : null;
  }, [value]);

  const handleChange = useCallback(
    (date: Date | null) => {
      const nextValue =
        date && !isNaN(date.getTime())
          ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
              date.getDate()
            ).padStart(2, "0")}`
          : null;

      if (nextValue !== (value || null)) {
        onChange(nextValue);
        setFormError(null);
      }
    },
    [onChange, setFormError, value]
  );

  return (
    <div className={clsx(s.inputWrapper, className)}>
      <label className={s.label} htmlFor={forInput}>
        <span>{label}</span>
        {children}
      </label>

      <CalendarField
        fieldError={fieldState.error}
        value={selectedDate}
        index={0}
        onChange={handleChange}
        id={forInput}
        allowFuture
        className={clsx("input_pickup_date input_size_small", s.datePicker)}
        popperClassName={s.DatePopper}
        wrapperClassName={s.datePickerWrapper}
      />
    </div>
  );
};
