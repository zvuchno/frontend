"use client";

import s from "./showcaseItemsList.module.scss";
import { 
  ShowcaseCard, 
  TShowcaseItem, 
  useDeleteAlbum, 
  useDeleteMerch, 
  useDeletePromocode, 
  useToggleAlbumVisibility, 
  useToggleMerchVisibility, 
  useToggPromocodeVisibility, 
  type TShowcaseAlbum, 
  type TShowcaseMerch, 
  type TShowcasePromocode 
} from "@/entities/Artist";
import { Text, Title } from "@/shared/ui";
import clsx from "clsx";

interface ShowcaseItemsListProps {
  itemType: TShowcaseItem;
  items: TShowcasePromocode[] | (TShowcaseAlbum | TShowcaseMerch)[];
};

export const ShowcaseItemsList = ({ 
  itemType, 
  items,
}: ShowcaseItemsListProps) => {
  const toggleAlbumMutation = useToggleAlbumVisibility();
  const toggleMerchMutation = useToggleMerchVisibility();
  const togglePromoMutation = useToggPromocodeVisibility();

  const deleteAlbumMutation = useDeleteAlbum();
  const deleteMerchMutation = useDeleteMerch();
  const deletePromocodeMutation = useDeletePromocode();

  const isProduct = itemType === "products" || itemType === "album" || itemType === "merch";
  const isPromo = itemType === "promo";

  const handleToggleAlbumVisibility = (isChecked: boolean, id: number) => {
    toggleAlbumMutation.mutate({ id, is_published: isChecked });
  };

  const handleToggleMerchVisibility = (isChecked: boolean, id: number) => {
    toggleMerchMutation.mutate({ id, is_published: isChecked });
  };

  const handleTogglePromoVisibility = (isChecked: boolean, id: number) => {
    togglePromoMutation.mutate({ id, is_enabled: isChecked });
  };

  const handleDeleteAlbum = (id: number) => {
    deleteAlbumMutation.mutate({ id });
  };

  const handleDeleteMerch = (id: number) => {
    deleteMerchMutation.mutate({ id });
  };

  const handleDeletePromocode = (id: number) => {
    deletePromocodeMutation.mutate({ id });
  };

  return (
    <div className={s.content}>
      <Title Tag='h4' className={s.title}>
        {itemType === 'products' ? 'Товары' : 'Промокоды'}
      </Title>

      <div className={s.heading}>
        <Text className={s.heading__text}>{isProduct ? "Фото" : "Промокод"}</Text>
        <Text
          className={clsx(s.heading__text, {
            [s.heading__text_span]: isProduct,
          })}
        >
          {isProduct ? "Наименование" : "Скидка"}
        </Text>
        <Text className={s.heading__text}>{isProduct ? "Артикул" : "Период"}</Text>
        <Text className={s.heading__text}>{isProduct ? "Цена" : "Количество"}</Text>
        <Text
          className={clsx(
            s.heading__text,
            { [s.heading__text_rightAligned]: isPromo },
            { [s.heading__text_leftAligned]: isPromo }
          )}
        >
          {isProduct ? "Остаток" : "Видимость"}
        </Text>
        {isProduct && (
          <Text
            className={clsx(s.heading__text, s.heading__text_span, s.heading__text_leftAligned)}
          >
            Видимость
          </Text>
        )}
      </div>

      <ul className={s.cardList}>
        {items.map((item) => (
          <ShowcaseCard
            key={item.id}
            item={item}
            onToggleAlbumVisibility={handleToggleAlbumVisibility}
            onToggleMerchVisibility={handleToggleMerchVisibility}
            onTogglePromoVisibility={handleTogglePromoVisibility}
            onDeleteAlbum={handleDeleteAlbum}
            onDeleteMerch={handleDeleteMerch}
            onDeletePromocode={handleDeletePromocode}
            onEdit={() => undefined}
          />
        ))}
      </ul>
    </div>
  )
}