"use client";

import { useMemo, useState } from "react";

import { useSession } from "next-auth/react";

import {
  type TShowcaseItem,
  useAlbumsInfiniteQuery,
  useMerchInfiniteQuery,
  usePromocodesInfiniteQuery,
} from "@/entities/Artist";
import { useShowcaseArtistSlug } from "@/entities/Artist/store/useShowcaseStore";
import { useGetManagedProfiles } from "@/entities/Label";
import { RoleSelectBlock } from "@/entities/RoleSelectBlock";

import { Loader, RoleCard } from "@/shared/ui";

import s from "./ShowcasePage.module.scss";
import { ShowcaseActions } from "./components/showcaseActions/ShowcaseActions";
import { ShowcaseItemsList } from "./components/showcaseItemsList/ShowcaseItemsList";
import { AddPromocodeModal } from "@/features/addPromocodeModal";

export const ShowcasePage = () => {
  const { data, status } = useSession();
  const profileType = data?.user.profileType;

  const [isPromoModalOpen, setIsPromoModalOpen] = useState<boolean>(false);
  const [promoIdForModal, setPromoIdForModal] = useState<number | undefined>(undefined);

  // состояние для типа карточек отображемых на странице (релизы, мерч, промокоды)
  const [itemType, setItemType] = useState<TShowcaseItem>("release");
  // состояние для фильтрации по артисту
  const [artistFilter, setArtistFilter] = useState<string>("");

  const currentArtistSlug = useShowcaseArtistSlug();

  const managedProfilesQuery = useGetManagedProfiles(profileType);

  const artistsOptions = useMemo(() => {
    if (!managedProfilesQuery.data) return [];
    return managedProfilesQuery.data.map((artist) => ({
      value: String(artist.id),
      label: artist.name,
    }));
  }, [managedProfilesQuery.data]);

  const albumsQuery = useAlbumsInfiniteQuery({
    artistSlug: currentArtistSlug,
    artist_id: artistFilter,
    itemType,
  });

  const merchQuery = useMerchInfiniteQuery({
    artistSlug: currentArtistSlug,
    //in_stock: inStockFilter,
    artist_id: artistFilter,
    itemType,
  });

  const promoQuery = usePromocodesInfiniteQuery({
    //discount_type: typePromoFilter,
    //is_available: availableFilter,
    artist_id: artistFilter,
    itemType,
  });

  const promocodes = promoQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const albums = albumsQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const merch = merchQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const allProducts = [...albums, ...merch];

  const releaseCount = albumsQuery.data?.pages[0].count ?? 0;
  const merchCount = merchQuery.data?.pages[0].count ?? 0;
  const promoCount = promoQuery.data?.pages[0].count ?? 0;

  const isLoadingData =
    albumsQuery.isLoading ||
    merchQuery.isLoading ||
    promoQuery.isLoading ||
    managedProfilesQuery.isLoading;

  const error = albumsQuery.error || merchQuery.error || promoQuery.error;

  const emptyText = 
    itemType === "promo" 
      ? "нет промокодов" 
      : itemType === "release" 
        ? "нет музыки"
        : "нет мерча"

  const currentItems =
    itemType === "release"
      ? albums
      : itemType === "merch"
        ? merch
        : itemType === "promo"
          ? promocodes
          : [];

  const hasMore = 
    itemType === "release" && albumsQuery.hasNextPage
      ? true
      : itemType === "merch" && merchQuery.hasNextPage
        ? true
        : itemType === "promo" && promoQuery.hasNextPage
          ? true
          : false;

  const loadMore = async () => {
    if (itemType === "promo") {
      await promoQuery.fetchNextPage();
    } else if (itemType === "release") {
      await albumsQuery.fetchNextPage()
      // // Подгружаем и альбомы, и мерч одновременно
      // await Promise.all([albumsQuery.fetchNextPage(), merchQuery.fetchNextPage()]);
    } else {
      await merchQuery.fetchNextPage()
    }
  };

  const isLoadingMoreData = 
    itemType === "release" && albumsQuery.isFetchingNextPage
      ? true
      : itemType === "merch" && merchQuery.isFetchingNextPage
        ? true
        : itemType === "promo" && promoQuery.isFetchingNextPage
          ? true
          : false;

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
          path='/artist/showcase/upload/album'
          image={"/images/cassette.png"}
          title='Загрузить релиз'
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
        artistOptions={artistsOptions}
        onChangeArtist={setArtistFilter}
        selectItemType={setItemType}
        releaseCount={releaseCount.toString()}
        merchCount={merchCount.toString()}
        promoCount={promoCount.toString()}
        addPromo={() => setIsPromoModalOpen(true)}
      />
      {currentItems.length > 0 ? (
        <ShowcaseItemsList
          itemType={itemType}
          items={currentItems}
          profileType={profileType}
          onEditPromo={handleEditPromo}
          hasMoreData={hasMore}
          onLoadMore={loadMore}
          isLoadingMore={isLoadingMoreData}
        />
      ) : (
        <div>{emptyText}</div>
      )}

      <AddPromocodeModal
        isOpen={isPromoModalOpen}
        profileType={profileType}
        onClose={() => {
          setIsPromoModalOpen(false);
          setPromoIdForModal(undefined);
          if (itemType !== "promo") setItemType("promo");
        }}
        id={promoIdForModal}
      />
    </div>
  );
};
