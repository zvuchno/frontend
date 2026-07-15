import { useEffect, useRef, useState } from "react";

import { getDadataSuggestions } from "@/shared/api";
import { type TDadataBound, type TDadataResponse } from "@/shared/types/daData.types";
import { CustomInput } from "@/shared/ui";
import type { InputProps } from "@/shared/ui/CustomInput/CustomInput.types";
import { LocationSuggestionsList } from "@/shared/ui/LocationSuggestionsList";
import { handleKeyDown } from "@/shared/utils/handleKeydown";

import styles from "./SuggestionsSelectInput.module.scss";

export interface TSuggestionsInputProps<T> extends InputProps {
  defaultSuggestionValue?: string;
  fiasId: string;
  boundType: string;
  onValueConfirm: (value: T) => void;
}

export const SuggestionsSelectInput = (props: TSuggestionsInputProps<TDadataResponse>) => {
  const [suggestions, setSuggestions] = useState<TDadataResponse[]>([]);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [localInputValue, setLocalInputValue] = useState<string | null>(null);

  const displayValue =
    localInputValue !== null ? localInputValue : (props.defaultSuggestionValue ?? "");

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setLocalInputValue(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowSuggestions = (value: string) => {
    setActiveSuggestionIndex(-1);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await getDadataSuggestions(
          {
            fiasId: props.fiasId,
            location: value,
          },
          props.boundType as TDadataBound
        );
        if (res) {
          setSuggestions(res);
        }
      } catch (error) {
        console.error("Ошибка при получении подсказок:", error);
      }
    };
    void fetchSuggestions();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalInputValue(value);
    handleShowSuggestions(value);
  };

  const handleSelectSuggestion = (suggestion: TDadataResponse) => {
    setLocalInputValue(null);
    props.onValueConfirm(suggestion);
    setSuggestions([]);
  };

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) =>
    handleKeyDown({
      suggestions,
      e,
      setSuggestions,
      setActiveSuggestionIndex,
      activeSuggestionIndex,
      handleSelectSuggestion,
    });

  return (
    <div ref={containerRef} className={styles.suggestionsSelectInput}>
      <CustomInput
        label={props.label}
        required={props.required}
        id={props.id}
        className={styles.locationSuggestion}
        placeholder={props.placeholder}
        value={displayValue}
        onChange={handleInputChange}
        onKeyDown={onKeydown}
      />
      {suggestions.length > 0 && (
        <LocationSuggestionsList
          suggestions={suggestions}
          handleSelectSuggestion={handleSelectSuggestion}
          activeSuggestionIndex={activeSuggestionIndex}
        />
      )}
    </div>
  );
};
