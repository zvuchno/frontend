"use client";

import clsx from "clsx";

import { DeleteIcon, Text } from "@/shared/ui";

import s from "./ShowcaseCard.module.scss";
import { type ShowcaseCardProps } from "./ShowcaseCard.type";
import { EditIcon } from "@/shared/ui/Icons";

export const ShowcaseCard = ({
  variant,
  product,
  promoCode,
  onToggleVisibility,
  onDelete,
  onEdit,
}: ShowcaseCardProps) => {
  const id = product?.id ?? promoCode?.id;

  const handleToggleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (id) onToggleVisibility(e.target.checked, id);
  };

  const handleDelete = () => {
    if (id) onDelete(id);
  };

  const handleEdit = () => {
    if (id && onEdit) onEdit(id);
  };

  const name = product?.name || promoCode?.name;
  const articleOrDiscount = product?.article || (promoCode?.discount && `${promoCode.discount}%`);
  const priceOrPeriod = (product?.price && `${product.price} ₽`) || promoCode?.period;
  const amount = (product?.amount && `${product.amount} шт`) || promoCode?.amount;

  return (
    <div className={s.card}>
      {variant === "product" && (
        <div className={s.imgContainer}>
          {product?.image && (
            <img src={product.image} alt={product.name} loading='lazy' />
          )}
        </div>
      )}

      <Text className={clsx(s.text, { [s.name]: variant === "product" })}>
        {name}
      </Text>
      <Text className={s.text}>
        {articleOrDiscount}
      </Text>
      <Text className={s.text}>
        {priceOrPeriod}
      </Text>
      <Text className={s.text}>
        {amount}
      </Text>

      <div className={clsx(s.actions, { [s.actions_span]: variant === "promo" })}>
        <label className={s.checkboxContainer}>
          <input
            type='checkbox'
            className={s.visuallyHidden}
            checked={product?.visibility ?? promoCode?.visibility}
            onChange={handleToggleVisibility}
          />
          <span className={s.checkboxMark}></span>
        </label>
        <div className={s.buttons}>
          <button className={s.editButton} onClick={handleEdit}>
            {EditIcon()}
          </button>
          <button className={s.deleteButton} onClick={handleDelete}>
            {DeleteIcon()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
