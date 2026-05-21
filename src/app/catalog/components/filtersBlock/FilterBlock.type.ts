export interface FilterBlockProps {
  genre: string;
  category: string;
  sortType?: string;
  onChangeGenre: () => void;
  onChangeCategory: () => void;
  onChangeSortType: () => void;
}