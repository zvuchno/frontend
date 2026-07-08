import type { TAddressSuggestion } from "../model/types";

export const handleKeyDown = (
  suggestions: TAddressSuggestion[],
  e: React.KeyboardEvent<HTMLInputElement>,
  setSuggestions: (suggestions: TAddressSuggestion[]) => void,
  setActiveSuggestionIndex: React.Dispatch<React.SetStateAction<number>>,
  activeSuggestionIndex: number,
  handleSelectSuggestion: (suggestion: TAddressSuggestion) => void
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
