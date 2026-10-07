import clsx from "clsx";
import Image from "next/image";

import { Text } from "@/shared/ui";

import { type TShowcaseAlbum } from "./../../../model/types";
import s from "./../ShowcaseCard.module.scss";
import { renderActions } from "./renderActions";

export const AlbumItem = ({
  item,
  columnsCount,
  profileType,
  cardType,
  formatTotalPrice,
  onToggleAlbumVisibility,
  onToggleMerchVisibility,
  onTogglePromoVisibility,
  onDeleteAlbum,
  onDeletePromocode,
  onDeleteMerch,
  onEditPromo,
}: {
  item: TShowcaseAlbum;
  columnsCount: number;
  profileType: "label" | "artist" | undefined;
  cardType: "product" | "promo" | undefined;
  formatTotalPrice: (totalPrice: number) => string;
  onToggleAlbumVisibility: (isChecked: boolean, id: number) => void | Promise<void>;
  onToggleMerchVisibility: (isChecked: boolean, id: number) => void | Promise<void>;
  onTogglePromoVisibility: (isChecked: boolean, id: number) => void | Promise<void>;
  onDeleteAlbum: (id: number) => void | Promise<void>;
  onDeletePromocode: (id: number) => void | Promise<void>;
  onDeleteMerch: (id: number) => void | Promise<void>;
  onEditPromo: (id: number) => void;
}) => {
  return (
    <div
      className={clsx(s.card, {
        [s[`columns-${columnsCount}`]]: columnsCount,
        [s[`card-${profileType}`]]: profileType,
        [s[`item-${cardType}`]]: cardType,
      })}
    >
      <div className={s.imgContainer}>
        {item.cover_image && (
          <Image src={item.cover_image} alt={item.name} width={64} height={64} />
        )}
      </div>
      {profileType === "label" && <Text className={clsx(s.text, s.title)}>{item.artist_name}</Text>}
      <Text className={clsx(s.text, s.title, { [s.wide]: profileType === "artist" })}>
        {item.name}
      </Text>
      <Text className={s.text}>{item.sku}</Text>
      <Text className={s.text}>{formatTotalPrice(Number(item.price))}</Text>
      <Text className={s.text}>-</Text>
      {renderActions({
        type: "album",
        editType: item.is_single ? "single" : "album",
        isChecked: item.is_published,
        id: item.id,
        onDeleteAlbum: onDeleteAlbum,
        onDeleteMerch: onDeleteMerch,
        onToggleAlbumVisibility: onToggleAlbumVisibility,
        onToggleMerchVisibility: onToggleMerchVisibility,
        onTogglePromoVisibility: onTogglePromoVisibility,
        onDeletePromocode: onDeletePromocode,
        onEditPromo: onEditPromo,
        profileType: profileType,
      })}
    </div>
  );
};
