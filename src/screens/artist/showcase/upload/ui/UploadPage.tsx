"use client";

import { useSession } from "next-auth/react";

import {
  type TShowcaseAlbumDetail,
  type TShowcaseMerchDetail,
  useDetailInfo,
} from "@/entities/Artist";
import { useShowcaseArtistId } from "@/entities/Artist/store/useShowcaseStore";

import { Loader } from "@/shared/ui";

import { UploadReleaseContent } from "./components/uploadRelease/UploadRelease";
import { UploadMerchContent } from "./components/uploadMerch/UploadMerch";

interface UploadPageProps {
  productType: "release" | "merch"; // тип товара на форме
  id: string | undefined;
};

// Страница формы создания/редактирования товара
export const UploadPage = ({ productType, id }: UploadPageProps) => {
  const { data } = useSession();
  const profileType = data?.user.profileType;

  // id текущего артиста/лейбла
  const currentArtistId = useShowcaseArtistId();
  // id товара, который необходимо отредактировать
  const currentProductId = id ? Number(id) : undefined;

  // данные товра, получаемые, если перешли на эту страницу для редактирования
  const { data: productData, isLoading, error } = useDetailInfo(productType, currentProductId);

  if (isLoading) return <Loader />;
  if (error) return <div>{`Не удалось загрузить данные: ${error.message}`}</div>;

  return (
    <>
      {productType === "release" && (
        <UploadReleaseContent 
          currentArtistId={currentArtistId}
          product={productData as TShowcaseAlbumDetail}
          profileType={profileType}
        />
      )}

      {productType === "merch" && (
        <UploadMerchContent 
          currentArtistId={currentArtistId}
          product={productData as TShowcaseMerchDetail}
          profileType={profileType}
        />
      )}
    </>
  );
};
