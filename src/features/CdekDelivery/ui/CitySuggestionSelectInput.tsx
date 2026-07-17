import { useEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";

import { useGetCheckoutData } from "@/entities/order";

import { CustomInput } from "@/shared/ui";
import type { InputProps } from "@/shared/ui/CustomInput/CustomInput.types";
import { handleKeyDown } from "@/shared/utils/handleKeydown";

import { type TCdekCity, getCdekCities } from "../api/cdek.api";
import { LocationSuggestionsList } from "../components/LocationSuggestionsList";
import styles from "./CdekDelivery.module.scss";

export interface TCitySuggestionsInput extends InputProps {
  onValueConfirm: (value: TCdekCity) => void;
}

export const CitySuggestionSelectInput = (props: TCitySuggestionsInput) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const { data } = useGetCheckoutData();
  const defaultCity = data?.user_defaults.city || "";
  const [suggestions, setSuggestions] = useState<TCdekCity[]>([]);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const [currentInputValue, setCurrentInputValue] = useState(defaultCity);

  const [prevDefaultCity, setPrevDefaultCity] = useState<TCdekCity | string>(defaultCity);

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
        const res = await getCdekCities(value, token);
        if (res) {
          setSuggestions(res);
        }
      } catch (error) {
        console.error("Ошибка при получении подсказок:", error);
      }
    };
    void fetchSuggestions();
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectSuggestion = (suggestion: TCdekCity) => {
    const cityName = suggestion.full_name;
    setCurrentInputValue(cityName);
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
    <div ref={containerRef} className={styles.cdekPickPointPicker}>
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
