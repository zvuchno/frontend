import type { TAddressSuggestion } from "../model/types";
import styles from "./CdekDelivery.module.scss";

export const LocationSuggestionsList = ({
  suggestions,
  handleSelectSuggestion,
  activeSuggestionIndex,
}: {
  suggestions: TAddressSuggestion[];
  handleSelectSuggestion: (suggestion: TAddressSuggestion) => void;
  activeSuggestionIndex: number;
}) => (
  <ul className={styles.suggestionsList}>
    {suggestions.map((suggestion, index) => {
      const isActive = index === activeSuggestionIndex;
      return (
        <li
          key={index}
          onClick={() => handleSelectSuggestion(suggestion)}
          className={styles.suggestionsListItem}
          style={{
            background: isActive ? "var(--color-bg-secondary)" : "#fff",
          }}
        >
          {suggestion.value}
        </li>
      );
    })}
  </ul>
);
