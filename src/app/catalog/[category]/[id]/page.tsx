import { getCardById } from "@/api/catalog/cardByIdApi/getCardById";
import { DetailPage } from "@/screens/catalog/product";
import { Suspense } from "react";
import s from "./page.module.scss";
import { type Metadata } from "next";
import { type TDetalArtist } from "@/widgets/ArtistDetailCard";
import { type TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";
import { type TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ id: string, category: 'release' | 'merch' | 'artists'  }>,
  searchParams: Promise<{selected?: string}>
}): Promise<Metadata> {

  try {
    const { id, category } = await params;
    const { selected } = await searchParams;
    const card = await getCardById(category, id);

    let productName: string = 'Музыкальный товар магазина "Звучно';
    let productDescription: string = 'Приобретайте музыкальные товары любимых артистов';
    let productImage: string = '';

    if (selected && category === 'release') {
      const release = card as TDetailRelease;
      const index = release.variants.findIndex(variant => variant.variant_id === Number(selected));
      if (index !== -1) 
        productName = 
          release.variants[index].property_value === 'Диджитал'
            ? release.is_single
            ? `Сингл "${release.variants[index].name}"` 
            : `Альбом "${release.variants[index].name}"`
            : `${release.variants[index].property_value} "${release.variants[index].name}"`;

        productDescription = release.variants[index].description;
        productImage = release.variants[index].images[0].image;
      
    } else if (!selected && category === 'release') {
      const release = card as TDetailRelease;
      productName = `${release.is_single ? 'Сингл' : 'Альбом'} "${release.variants[0].name}"`;
      productDescription = release.variants[0].description;
      productImage = release.variants[0].images[0].image;

    } else if (category === 'merch') {
      const merch = card as TDetailMerch;
      productName = `${merch.kind} "${merch.name}"`;
      productDescription = merch.description
      productImage = merch.images[0].image
    }

    const name = category === 'artists' 
      ? (card as TDetalArtist).name 
      : productName;

    const description = category === 'artists' 
      ? (card as TDetalArtist).description
      : productDescription;

    const image = category === 'artists' 
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
    const { category } = await params;
    return {
      title: `${category === 'artists' ? 'Артист маркетплейса "Звучно"' : 'Музыкальный товар маркетплейса "Звучно"'}`,
      description: 'Приобретайте музыкальные товары любимых артистов'
    }
  }
};

async function Detail({ 
  params, 
  searchParams
}: {
  params: Promise<{ id: string, category: 'release' | 'merch' | 'artists' }>,
  searchParams: Promise<{selected?: string}>
}) {

  const { id, category } = await params;
  const { selected } = await searchParams;

  const card = await getCardById(category, id);

  return (
    <Suspense fallback={<div className={s.message}>Загрузка...</div>}>
      <DetailPage card={card} kind={category} selected={selected}/>
    </Suspense>
  )
};

export default Detail;