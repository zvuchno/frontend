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
  profileType: "artist" | "label" | undefined;
  onEditPromo: (id: number) => void;
};

export const ShowcaseItemsList = ({ 
  itemType, 
  items,
  profileType,
  onEditPromo
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
        {itemType === 'promo' ? 'Промокоды' : 'Товары'}
      </Title>

      <div className={s.heading}>
        <Text 
          className={clsx(s.heading__text, {
            [s.heading__text_wide]: profileType === 'artist' && isPromo
          })}
        >
          {isProduct ? "Фото" : "Промокод"}
        </Text>
        {profileType === 'label' && (
          <Text 
            className={clsx(s.heading__text, {[s.heading__text_wide]: isPromo})}
          >
            Артист
          </Text>
        )}
        <Text
          className={clsx(s.heading__text, {
            [s.heading__text_wide]: isProduct && profileType === 'artist',
          })}
        >
          {isProduct ? "Наименование" : "Скидка"}
        </Text>
        <Text className={s.heading__text}>{isProduct ? "Артикул" : "Период"}</Text>
        <Text className={s.heading__text}>{isProduct ? "Цена" : "Количество"}</Text>
        <Text
          className={clsx(
            s.heading__text, { 
              [s.heading__text_rightAligned]: isPromo && profileType === 'artist',
              [s.heading__text_leftAligned]: isPromo && profileType === 'label'
          })}
        >
          {isProduct ? "Остаток" : "Видимость"}
        </Text>
        {isProduct && (
          <Text
            className={clsx(s.heading__text, s.heading__text_wide, s.heading__text_leftAligned)}
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
            profileType={profileType}
            onToggleAlbumVisibility={handleToggleAlbumVisibility}
            onToggleMerchVisibility={handleToggleMerchVisibility}
            onTogglePromoVisibility={handleTogglePromoVisibility}
            onDeleteAlbum={handleDeleteAlbum}
            onDeleteMerch={handleDeleteMerch}
            onDeletePromocode={handleDeletePromocode}
            onEditPromo={onEditPromo}
          />
        ))}
      </ul>
    </div>
  )
}