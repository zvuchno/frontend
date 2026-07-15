import type { ReactNode } from "react";

import { type TDadataResponse } from "../../types/daData.types";
import styles from "./LocationSuggestionsList.module.scss";

interface SuggestionsListProps {
  suggestions: TDadataResponse[];
  handleSelectSuggestion: (suggestion: TDadataResponse) => void;
  activeSuggestionIndex: number;
  children?: ReactNode;
}

export const LocationSuggestionsList = ({
  suggestions,
  handleSelectSuggestion,
  activeSuggestionIndex,
}: SuggestionsListProps) => (
  <ul className={styles.locationSuggestionsList}>
    {suggestions.map((suggestion, index) => {
      const isActive = index === activeSuggestionIndex;
      return (
        <li
          key={index}
          onClick={() => handleSelectSuggestion(suggestion)}
          className={styles.locationSuggestionsListItem}
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
