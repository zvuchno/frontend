import type { ReactNode } from "react";

import styles from "../ui/CdekDelivery.module.scss";

interface SuggestionsListProps<T> {
  suggestions: T[];
  handleSelectSuggestion: (suggestion: T) => void;
  activeSuggestionIndex: number;
  children?: ReactNode;
}

export const LocationSuggestionsList = <T,>({
  suggestions,
  handleSelectSuggestion,
  activeSuggestionIndex,
  children,
}: SuggestionsListProps<T>) => (
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
          {children}
        </li>
      );
    })}
  </ul>
);
