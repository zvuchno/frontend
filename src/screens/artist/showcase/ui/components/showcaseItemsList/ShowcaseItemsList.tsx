"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";

import {
  ShowcaseCard,
  type TShowcaseAlbum,
  type TShowcaseItem,
  type TShowcaseMerch,
  type TShowcasePromocode,
  useDeleteAlbum,
  useDeleteMerch,
  useDeletePromocode,
  useUpdateAlbum,
  useUpdateMerch,
  useUpdatePromocode,
} from "@/entities/Artist";

import { Text, Title } from "@/shared/ui";

import s from "./showcaseItemsList.module.scss";

interface ShowcaseItemsListProps {
  itemType: TShowcaseItem;
  items: TShowcasePromocode[] | (TShowcaseAlbum | TShowcaseMerch)[];
  profileType: "artist" | "label" | undefined;
  hasMoreData: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => Promise<void>;
  onEditPromo: (id: number) => void;
}

export const ShowcaseItemsList = ({
  itemType,
  items,
  profileType,
  hasMoreData,
  onLoadMore,
  isLoadingMore,
  onEditPromo,
}: ShowcaseItemsListProps) => {
  const toggleAlbumMutation = useUpdateAlbum();
  const toggleMerchMutation = useUpdateMerch();
  const togglePromoMutation = useUpdatePromocode();

  const deleteAlbumMutation = useDeleteAlbum();
  const deleteMerchMutation = useDeleteMerch();
  const deletePromocodeMutation = useDeletePromocode();

  const [columnsCount, setColumnsCount] = useState<number>();

  const isProduct = itemType === "products" || itemType === "album" || itemType === "merch";
  const isPromo = itemType === "promo";

  const handleToggleAlbumVisibility = async (isChecked: boolean, id: number) => {
    await toggleAlbumMutation.mutateAsync({
      id,
      payload: { is_published: isChecked },
    });
  };

  const handleToggleMerchVisibility = async (isChecked: boolean, id: number) => {
    await toggleMerchMutation.mutateAsync({
      id,
      payload: { is_published: isChecked },
    });
  };

  const handleTogglePromoVisibility = async (isChecked: boolean, id: number) => {
    await togglePromoMutation.mutateAsync({
      id,
      payload: { is_enabled: isChecked },
    });
  };

  const handleDeleteAlbum = async (id: number) => {
    await deleteAlbumMutation.mutateAsync({ id });
  };

  const handleDeleteMerch = async (id: number) => {
    await deleteMerchMutation.mutateAsync({ id });
  };

  const handleDeletePromocode = async (id: number) => {
    await deletePromocodeMutation.mutateAsync({ id });
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      switch (true) {
        case width < 476:
          setColumnsCount(3);
          break;
        case width <= 768:
          setColumnsCount(4);
          break;

        case width <= 890:
          setColumnsCount(3);
          break;

        case width < 1025:
          setColumnsCount(4);
          break;

        default:
          setColumnsCount(7);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={s.content}>
      <Title Tag='h4' className={s.title}>
        {itemType === "promo" ? "Промокоды" : "Товары"}
      </Title>

      <div className={clsx(s.heading, { [s[`columns-${columnsCount}`]]: columnsCount })}>
        <Text className={clsx(s.heading__text)}>{isProduct ? "Фото" : "Промокод"}</Text>
        {profileType === "label" && <Text className={clsx(s.heading__text)}>Артист</Text>}
        <Text
          className={clsx(s.heading__text, {
            [s.heading__text_wide]: isProduct && profileType === "artist",
          })}
        >
          {isProduct ? "Наименование" : "Скидка"}
        </Text>
        <Text className={clsx(s.heading__text, { [s.heading__text_wide]: isPromo })}>
          {isProduct ? "Артикул" : "Период"}
        </Text>
        <Text className={s.heading__text}>{isProduct ? "Цена" : "Количество"}</Text>
        <Text
          className={clsx(s.heading__text, {
            [s.heading__text_rightAligned]: isPromo && profileType === "artist",
            [s.heading__text_leftAligned]: isPromo && profileType === "label",
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
            cardType={isProduct ? "product" : "promo"}
            onToggleAlbumVisibility={handleToggleAlbumVisibility}
            onToggleMerchVisibility={handleToggleMerchVisibility}
            onTogglePromoVisibility={handleTogglePromoVisibility}
            onDeleteAlbum={handleDeleteAlbum}
            onDeleteMerch={handleDeleteMerch}
            onDeletePromocode={handleDeletePromocode}
            onEditPromo={onEditPromo}
            columnsCount={columnsCount}
          />
        ))}
        {hasMoreData && (
          <div className={s.buttonWrapper}>
            <button
              type='button'
              className={s.button}
              onClick={() => {
                onLoadMore().catch(console.error);
              }}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? "загрузка..." : "смотреть ещё"}
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};
