"use client"

import { useEffect, useState } from "react";
import { ReleaseDescriptionProps, TReleaseVariant } from "../model/ReleaseDescription.types";
import s from "./ReleaseDescription.module.scss";
import { AccentContainer, ButtonUI, Text, Title } from "@/shared/ui";
import Gallery from "../../components/Gallery/Gallery";
import VariantRange from "../../components/VariantRange/VariantRange";
import TabBar from "../../components/TabBar/TabBar";
import { TDataForModal } from "@/features/addToCartModal";

// Компонент отображает карточку релиза и носителей. Вариант носителя "Диджитал" отображает информацию самого релиза

export const ReleaseDescription = ({ release, selected_variant_id, onClick }: ReleaseDescriptionProps) => {

  const [product, setProduct] = useState<TReleaseVariant>(release.variants[0]);

  useEffect(() => {

    if (!selected_variant_id) {
      return;

    } else {
      const index = release.variants.findIndex(variant => variant.variant_id === Number(selected_variant_id));
      if (index !== -1) setProduct(release.variants[index]);
    }

  }, [selected_variant_id])

  const tabsData = [
    {
      title: 'Описание',
      description: product?.description || 'Описание товара'
    },
    {
      title: 'Доставка',
      description: 'Доставка'
    },
    {
      title: 'Возврат',
      description: 'Возврат'
    }
  ];

  const defaultImage = [
    {
      id: 1,
      image: '/images/recordPlayer.png',
      is_main: true
    }
  ]

  const selectVariant = (_value: string, _sku: string , id: number) => {

    const index = release.variants.findIndex(variant => variant.variant_id === id);
    if (index !== -1) setProduct(release.variants[index]);

  };

  const handleAddToCart = () => {
    
    const data: TDataForModal = {
      product_variant: product.variant_id,
      type: product.property_value,
      name: product.name,
      image: product.images[0].image,
      price: product.price.toString(),
      allow_overpay: product.allow_overpay,
      is_single: release.is_single

    }
    onClick(data);
  };

  return (
    <AccentContainer className={s.containerWrapper}>
      <div className={s.container}>

        <Gallery images={product?.images ?? defaultImage} />

        <div className={s.card}>

          <div className={s.card__artist}>
            <div className={s.card__artist__img}>
              <img src={release.artist_image} alt={release.artist_name} />
            </div>
            <Title Tag="h4" className={s.card__artist__name}>{release.artist_name}</Title>
          </div>

          <Title Tag="h3" className={s.card__title}>
            {product?.property_value === 'Диджитал' 
              ? release.is_single 
              ? `Сингл "${product.name}"` 
              : `Альбом "${product.name}"` 
              : `${product.property_value} "${product?.name}"`}
          </Title>

          <Text Tag="p" className={s.card__itemNumber}>
            Артикул: {product?.sku}
          </Text>
          <Text Tag="p" className={s.card__price}>{product?.price} ₽</Text>
          
          <VariantRange 
            type='Носители' 
            selectadVariant={product.property_value}
            variants={release.variants} 
            onClick={selectVariant}
          />

          {(product?.stock !== null || product?.property_value === 'Диджитал') ?  (
            <ButtonUI 
              variant="primary" 
              size="standart" 
              className={s.card__button} 
              onClick={handleAddToCart}
            >
              В корзину
            </ButtonUI>
          ) : <span style={{fontSize: '24px', textAlign: 'center'}}>Нет в наличии</span>
          }

          <div className={s.card__tabBar}>
            <TabBar data={tabsData} />
          </div>
        </div>

      </div>
    </AccentContainer>
  )
};