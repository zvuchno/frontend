export type TButtonAddLinkItem = {
  id?: number | string;
  label: string;
  value: string;
};

export interface TButtonAddLinkProps {
  items: readonly TButtonAddLinkItem[];
  addButtonText: string;
  title?: string;
  deletingItemKey?: string | null;
  className?: string;
  onAddClick: () => void;
  onDeleteClick?: (item: TButtonAddLinkItem) => void;
}
