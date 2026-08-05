"use client";

import clsx from "clsx";

import { DeleteIcon, Text } from "@/shared/ui";

import s from "./ShowcaseCard.module.scss";
import { type ShowcaseCardProps } from "./ShowcaseCard.type";
import { EditIcon } from "@/shared/ui/Icons";
import { isAlbum, isMerch, isPromo } from "../../utils/typeGuarde";
import Link from "next/link";

const totalPriceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatTotalPrice = (totalPrice: number) => totalPriceFormatter.format(totalPrice);

const formatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit' });

const formatDateRangeIntl = (startAt?: string | null, endAt?: string  | null) => {
  if (!startAt || !endAt) return null;
  const start = formatter.format(new Date(startAt));
  const end = formatter.format(new Date(endAt));
  return `${start} - ${end}`;
};

export const ShowcaseCard = ({
  item,
  onToggleAlbumVisibility,
  onToggleMerchVisibility,
  onTogglePromoVisibility,
  onDeleteAlbum,
  onDeleteMerch,
  onDeletePromocode,
}: ShowcaseCardProps) => {
  const id = item.id

  const handleToggleVisibility = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const isCheked = e.target.checked;
    if (id) {
      if (type === 'album') await onToggleAlbumVisibility(isCheked, id);
      if (type === 'merch') await onToggleMerchVisibility(isCheked, id);
      if (type === 'promo') await onTogglePromoVisibility(isCheked, id);
    } 
  };

  const handleDeleteItem = async (type: string) => {
    if (id) {
      if (type === 'album') await onDeleteAlbum(id);
      if (type === 'merch') await onDeleteMerch(id);
      if (type === 'promo') await onDeletePromocode(id);
    }
  };

  const renderActions = (type: string, editType: string, isChecked?: boolean) => {
    const params = new URLSearchParams();
    params.append('id', encodeURIComponent(id));

    return (
    <div className={clsx(s.actions, {[s.actions_span]: type === 'promo'})}>
      <label className={s.checkboxContainer}>
        <input
          type="checkbox"
          className={s.visuallyHidden}
          checked={isChecked}
          onChange={(e) => void handleToggleVisibility(e, type)}
          aria-label="переключение видимости"
        />
        <span className={s.checkboxMark}></span>
      </label>
      <div className={s.buttons}>
        <Link  
          className={s.editButton} 
          href={editType === 'promo' ? '' : `/artist/showcase/upload/${editType}/?${params.toString()}`}
        >
          {EditIcon()}
        </Link>
        <button 
          type="button" 
          className={s.deleteButton} 
          onClick={() => void handleDeleteItem(type)}
        >
          {DeleteIcon()}
        </button>
      </div>
    
    </div>
    
  )};

  if (isAlbum(item)) {
    return (
      <div className={s.card}>
        <div className={s.imgContainer}>
          {item.cover_image && (
            <img src={item.cover_image} alt={item.name} loading='lazy' />
          )}
        </div>
        <Text className={clsx(s.text, s.name)}>
          {item.name}
        </Text>
        <Text className={s.text}>{item.sku}</Text>
        <Text className={s.text}>{item.price}</Text>
        <Text className={s.text}>-</Text>
        {renderActions('album', item.is_single ? 'single' : 'album', item.is_published)}
      </div>
    )
  }

  if (isMerch(item)) {
    return (
      <div className={s.card}>
        <div className={s.imgContainer}>
          {item.main_image && (
            <img src={item.main_image} alt={item.name} loading='lazy' />
          )}
        </div>
        <Text className={clsx(s.text, s.name)}>
          {item.name}
        </Text>
        <Text className={s.text}>{item.sku ? item.sku : '-'}</Text>
        <Text className={s.text}>{item.price}</Text>
        <Text className={s.text}>{item.stock} шт</Text>
        {renderActions('merch', 'merch', item.is_published)}
      </div>
    )
  }

  if (isPromo(item)) {
    let discount: string = '';
    if (item?.discount_type === 'PERCENT') {
      discount = `${item.discount_value}%`;
    } else if (item?.discount_type === 'FIXED') {
      discount = formatTotalPrice(Number(item?.discount_value));
    }

    let usageText = 'неограничено';
    if (item.usage_limit !== null) {
      usageText = `${item.used_count} / ${item.usage_limit}`;
    } 

    const period = formatDateRangeIntl(item?.start_at, item?.end_at);
    return (
      <div className={s.card}>
        <Text className={clsx(s.text, s.name)}>
          {item.code}
        </Text>
        <Text className={s.text}>{discount}</Text>
        <Text className={s.text}>{period}</Text>
        <Text className={s.text}>{usageText}</Text>
        {renderActions('promo', 'promo', item.is_enabled)}
      </div>
    )
  }
};

export default ShowcaseCard;
