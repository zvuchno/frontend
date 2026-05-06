'use client';

import { Text } from "@/shared/ui/Typography/Typography";
import s from "./ShowcaseCard.module.scss";
import clsx from "clsx";
import { ShowcaseCardProps } from "./ShowcaseCard.type";

const ShowcaseCard = ({ variant, product, promoCode, onToggleVisibility, onDelete, onEdit }: ShowcaseCardProps) => {

  const id = product?.id ?? promoCode?.id;

  const handleToggleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (id) onToggleVisibility(e.target.checked, id)
  };

  const handleDelete = () => {
    if (id) onDelete(id);
  };

  const handleEdit = () => {
    if (id && onEdit) onEdit(id);
  };

  return (
    <div className={s.card}>

      {variant === 'product' && (
        <div className={s.imgContainer}>
          {product?.image && <img src={product.image} alt={product.name} />}
        </div>
      )}

      <Text className={clsx(s.text, {[s.name]: variant === 'product'})}>{product?.name || promoCode?.name}</Text>
      <Text className={s.text}>{product?.article || (promoCode?.discount && `${promoCode.discount}%`)}</Text>
      <Text className={s.text}>{(product?.price && `${product.price} ₽`) || promoCode?.period}</Text>
      <Text className={s.text}>{(product?.amount && `${product.amount} шт`) || promoCode?.amount}</Text>

      <div className={clsx(s.actions, {[s.actions_span]: variant === 'promo'})}>
        <label className={s.checkboxContainer}>
          <input 
            type="checkbox" 
            className={s.visuallyHidden} 
            checked={product?.visibility ?? promoCode?.visibility}
            onChange={handleToggleVisibility}
          />
          <span className={s.checkboxMark}></span>
        </label>
        <div className={s.buttons}>
          {variant === 'promo' && (
            <button 
              type="button" 
              className={clsx(s.text, s.actions__button)} 
              onClick={handleEdit}
            >
              изменить
            </button>
          )}
          <button 
            type="button" 
            className={clsx(s.text, s.actions__button)} 
            onClick={handleDelete}
          >
            удалить
          </button>
        </div>
      </div>
      
    </div>
  )
};

export default ShowcaseCard;