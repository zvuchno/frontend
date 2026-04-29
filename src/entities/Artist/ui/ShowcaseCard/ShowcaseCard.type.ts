import { TProduct, TPromoCode } from "@/entities/Artist/store/useShowcaseStore";

type TShowcaseItem = 'product' | 'promo';

export interface ShowcaseCardProps {
  variant: TShowcaseItem;
  product?: TProduct;
  promoCode?: TPromoCode;
  onToggleVisibility: (value: boolean, id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: (id: number) => void;
};