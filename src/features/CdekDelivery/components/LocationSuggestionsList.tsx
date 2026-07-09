import type { TCdekCity } from "../api/cdek.api";
import styles from "../ui/CdekDelivery.module.scss";

export const LocationSuggestionsList = ({
  suggestions,
  handleSelectSuggestion,
  activeSuggestionIndex,
}: {
  suggestions: TCdekCity[];
  handleSelectSuggestion: (suggestion: TCdekCity) => void;
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
          {suggestion.full_name}
        </li>
      );
    })}
  </ul>
);
