import { getCardById } from "@/api/catalog/cardByIdApi/getCardById";
import { DetailPage } from "@/screens/catalog/product";
import { Suspense } from "react";
import s from "./page.module.scss";
import { type Metadata } from "next";
import { type TDetalArtist } from "@/widgets/ArtistDetailCard/model/ArtistDetailCard.types";
import { type TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";
import { type TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{kind: 'merch' | 'release' | 'artists', selected?: string}>
}): Promise<Metadata> {

  try {
    const { id } = await params;
    const { kind, selected } = await searchParams;
    const card = await getCardById(kind, id);

    let productName: string = 'Музыкальный товар магазина "Звучно';
    let productDescription: string = 'Приобретайте музыкальные товары любимых артистов';
    let productImage: string = '';

    if (selected && kind === 'release') {
      const index = (card as TDetailRelease).variants.findIndex(variant => variant.variant_id === Number(selected));
      if (index !== -1) 
        productName = 
          (card as TDetailRelease).variants[index].property_value === 'Диджитал'
            ? (card as TDetailRelease).is_single
            ? `Сингл "${(card as TDetailRelease).variants[index].name}"` 
            : `Альбом "${(card as TDetailRelease).variants[index].name}"`
            : `${(card as TDetailRelease).variants[index].property_value} "${(card as TDetailRelease).variants[index].name}"`;

        productDescription = `${(card as TDetailRelease).variants[index].description}`;
        productImage = `${(card as TDetailRelease).variants[index].images[0]}`;
      
    } else if (!selected && kind === 'release') {
      productName = `${(card as TDetailRelease).is_single ? 'Сингл' : 'Альбом'} "${(card as TDetailRelease).variants[0].name}"`;
      productDescription = `${(card as TDetailRelease).variants[0].description}"`;
      productImage = `${(card as TDetailRelease).variants[0].images[0]}"`;

    } else if (kind === 'merch') {
      productName = `${(card as TDetailMerch).kind} "${(card as TDetailMerch).name}"`;
      productDescription = `${(card as TDetailMerch).description}`
      productImage = `${(card as TDetailMerch).images[0].image}`
    }

    const name = kind === 'artists' 
      ? (card as TDetalArtist).name 
      : productName;

    const description = kind === 'artists' 
      ? (card as TDetalArtist).description
      : productDescription;

    const image = kind === 'artists' 
      ? (card as TDetalArtist).cover
      : productImage

    return {
      title: name,
      description: description,
      openGraph: {
        title: name,
        description: description,
        images: image ?? undefined

      },
    };
  } catch {
    const { kind } = await searchParams;
    return {
      title: `${kind === 'artists' ? 'Артист маркетплейса "Звучно"' : 'Музыкальный товар маркетплейса "Звучно"'}`,
      description: 'Приобретайте музыкальные товары любимых артистов'
    }
  }
};

async function Detail({ 
  params, 
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{kind: 'merch' | 'release' | 'artists', selected?: string}>
}) {

  try {
    const { id } = await params;
    const { kind, selected } = await searchParams;

    const card = await getCardById(kind, id);

    return (
      <Suspense fallback={<div className={s.message}>Загрузка...</div>}>
        <DetailPage card={card} kind={kind} selected={selected}/>
      </Suspense>
    )
  } catch {
    return (
      <div className={s.errorContainer}>
        <h2 className={s.errorContainer__title}>Произошла ошибка</h2>
        <p>Не удалось загрузить данные. Попробуйте обновить страницу.</p>
      </div>
    )
  }
};

export default Detail;