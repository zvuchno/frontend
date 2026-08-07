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
import { AddPromocodeModal } from "./components/addPromocodeModal/AddPromocodeModal";

export const ShowcasePage = () => {
  const { data, status } = useSession();
  const profileType = data?.user.profileType;

  //const profileType = 'artist';

  const [isPromoModalOpen, setIsPromoModalOpen] = useState<boolean>(false);
  const [promoIdForModal, setPromoIdForModal] = useState<number | undefined>(undefined);

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

  const emptyText = itemType === "promo" ? "нет промокодов" : "нет нет товаров";

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

  const handleEditPromo = (id: number) => {
    setPromoIdForModal(id);
    setIsPromoModalOpen(true);
  };

  if (!currentArtistSlug || status === "loading" || isLoadingData) {
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
        filterByStock={(value: "true" | "false" | "none") => {
          if (value === "true") setInStockFilter(true);
          else if (value === "false") setInStockFilter(false);
          else setInStockFilter(null);
        }}
        filterByAvailability={(value: "true" | "false" | "none") => {
          if (value === "true") setAvailableFilter(true);
          else if (value === "false") setAvailableFilter(false);
          else setAvailableFilter(null);
        }}
        filterByPromoType={(value: PromoTypeFilter) => {
          setTypePromoFilter(value);
        }}
        addPromo={() => setIsPromoModalOpen(true)}
      />
      {currentItems.length > 0 ? (
        <ShowcaseItemsList 
          itemType={itemType}
          items={currentItems}
          profileType={profileType}
          onEditPromo={handleEditPromo}
        />
      ) : (
        <div>{emptyText}</div>
      )}

      <AddPromocodeModal 
        isOpen={isPromoModalOpen} 
        onClose={() => {
          setIsPromoModalOpen(false)
          setPromoIdForModal(undefined);
        }}
        id={promoIdForModal}
      />
    </div>
  );
};
