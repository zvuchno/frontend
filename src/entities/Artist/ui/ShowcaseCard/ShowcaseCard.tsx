"use client";

import { isAlbum, isMerch, isPromo } from "../../utils/typeGuarde";
import { type ShowcaseCardProps } from "./ShowcaseCard.type";
import { AlbumItem } from "./components/AlbumItem";
import { MerchItem } from "./components/MerchItem";
import { PromoItem } from "./components/PromoItem";

const totalPriceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatTotalPrice = (totalPrice: number) => totalPriceFormatter.format(totalPrice);

export const ShowcaseCard = ({
  item,
  profileType,
  columnsCount = 1,
  cardType,
  onToggleAlbumVisibility,
  onToggleMerchVisibility,
  onTogglePromoVisibility,
  onDeleteAlbum,
  onDeleteMerch,
  onDeletePromocode,
  onEditPromo,
}: ShowcaseCardProps) => {
  if (isAlbum(item)) {
    return (
      <AlbumItem
        item={item}
        columnsCount={columnsCount}
        profileType={profileType}
        cardType={cardType}
        formatTotalPrice={formatTotalPrice}
        onToggleAlbumVisibility={onToggleAlbumVisibility}
        onToggleMerchVisibility={onToggleMerchVisibility}
        onTogglePromoVisibility={onTogglePromoVisibility}
        onDeleteAlbum={onDeleteAlbum}
        onDeletePromocode={onDeletePromocode}
        onDeleteMerch={onDeleteMerch}
        onEditPromo={onEditPromo}
      />
    );
  }

  if (isMerch(item)) {
    return (
      <MerchItem
        item={item}
        columnsCount={columnsCount}
        profileType={profileType}
        cardType={cardType}
        formatTotalPrice={formatTotalPrice}
        onToggleAlbumVisibility={onToggleAlbumVisibility}
        onToggleMerchVisibility={onToggleMerchVisibility}
        onTogglePromoVisibility={onTogglePromoVisibility}
        onDeleteAlbum={onDeleteAlbum}
        onDeletePromocode={onDeletePromocode}
        onDeleteMerch={onDeleteMerch}
        onEditPromo={onEditPromo}
      />
    );
  }

  if (isPromo(item)) {
    return (
      <PromoItem
        item={item}
        columnsCount={columnsCount}
        profileType={profileType}
        cardType={cardType}
        formatTotalPrice={formatTotalPrice}
        onToggleAlbumVisibility={onToggleAlbumVisibility}
        onToggleMerchVisibility={onToggleMerchVisibility}
        onTogglePromoVisibility={onTogglePromoVisibility}
        onDeleteAlbum={onDeleteAlbum}
        onDeletePromocode={onDeletePromocode}
        onDeleteMerch={onDeleteMerch}
        onEditPromo={onEditPromo}
      />
    );
  }
};

export default ShowcaseCard;
