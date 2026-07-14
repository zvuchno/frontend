interface SuggestionsListProps<T> {
  suggestions: T[];
  e: React.KeyboardEvent<HTMLInputElement>;
  setSuggestions: (suggestions: T[]) => void;
  setActiveSuggestionIndex: React.Dispatch<React.SetStateAction<number>>;
  activeSuggestionIndex: number;
  handleSelectSuggestion: (suggestion: T) => void;
}

export const handleKeyDown = <T>({
  suggestions,
  e,
  setSuggestions,
  setActiveSuggestionIndex,
  activeSuggestionIndex,
  handleSelectSuggestion,
}: SuggestionsListProps<T>): void => {
  if (suggestions.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setActiveSuggestionIndex((prevIndex) =>
      prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
    );
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setActiveSuggestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
    );
  } else if (e.key === "Enter") {
    if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[activeSuggestionIndex]);
    }
  } else if (e.key === "Escape") {
    setSuggestions([]);
    setActiveSuggestionIndex(-1);
  }
};
