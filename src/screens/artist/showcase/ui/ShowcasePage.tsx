"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import {
  type PromoTypeFilter,
  type StockFilter,
  type TShowcaseItem,
  useAlbumsInfiniteQuery,
  useMerchInfiniteQuery,
  usePromocodesInfiniteQuery,
} from "@/entities/Artist";
import { useShowcaseArtistSlug } from "@/entities/Artist/store/useShowcaseStore";
import { RoleSelectBlock } from "@/entities/RoleSelectBlock";

import { Loader, RoleCard } from "@/shared/ui";

import s from "./ShowcasePage.module.scss";
import { ShowcaseActions } from "./components/showcaseActions/ShowcaseActions";
import { ShowcaseItemsList } from "./components/showcaseItemsList/ShowcaseItemsList";

export const ShowcasePage = () => {
  const { status } = useSession();

  // состояние для типа карточек отображемых на странице (промокоды или товары (все товары, альбомы, мерч))
  const [itemType, setItemType] = useState<TShowcaseItem>("products");
  // состояние для фильтрации мерча по наличию
  const [inStockFilter, setInStockFilter] = useState<StockFilter>(null);
  // состояние для фильтрации промокодов по доступности к использованию
  const [availableFilter, setAvailableFilter] = useState<StockFilter>(null);
  // состояние для фильтрации промокодов по типу скидки
  const [typePromoFilter, setTypePromoFilter] = useState<PromoTypeFilter>("ALL");

  const currentArtistSlug = useShowcaseArtistSlug();

  const albumsQuery = useAlbumsInfiniteQuery({
    artistSlug: currentArtistSlug,
  });

  const merchQuery = useMerchInfiniteQuery({
    artistSlug: currentArtistSlug,
    in_stock: inStockFilter,
  });

  const promoQuery = usePromocodesInfiniteQuery({
    discount_type: typePromoFilter,
    is_available: availableFilter,
  });

  const promocodes = promoQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const albums = albumsQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const merch = merchQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const allProducts = [...albums, ...merch];

  const isLoadingData = albumsQuery.isLoading || merchQuery.isLoading || promoQuery.isLoading;
  const error = albumsQuery.error || merchQuery.error || promoQuery.error;

  const emptyText = itemType === "album" || itemType === "merch" ? "нет товаров" : "нет промокодов";

  console.log("merch:", merch);

  const currentItems =
    itemType === "products"
      ? allProducts
      : itemType === "album"
        ? albums
        : itemType === "merch"
          ? merch
          : itemType === "promo"
            ? promocodes
            : allProducts;

  if (!currentArtistSlug || status === "loading") {
    return <Loader />;
  }

  if (isLoadingData) {
    return <Loader />;
  }

  if (error) {
    return <div>{`Ошибка загрузки данных: ${error.message}`}</div>;
  }

  if (allProducts.length === 0) {
    return (
      <RoleSelectBlock>
        <RoleCard
          path='/artist/showcase/upload/single'
          image={"/images/cassette.png"}
          title='Загрузить сингл'
        />
        <RoleCard
          path='/artist/showcase/upload/album'
          image={"/images/record.png"}
          title='Загрузить альбом'
        />
        <RoleCard
          path='/artist/showcase/upload/merch'
          image={"/images/shirt.png"}
          title='Загрузить мерч'
        />
      </RoleSelectBlock>
    );
  }

  return (
    <div className={s.container}>
      <ShowcaseActions
        itemType={itemType}
        selectItemType={setItemType}
        filterByStock={(value: "true" | "false" | "") => {
          if (value === "true") setInStockFilter(true);
          else if (value === "false") setInStockFilter(false);
          else setInStockFilter(null);
        }}
        filterByAvailability={(value: "true" | "false" | "") => {
          if (value === "true") setAvailableFilter(true);
          else if (value === "false") setInStockFilter(false);
          else setInStockFilter(null);
        }}
        filterByPromoType={(value: PromoTypeFilter) => {
          setTypePromoFilter(value);
        }}
        addProduct={() => undefined}
        addPromo={() => undefined}
      />
      {currentItems.length > 0 ? (
        <ShowcaseItemsList itemType={itemType} items={currentItems} />
      ) : (
        <div>{emptyText}</div>
      )}
    </div>
  );
};
