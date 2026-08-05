"use client";

import s from "./showcaseItemsList.module.scss";
import { 
  ShowcaseCard, 
  type TShowcaseItem, 
  useDeleteAlbum, 
  useDeleteMerch, 
  useDeletePromocode,
  useUpdateAlbum,
  useUpdateMerch,
  useUpdatePromocode,
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
  const toggleAlbumMutation = useUpdateAlbum();
  const toggleMerchMutation = useUpdateMerch();
  const togglePromoMutation = useUpdatePromocode();

  const deleteAlbumMutation = useDeleteAlbum();
  const deleteMerchMutation = useDeleteMerch();
  const deletePromocodeMutation = useDeletePromocode();

  const isProduct = itemType === "products" || itemType === "album" || itemType === "merch";
  const isPromo = itemType === "promo";

  const handleToggleAlbumVisibility = async (isChecked: boolean, id: number) => {
    await toggleAlbumMutation.mutateAsync({ 
      id, 
      payload: {is_published: isChecked}
    });
  };

  const handleToggleMerchVisibility = async (isChecked: boolean, id: number) => {
    await toggleMerchMutation.mutateAsync({ 
      id, 
      payload: {is_published: isChecked}
    });
  };

  const handleTogglePromoVisibility = async (isChecked: boolean, id: number) => {
    await togglePromoMutation.mutateAsync({ 
      id, 
      payload: {is_enabled: isChecked} 
    });
  };

  const handleDeleteAlbum = async (id: number) => {
    await deleteAlbumMutation.mutateAsync({ id });
  };

  const handleDeleteMerch = async (id: number) => {
    await deleteMerchMutation.mutateAsync({ id });
  };

  const handleDeletePromocode = async(id: number) => {
    await deletePromocodeMutation.mutateAsync({ id });
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
          />
        ))}
      </ul>
    </div>
  )
}