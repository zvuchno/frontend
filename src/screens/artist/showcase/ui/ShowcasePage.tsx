"use client"

import { RoleSelectBlock } from "@/features/auth";
import s from "./ShowcasePage.module.scss";
import { Loader, RoleCard } from "@/shared/ui";
import { useSession } from "next-auth/react";
import { useAlbumsInfiniteQuery, useMerchInfiniteQuery, usePromocodesInfiniteQuery } from "@/entities/Artist";
import { useShowcaseArtist } from "@/entities/Artist/store/useShowcaseStore";
import { useMemo, useState } from "react";
import { ShowcaseActions } from "./components/showcaseActions/ShowcaseActions";

//type TItem = "products" | "album" | "merch" | "promo";

export const ShowcasePage = () => {
  // получаем товары , если есть товары, то рендерим ShowcaseContent, если нет, то выбор загрузки
  // здесь же получаем промокоды (хуки)
  // сохраняю в стор для ShowcaseItemsList

  const { status } = useSession();
  const [itemType, setItemType] = useState<string>("products")

  const currentArtistSlug = useShowcaseArtist();

  if (!currentArtistSlug || status === 'loading') {
    return (
      <Loader />
    );
  }

  const albumsQuery = useAlbumsInfiniteQuery({
    artistSlug: currentArtistSlug
  });

  const merchQuery = useMerchInfiniteQuery({
    artistSlug: currentArtistSlug
  });

  const promoQuery = usePromocodesInfiniteQuery();

  const promocodes = promoQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const albums = albumsQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const merch = merchQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const allProducts = [...albums, ...merch];

  const currentItems = useMemo(() => {
    switch (itemType) {
      case 'products': return allProducts;
      case 'album': return albums;
      case 'merch': return merch;
      case 'promo': return promocodes;
      default: return allProducts;
    }
  }, [itemType, allProducts, albums, merch, promocodes]);

  if (allProducts.length === 0) {
    return (
      <RoleSelectBlock>
        <RoleCard path='/upload/single' image={"/images/cassette.png"} title='Загрузить сингл' />
        <RoleCard path='/upload/album' image={"/images/record.png"} title='Загрузить альбом' />
        <RoleCard path='/upload/merch' image={"/images/shirt.png"} title='Загрузить мерч' />
      </RoleSelectBlock>
    )
  }
  
  return (
    <div className={s.container}>
      {currentItems.length > 0 ? (
        <ShowcaseActions 
          selectItemType={setItemType}
          sortBytype={setItemType}
          sortByAvailability={() => undefined}
          addProduct={() => undefined}
          addPromo={() => undefined}
        />
      ) : (
        <div className={s.message}>
          Ничего не найдено 
        </div>
      )}
    </div>
  )
}