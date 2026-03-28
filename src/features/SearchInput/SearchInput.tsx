import { useState, FormEvent, ChangeEvent } from "react";
import { Text } from "@/shared/ui/Typography/Typography";
import s from "./SearchInput.module.scss";
import { SearchInputProps } from "./SearchInput.type";
import clsx from "clsx";

const SearchInput = ({
  placeholder = "Найти товары",
  label,
  onClose,
  className,
  disabled = false,
}: SearchInputProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
  };

 const handleClose = (e: FormEvent) => {
     setValue("");
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className={clsx(s["search-input"], className)}>
      {label && (
        <Text Tag="label" variant="normal" className={s["search-input__label"]}>
          {label}
        </Text>
      )}

      <div className={s["search-input__wrapper"]}>
          <input
            type="text"
            className={s["search-input__input"]}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            autoComplete="off"
          />
        <button
          type="button"
          className={s["search-input__button"]}
          onClick={handleClose}
          disabled={disabled || !value}
          aria-label="Закрыть поиск"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M15 9L9 15M9 9L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

SearchInput.displayName = "SearchInput";

export default SearchInput;
