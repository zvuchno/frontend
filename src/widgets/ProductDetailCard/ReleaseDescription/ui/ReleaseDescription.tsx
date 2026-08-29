"use client";

import { useEffect, useState } from "react";

import { AccentContainerWithPlayer } from "@/widgets/AccentContainerWithPlayer";

import { type TDataForModal } from "@/features/addToCartModal";

import { ButtonUI, Text, Title } from "@/shared/ui";

import Gallery from "../../components/Gallery/Gallery";
import TabBar from "../../components/TabBar/TabBar";
import VariantRange from "../../components/VariantRange/VariantRange";
import {
  type ReleaseDescriptionProps,
  type TReleaseVariant,
} from "../model/ReleaseDescription.types";
import s from "./ReleaseDescription.module.scss";
import { useRouter } from "next/navigation";

// Компонент отображает карточку релиза и носителей. Вариант носителя "Диджитал" отображает информацию самого релиза
export const ReleaseDescription = ({
  release,
  selected_variant_id,
  onClick,
}: ReleaseDescriptionProps) => {
  const [product, setProduct] = useState<TReleaseVariant>(release.variants[0]);
  const router = useRouter();

  useEffect(() => {
    if (!selected_variant_id) {
      return;
    } else {
      const index = release.variants.findIndex(
        (variant) => variant.variant_id === Number(selected_variant_id)
      );
      if (index !== -1) setProduct(release.variants[index]);
    }
  }, [selected_variant_id, release.variants]);

  const tabsData = [
    {
      title: "Описание",
      description: product?.description || "Описание товара",
    },
    {
      title: "Доставка",
      description: "Доставка",
    },
    {
      title: "Возврат",
      description: "Возврат",
    },
  ];

  const selectVariant = (_value: string, _sku: string, id: number) => {
    const index = release.variants.findIndex((variant) => variant.variant_id === id);
    if (index !== -1) setProduct(release.variants[index]);
  };

  const imagesForGallery = [...product.images].sort((a, b) => {
    if (a.is_main === b.is_main) return 0;
    return a.is_main ? -1 : 1;
  });

  const handleAddToCart = () => {
    const data: TDataForModal = {
      product_variant: product.variant_id,
      type: product.property_value,
      name: product.name,
      image: imagesForGallery.length > 0 ? imagesForGallery[0].image : null,
      price: product.price.toString(),
      allow_overpay: product.allow_overpay,
      is_single: release.is_single,
    };
    onClick(data);
  };

  const handleArtistClick = () => {
    router.push(`/catalog/artists/${release.artist_slug}/?kind=artists`)
  };

  return (
    <AccentContainerWithPlayer className={s.containerWrapper}>
      <div className={s.container}>
        <Gallery images={imagesForGallery} />

        <div className={s.card}>
          <div className={s.card__artist} onClick={handleArtistClick}>
            <div className={s.card__artist__img}>
              <img src={release.artist_image} alt={release.artist_name} />
            </div>
            <Title Tag='h4' className={s.card__artist__name}>
              {release.artist_name}
            </Title>
          </div>

          <Title Tag='h3' className={s.card__title}>
            {product?.property_value === "Диджитал"
              ? release.is_single
                ? `Сингл "${product.name}"`
                : `Альбом "${product.name}"`
              : `${product.property_value} "${product?.name}"`}
          </Title>

          <Text Tag='p' className={s.card__itemNumber}>
            Артикул: {product?.sku}
          </Text>
          <Text Tag='p' className={s.card__price}>
            {product?.price} ₽
          </Text>

          <VariantRange
            type='Носители'
            selectadVariant={product.property_value}
            variants={release.variants}
            onClick={selectVariant}
          />

          {(product?.stock !== null && product?.stock > 0) ||
          product?.property_value === "Диджитал" ? (
            <ButtonUI
              variant='primary'
              size='standart'
              className={s.card__button}
              onClick={handleAddToCart}
            >
              В корзину
            </ButtonUI>
          ) : (
            <span style={{ fontSize: "24px", textAlign: "center" }}>Нет в наличии</span>
          )}

          <div className={s.card__tabBar}>
            <TabBar data={tabsData} />
          </div>
        </div>
      </div>
    </AccentContainerWithPlayer>
  );
};
