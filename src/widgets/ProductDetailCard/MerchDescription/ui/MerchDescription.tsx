"use client"

import { useState } from "react";
import { MerchDescriptionProps } from "../model/MerchDescription.types";
import s from "./MerchDescription.module.scss";
import { AccentContainer, ButtonUI, Text, Title } from "@/shared/ui";
import Gallery from "../../components/Gallery/Gallery";
import VariantRange from "../../components/VariantRange/VariantRange";
import TabBar from "../../components/TabBar/TabBar";

// Компонент отображает карточку обычного мерча, не относящегося к носителям

export const MerchDescription = ({ product }: MerchDescriptionProps) => {

  const [sku, setSku] = useState<string>(product.variants[0].sku);

  const tabsData = [
    {
      title: 'Описание',
      description: product.description
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

  const selectVariant = (variant: string, sku: string) => {
    setSku(sku);
  };

  return (
    <AccentContainer className={s.containerWrapper}>
      <div className={s.container}>

        <Gallery images={product.images} />

        <div className={s.card}>
          <div className={s.card__artist}>
            <div className={s.card__artist__img}>
              <img src={product.artist_image} alt={product.artist_name} />
            </div>
            <Title Tag="h4" className={s.card__artist__name}>{product.artist_name}</Title>
          </div>

          <Title Tag="h3" className={s.card__title}>
            {product.kind} "{product.name}"
          </Title>

          <Text Tag="p" className={s.card__itemNumber}>
            Артикул: {sku}
          </Text>

          <Text Tag="p" className={s.card__price}>{product.price} ₽</Text>

          {product.stock !== null && product.property_name && (
            <VariantRange type={product.property_name} variants={product.variants} onClick={selectVariant}/>
          )}

          { product.stock !== null ? (
            <ButtonUI variant="primary" size="standart" className={s.card__button}>В корзину</ButtonUI>
          ) : <span style={{fontSize: '24px', textAlign: 'center'}}>Нет в наличии</span>}

          <div className={s.card__tabBar}>
            <TabBar data={tabsData} />
          </div>
        </div>

      </div>
    </AccentContainer>
  )
};