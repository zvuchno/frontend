"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import Link from "next/link";

import { DeleteIcon, Text } from "@/shared/ui";
import { EditIcon } from "@/shared/ui/Icons";

import { isAlbum, isMerch, isPromo } from "../../utils/typeGuarde";
import s from "./ShowcaseCard.module.scss";
import { type ShowcaseCardProps } from "./ShowcaseCard.type";

const totalPriceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatTotalPrice = (totalPrice: number) => totalPriceFormatter.format(totalPrice);

const percentFormatter = new Intl.NumberFormat("ru-RU", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatPercent = (value: number | null | undefined): string => {
  if (value == null) return "";
  return percentFormatter.format(value);
};

const formatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formatDateRangeIntl = (startAt?: string | null, endAt?: string | null) => {
  if (!startAt || !endAt) return "неограничено";
  const start = formatter.format(new Date(startAt));
  const end = formatter.format(new Date(endAt));
  return `${start} - ${end}`;
};

export const ShowcaseCard = ({
  item,
  profileType,
  onToggleAlbumVisibility,
  onToggleMerchVisibility,
  onTogglePromoVisibility,
  onDeleteAlbum,
  onDeleteMerch,
  onDeletePromocode,
  onEditPromo,
}: ShowcaseCardProps) => {
  //const [columnsCount, setColumnsCount] = useState<number>();
  const id = item.id;
  // const productCardClassName = clsx(s.card, {
  //   [s[`columns-${columnsCount}`]]: columnsCount,
  // });

  const handleToggleVisibility = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const isCheked = e.target.checked;
    if (id) {
      if (type === "album") await onToggleAlbumVisibility(isCheked, id);
      if (type === "merch") await onToggleMerchVisibility(isCheked, id);
      if (type === "promo") await onTogglePromoVisibility(isCheked, id);
    }
  };

  const handleDeleteItem = async (type: string) => {
    if (id) {
      if (type === "album") await onDeleteAlbum(id);
      if (type === "merch") await onDeleteMerch(id);
      if (type === "promo") await onDeletePromocode(id);
    }
  };

  const handleEditPromoClick = () => {
    onEditPromo(id);
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     const width = window.innerWidth;
  //     if (width < 476) {
  //       setColumnsCount(3);
  //     } else if (width < 1025) {
  //       setColumnsCount(4);
  //     } else {
  //       setColumnsCount(7);
  //     }
  //   };

  //   handleResize();

  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const renderActions = (type: string, editType: string, isChecked?: boolean) => {
    const params = new URLSearchParams();
    params.append("id", encodeURIComponent(id));

    return (
      <div
        className={clsx(s.actions, {
          [s.actions_wide]: type === "promo",
          [s.actions_full]: profileType === "label" && type === "promo",
        })}
      >
        <label
          className={s.checkboxContainer}
          aria-label='Переключить видимость'
          title='Переключить видимость'
        >
          <input
            type='checkbox'
            className={s.visuallyHidden}
            checked={isChecked}
            onChange={(e) => void handleToggleVisibility(e, type)}
          />
          <span className={s.checkboxMark}></span>
        </label>
        <div className={s.buttons}>
          <Link
            className={s.editButton}
            href={
              editType === "promo"
                ? ""
                : `/artist/showcase/upload/${editType}/?${params.toString()}`
            }
            onClick={editType === "promo" ? handleEditPromoClick : undefined}
            aria-label='Редактировать'
            title='Редактировать'
          >
            {EditIcon()}
          </Link>
          <button
            type='button'
            className={s.deleteButton}
            onClick={() => void handleDeleteItem(type)}
            aria-label='Удалить'
            title='Удалить'
          >
            {DeleteIcon()}
          </button>
        </div>
      </div>
    );
  };

  if (isAlbum(item)) {
    return (
      <div className={s.card}>
        <div className={s.imgContainer}>
          {item.cover_image && <img src={item.cover_image} alt={item.name} loading='lazy' />}
        </div>
        {profileType === "label" && (
          <Text className={clsx(s.text, s.title)}>{item.artist_name}</Text>
        )}
        <Text className={clsx(s.text, s.title, { [s.wide]: profileType === "artist" })}>
          {item.name}
        </Text>
        <Text className={s.text}>{item.sku}</Text>
        <Text className={s.text}>{formatTotalPrice(Number(item.price))}</Text>
        <Text className={s.text}>-</Text>
        {renderActions("album", item.is_single ? "single" : "album", item.is_published)}
      </div>
    );
  }

  if (isMerch(item)) {
    return (
      <div className={s.card}>
        <div className={s.imgContainer}>
          {item.main_image && <img src={item.main_image} alt={item.name} loading='lazy' />}
        </div>
        {profileType === "label" && (
          <Text className={clsx(s.text, s.title)}>{item.artist_name}</Text>
        )}
        <Text className={clsx(s.text, s.title, { [s.wide]: profileType === "artist" })}>
          {item.name}
        </Text>
        <Text className={s.text}>{item.sku ? item.sku : "-"}</Text>
        <Text className={s.text}>{formatTotalPrice(Number(item.price))}</Text>
        <Text className={s.text}>{item.stock} шт</Text>
        {renderActions("merch", "merch", item.is_published)}
      </div>
    );
  }

  if (isPromo(item)) {
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

    const period = formatDateRangeIntl(item?.start_at, item?.end_at);
    return (
      <div className={s.card}>
        <Text className={clsx(s.text, s.title)}>{item.code}</Text>
        {profileType === "label" && (
          <Text className={clsx(s.text, s.title)}>{item.artist_name}</Text>
        )}
        <Text className={s.text}>{discount}</Text>
        <Text className={clsx(s.text, s.wide)}>{period}</Text>
        <Text className={s.text}>{usageText}</Text>
        {renderActions("promo", "promo", item.is_enabled)}
      </div>
    );
  }
};

export default ShowcaseCard;
