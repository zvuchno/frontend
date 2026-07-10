import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { type TOrder, useGetCheckoutData, useSelectPickpoint } from "@/entities/order";

import { CustomInput } from "@/shared/ui";

import { type TCdekCity, getCdekCities } from "../api/cdek.api";
import { LocationSuggestionsList } from "../components/LocationSuggestionsList";
import { WidgetCdek } from "../components/WidgetCdek";
import { handleKeyDown } from "../lib/handleKeydown";
import styles from "./CdekDelivery.module.scss";

export const CdekDelivery = () => {
  const { data } = useGetCheckoutData();
  const defaultCity = data?.user_defaults.city || "";

  const [currentCity, setCurrentCity] = useState(defaultCity);

  const [currentInputValue, setCurrentInputValue] = useState(defaultCity);

  const [suggestions, setSuggestions] = useState<TCdekCity[]>([]);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const [prevDefaultCity, setPrevDefaultCity] = useState(defaultCity);
  if (defaultCity !== prevDefaultCity) {
    setPrevDefaultCity(defaultCity);
    setCurrentCity(defaultCity);
    setCurrentInputValue(defaultCity);
  }

  const { register, setValue } = useFormContext<TOrder>();
  const { deliverySelected } = useSelectPickpoint();

  const handleShowSuggestions = (value: string) => {
    setCurrentInputValue(value);
    setActiveSuggestionIndex(-1);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await getCdekCities(value);
        if (res) {
          setSuggestions(res);
        }
      } catch (error) {
        console.error("Ошибка при получении подсказок:", error);
      }
    };
    void fetchSuggestions();
  };

  const handleSelectSuggestion = (suggestion: TCdekCity) => {
    const cityName = suggestion.full_name;
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

  useEffect(() => {
    register("delivery_point");
    register("city");
  }, [register]);

  useEffect(() => {
    if (!deliverySelected) return;
    setValue("delivery_point", deliverySelected.code);
    setValue("city", deliverySelected.city);
  }, [deliverySelected, setValue]);

  return (
    <section className={styles.cdek}>
      <h3 className={styles.title}>Выбор ПВЗ</h3>
      <div className={styles.cdekPickPointPicker}>
        <CustomInput
          label={"Город"}
          required
          id={"cdek-city-input"}
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

      {currentCity && currentCity.trim() !== "" && (
        <WidgetCdek key={currentCity} cityName={currentCity} />
      )}
    </section>
  );
};
