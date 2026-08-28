"use client";

import { type ChangeEvent, useEffect, useState } from "react";

import clsx from "clsx";

import { Text } from "@/shared/ui";

import s from "./SearchInput.module.scss";
import { type SearchInputProps } from "./SearchInput.type";
import { type ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useDebouncedPush } from "@/shared/hooks/useDebouncedPush";

const SEARCH_DELAY = 500;

function getFirstQ(sp: ReadonlyURLSearchParams) {
  const all = sp.getAll("search");
  return all[0] ?? "";
};

function buildHref(nextQuery: string) {
  const q = nextQuery.trim();
  return q ? `/catalog/all?search=${encodeURIComponent(q)}` : "/catalog/all";
};

const SearchInput = ({
  placeholder = "Найти товары",
  label,
  onClose,
  className,
  disabled = false,
}: SearchInputProps) => {
  const sp = useSearchParams();
  const debouncedPush = useDebouncedPush(SEARCH_DELAY);

  const queryFromUrl = getFirstQ(sp);
  const [value, setValue] = useState<string>(queryFromUrl);

  useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (disabled) return;

    debouncedPush(buildHref(newValue));
  };

  const handleClose = () => {
    setValue("");
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className={clsx(s["search-input"], className)}>
      {label && (
        <Text Tag='label' variant='normal' className={s["search-input__label"]}>
          {label}
        </Text>
      )}

      <div className={s["search-input__wrapper"]}>
        <input
          type='text'
          className={s["search-input__input"]}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          autoComplete='off'
        />
        <button
          type='button'
          className={s["search-input__button"]}
          onClick={handleClose}
          disabled={disabled || !value}
          aria-label='Закрыть поиск'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='12' cy='12' r='11' stroke='currentColor' strokeWidth='2' fill='none' />
            <path
              d='M15 9L9 15M9 9L15 15'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

SearchInput.displayName = "SearchInput";

export default SearchInput;
