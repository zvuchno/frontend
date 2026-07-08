import { useState } from "react";

import Script from "next/script";

import { useGetCheckoutData } from "@/entities/order";

import { CustomInput } from "@/shared/ui";

import { choseLocation } from "../api/cdek.api";
import { handleKeyDown } from "../lib/handleKeydown";
import type { TAddressSuggestion } from "../model/types";
import styles from "./CdekDelivery.module.scss";
import { LocationSuggestionsList } from "./LocationSuggestionsList";
import { WidgetCdek } from "./WidgetCdek";

export const CdekDelivery = ({
  isDeliveryChosen,
}: {
  isDeliveryChosen: (isChosen: boolean) => void;
}) => {
  const { data } = useGetCheckoutData();
  const defaultCity = data?.user_defaults.city || "";

  const [currentCity, setCurrentCity] = useState(defaultCity);
  const [currentInputValue, setCurrentInputValue] = useState(defaultCity);
  const [suggestions, setSuggestions] = useState<TAddressSuggestion[]>([]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const handleShowSuggestions = (value: string) => {
    setCurrentInputValue(value);
    setActiveSuggestionIndex(-1);

    if (value.length < 3) {
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
    const cityName = suggestion.value;
    setCurrentInputValue(cityName);
    setCurrentCity(cityName);

    setSuggestions([]);
  };

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) =>
    handleKeyDown(
      suggestions,
      e,
      setSuggestions,
      setActiveSuggestionIndex,
      activeSuggestionIndex,
      handleSelectSuggestion
    );

  return (
    <section className={styles.cdek}>
      <h3 className={styles.title}>Выбор ПВЗ</h3>
      <div className={styles.cdekPickPointPicker}>
        <CustomInput
          label={"Город"}
          required
          id={""}
          className={styles.cdekCity}
          placeholder='Выберите город'
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
      {isScriptLoaded && currentCity && currentCity.trim() !== "" && (
        <WidgetCdek cityName={currentCity} isDeliveryChosen={isDeliveryChosen} />
      )}
      <Script
        src='https://cdn.jsdelivr.net/npm/@cdek-it/widget@3'
        strategy='afterInteractive'
        onLoad={() => setIsScriptLoaded(true)}
      />
    </section>
  );
};
