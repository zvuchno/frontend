"use client";

import clsx from "clsx";

import { DeleteIcon, Text } from "@/shared/ui";

import s from "./ShowcaseCard.module.scss";
import { type ShowcaseCardProps } from "./ShowcaseCard.type";
import { EditIcon } from "@/shared/ui/Icons";
import { isAlbum, isMerch, isPromo } from "../../utils/typeGuarde";

const totalPriceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatTotalPrice = (totalPrice: number) => totalPriceFormatter.format(totalPrice);

const formatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit' });

export const formatDateRangeIntl = (startAt?: string | null, endAt?: string  | null) => {
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
  onEdit,
}: ShowcaseCardProps) => {
  const id = item.id

  const handleToggleVisibility = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const isCheked = e.target.checked;
    if (id) {
      if (type === 'album') onToggleAlbumVisibility(isCheked, id);
      if (type === 'merch') onToggleMerchVisibility(isCheked, id);
      if (type === 'promo') onTogglePromoVisibility(isCheked, id);
    } 
  };

  const handleDeleteItem = (type: string) => {
    if (id) {
      if (type === 'album') onDeleteAlbum(id);
      if (type === 'merch') onDeleteMerch(id);
      if (type === 'promo') onDeletePromocode(id);
    }
  };

  const renderActions = (type: string, isChecked?: boolean) => (
    <div className={clsx(s.actions, {[s.actions_span]: type === 'promo'})}>
      <div className={s.buttons}>
        <button type="button" className={s.editButton} onClick={() => onEdit}>
          {EditIcon()}
        </button>
        <button 
          type="button" 
          className={s.deleteButton} 
          onClick={() => handleDeleteItem(type)}
        >
          {DeleteIcon()}
        </button>
      </div>
      <label className={s.checkboxContainer}>
        <input
          type="checkbox"
          className={s.visuallyHidden}
          checked={isChecked}
          onChange={(e) => handleToggleVisibility(e, type)}
          aria-label="переключение видимости"
        />
        <span className={s.checkboxMark}></span>
      </label>
    </div>
    
  );

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
        {renderActions('album', item.is_published)}
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
        <Text className={s.text}>{item.sku}</Text>
        <Text className={s.text}>{item.price}</Text>
        <Text className={s.text}>{item.stock} шт</Text>
        {renderActions('merch')}
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
        {renderActions('promo', item.is_enabled)}
      </div>
    )
  }
};

export default ShowcaseCard;
