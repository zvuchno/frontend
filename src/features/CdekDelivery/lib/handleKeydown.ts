import type { TCdekCity } from "../api/cdek.api";

export const handleKeyDown = (
  suggestions: TCdekCity[],
  e: React.KeyboardEvent<HTMLInputElement>,
  setSuggestions: (suggestions: TCdekCity[]) => void,
  setActiveSuggestionIndex: React.Dispatch<React.SetStateAction<number>>,
  activeSuggestionIndex: number,
  handleSelectSuggestion: (suggestion: TCdekCity) => void
) => {
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
