"use client"

import { useState } from "react";
import { MerchDescriptionProps } from "../model/MerchDescription.types";
import s from "./MerchDescription.module.scss";
import { AccentContainer, ButtonUI, Text, Title } from "@/shared/ui";
import Gallery from "../../components/Gallery/Gallery";
import VariantRange from "../../components/VariantRange/VariantRange";
import TabBar from "../../components/TabBar/TabBar";
import { TDataForModal } from "@/features/addToCartModal";

// Компонент отображает карточку обычного мерча, не относящегося к носителям

export const MerchDescription = ({ product, onClick }: MerchDescriptionProps) => {

  const [sku, setSku] = useState<string>(product.variants[0].sku);
  const [selectedVariant, setSelectedVariant] = useState<number>(product.variants[0].variant_id)

  const tabsData = [
    {
      title: 'Описание',
      description: product.description ? product.description : 'У этого товара нет описания'
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

  const selectVariant = (_variant: string, sku: string, id: number) => {
    setSku(sku);
    setSelectedVariant(id);
  };

  const handleAddToCart = () => {
      
    const data: TDataForModal = {
      product_variant: selectedVariant,
      type: product.kind,
      name: product.name,
      image: product.images[0].image,
      price: product.price.toString(),
      allow_overpay: product.allow_overpay

    };

    onClick(data);
  };

  const imagesForGallery = [...product.images].sort((a, b) => {
    if (a.is_main === b.is_main) return 0;
    return a.is_main ? -1 : 1;
  });

  return (
    <AccentContainer className={s.containerWrapper}>
      <div className={s.container}>

        <Gallery images={imagesForGallery} />

        <div className={s.card}>
          <div className={s.card__artist}>
            <div className={s.card__artist__img}>
              <img src={product.artist_image} alt={product.artist_name} />
            </div>
            <Title Tag="h4" className={s.card__artist__name}>{product.artist_name}</Title>
          </div>

          <Title Tag="h3" className={s.card__title}>
            {`${product.kind} "${product.name}"`}
          </Title>

          <Text Tag="p" className={s.card__itemNumber}>
            Артикул: {sku}
          </Text>

          <Text Tag="p" className={s.card__price}>{product.price} ₽</Text>

          {product.stock !== null && product.property_name && (
            <VariantRange type={product.property_name} variants={product.variants} onClick={selectVariant}/>
          )}

          { product.stock !== null ? (
            <ButtonUI 
              variant="primary" 
              size="standart" 
              className={s.card__button} 
              onClick={handleAddToCart}
            >
              В корзину
            </ButtonUI>
          ) : <span style={{fontSize: '24px', textAlign: 'center'}}>Нет в наличии</span>}

          <div className={s.card__tabBar}>
            <TabBar data={tabsData} />
          </div>
        </div>

      </div>
    </AccentContainer>
  )
};