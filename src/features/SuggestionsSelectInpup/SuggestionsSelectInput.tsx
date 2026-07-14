import { useState } from "react";

import { useGetCheckoutData } from "@/entities/order";

import { choseLocation } from "@/shared/api/getDadataLocation";
import { type TAddressSuggestion } from "@/shared/types/TAddressSuggestion.types";
import { CustomInput } from "@/shared/ui";
import type { InputProps } from "@/shared/ui/CustomInput/CustomInput.types";
import { LocationSuggestionsList } from "@/shared/ui/LocationSuggestionsList";
import { handleKeyDown } from "@/shared/utils/handleKeydown";

import styles from "./CdekDelivery.module.scss";

export interface TSuggestionsInputProps<T> extends InputProps {
  onValueConfirm: (value: T) => void;
}

export const SuggestionsSelectInput = (props: TSuggestionsInputProps<TAddressSuggestion>) => {
  const { data } = useGetCheckoutData();
  const defaultCity = data?.user_defaults.city || "";
  const [suggestions, setSuggestions] = useState<TAddressSuggestion[]>([]);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const [currentInputValue, setCurrentInputValue] = useState(defaultCity);

  const [prevDefaultCity, setPrevDefaultCity] = useState<TAddressSuggestion | string>(defaultCity);

  if (defaultCity !== prevDefaultCity) {
    setPrevDefaultCity(defaultCity);
    setCurrentInputValue(defaultCity);
  }

  const handleShowSuggestions = (value: string) => {
    setCurrentInputValue(value);
    setActiveSuggestionIndex(-1);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await choseLocation(value);
        if (res) {
          setSuggestions(res);
        }
      } catch (error) {
        console.error("Ошибка при получении подсказок:", error);
      }
    };
    void fetchSuggestions();
  };

  const handleSelectSuggestion = (suggestion: TAddressSuggestion) => {
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
    <div className={styles.cdekPickPointPicker}>
      <CustomInput
        label={"Город"}
        required
        id={props.id}
        className={styles.cdekCity}
        placeholder={props.placeholder}
        value={currentInputValue}
        onChange={(e) => handleShowSuggestions(e.target.value)}
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
