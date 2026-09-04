import type { TShowcaseAlbum, TShowcaseMerch, TShowcasePromocode } from "../../model/types";

type TShowcaseItem = TShowcaseAlbum | TShowcaseMerch | TShowcasePromocode;

export interface ShowcaseCardProps {
  item: TShowcaseItem;
  profileType: "artist" | "label" | undefined;
  columnsCount?: number;
  onToggleAlbumVisibility: (isChecked: boolean, id: number) => Promise<void> | void;
  onToggleMerchVisibility: (isChecked: boolean, id: number) => Promise<void> | void;
  onTogglePromoVisibility: (isChecked: boolean, id: number) => Promise<void> | void;
  onDeleteAlbum: (id: number) => Promise<void> | void;
  onDeleteMerch: (id: number) => Promise<void> | void;
  onDeletePromocode: (id: number) => Promise<void> | void;
  onEditPromo: (id: number) => void;
}
