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
      
    } else if (!selected && kind === 'release') {
      const release = card as TDetailRelease;
      productName = `${release.is_single ? 'Сингл' : 'Альбом'} "${release.variants[0].name}"`;
      productDescription = release.variants[0].description;
      productImage = release.variants[0].images[0].image;

    } else if (kind === 'merch') {
      const merch = card as TDetailMerch;
      productName = `${merch.kind} "${merch.name}"`;
      productDescription = merch.description
      productImage = merch.images[0].image
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

  const { id } = await params;
  const { kind, selected } = await searchParams;

  const card = await getCardById(kind, id);

  return (
    <Suspense fallback={<div className={s.message}>Загрузка...</div>}>
      <DetailPage card={card} kind={kind} selected={selected}/>
    </Suspense>
  )
};

export default Detail;