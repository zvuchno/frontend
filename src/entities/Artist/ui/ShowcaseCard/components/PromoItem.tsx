import clsx from "clsx";

import { Text } from "@/shared/ui";

import { type TShowcasePromocode } from "../../../model/types";
import s from "./../ShowcaseCard.module.scss";
import { renderActions } from "./renderActions";

const formatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formatDateRangeIntl = (startAt?: string | null, endAt?: string | null) => {
  if (!endAt) return "неограничено";
  if (startAt && endAt) {
    const start = formatter.format(new Date(startAt));
    const end = formatter.format(new Date(endAt));
    return `${start} - ${end}`;
  }
  if (!startAt && endAt) {
    const end = formatter.format(new Date(endAt));
    return `до ${end}`;
  }
};

export const PromoItem = ({
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
  item: TShowcasePromocode;
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
  const period = formatDateRangeIntl(item?.start_at, item?.end_at);
  const percentFormatter = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const formatPercent = (value: number | null | undefined): string => {
    if (value == null) return "";
    return percentFormatter.format(value);
  };
  let discount: string = "";
  if (item?.discount_type === "PERCENT") {
    discount = `${formatPercent(Number(item.discount_value))} %`;
  } else if (item?.discount_type === "FIXED") {
    discount = formatTotalPrice(Number(item?.discount_value));
  }

  let usageText = "неограничено";
  if (item.usage_limit !== null) {
    usageText = `${item.used_count} / ${item.usage_limit}`;
  }
  return (
    <div
      className={clsx(s.card, {
        [s[`columns-${columnsCount}`]]: columnsCount,
        [s[`card-${profileType}`]]: profileType,
        [s[`item-${cardType}`]]: cardType,
      })}
    >
      <Text className={clsx(s.text, s.title)}>{item.code}</Text>
      {profileType === "label" && <Text className={clsx(s.text, s.title)}>{item.artist_name}</Text>}
      <Text className={s.text}>{discount}</Text>
      <Text className={clsx(s.text, s.wide)}>{period}</Text>
      <Text className={s.text}>{usageText}</Text>
      {renderActions({
        type: "promo",
        editType: "promo",
        isChecked: item.is_enabled,
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
