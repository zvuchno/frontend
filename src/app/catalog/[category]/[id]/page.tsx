import { Suspense } from "react";

import { CardNotFoundError, getCardById } from "@/api/catalog/cardByIdApi/getCardById";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { DetailPage } from "@/screens/catalog/product";

import { type TDetalArtist } from "@/widgets/ArtistDetailCard";
import { type TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";
import { type TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";

import s from "./page.module.scss";

function hasDescription(value?: string) {
  return Boolean(value?.trim() && value.trim().toLowerCase() !== "description");
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; category: "release" | "merch" | "artists" }>;
  searchParams: Promise<{ selected?: string }>;
}): Promise<Metadata> {
  const appName = "ЗВУЧНО";

  try {
    const { id, category } = await params;
    const { selected } = await searchParams;
    const card = await getCardById(category, id);

    let productName: string = 'Музыкальный товар магазина "Звучно';
    let productDescription: string =
      "Приобретайте музыкальные релизы и мерч напрямую у любимых артистов";
    let productImage: string = "";
    let productArtist: string = "";
    let productOptions: string = "";

    if (selected && category === "release") {
      const release = card as TDetailRelease;
      const index = release.variants.findIndex(
        (variant) => variant.variant_id === Number(selected)
      );

      if (index !== -1)
        productName =
          release.variants[index].property_value === "Диджитал"
            ? release.is_single
              ? `Сингл "${release.variants[index].name}"`
              : `Альбом "${release.variants[index].name}"`
            : `${release.variants[index].property_value} "${release.variants[index].name}"`;

      productDescription = `${release.variants
        .map((variant) =>
          `${variant.property_value}: цена - ${variant.price}${variant.stock ? ", в наличии" : ""}`.trim()
        )
        .filter(Boolean)
        .join(". ")}`;
      productImage = release.variants[index].images[0].image;
      productArtist = release.artist_name;
    } else if (!selected && category === "release") {
      const release = card as TDetailRelease;
      productName = `${release.is_single ? "Сингл" : "Альбом"} "${release.variants[0].name}"`;
      productDescription = `${release.variants
        .map((variant) =>
          `${variant.property_value}: цена - ${variant.price}${variant.stock ? ", в наличии" : ""}`.trim()
        )
        .filter(Boolean)
        .join(". ")}`;
      productImage = release.variants[0].images[0].image;
      productArtist = release.artist_name;
    } else if (category === "merch") {
      const merch = card as TDetailMerch;

      productOptions = [
        ...new Set(merch.variants.map((variant) => variant.property_value.trim()).filter(Boolean)),
      ].join(", ");

      productName = `${merch.kind} "${merch.name}"`;
      productDescription = `${merch.property_name && `${merch.property_name}: ${productOptions}. `}${merch.stock && "В наличии"}. Цена: ${merch.price}.`;
      productImage = merch.images[0].image;
      productArtist = merch.artist_name;
    }

    const name =
      category === "artists"
        ? `${(card as TDetalArtist).name} | ${appName}`
        : `${productName} - ${productArtist} | Купить на ${appName}`;

    const description =
      category === "artists" && hasDescription((card as TDetalArtist).description)
        ? (card as TDetalArtist).description
        : productDescription;

    const image = category === "artists" ? (card as TDetalArtist).cover || "" : productImage;
    return {
      title: name,
      description: description,
      keywords: [
        productArtist,
        productName,
        category === "merch"
          ? "купить мерч"
          : category === "release"
            ? "купить музыку"
            : "музыкант",
      ],
      alternates: {
        canonical: `${new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000")}catalog/${category}/${category === "artists" ? (card as TDetalArtist).slug : category === "release" ? (card as TDetailRelease).id : (card as TDetailMerch).id}`,
      },
      openGraph: {
        title: name,
        description: description,
        images: [{ url: image, alt: name, width: 1200, height: 630 }],
        url: `${new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000")}catalog/${category}/${category === "artists" ? (card as TDetalArtist).slug : category === "release" ? (card as TDetailRelease).id : (card as TDetailMerch).id}`,
        type:
          category === "artists" || category === "merch"
            ? "article"
            : (card as TDetailRelease).is_single
              ? "music.song"
              : "music.album",
      },
    };
  } catch (error) {
    const { category } = await params;

    if (error instanceof CardNotFoundError) {
      const title = `${category === "artists" ? "Артист" : "Товар"} не найден`;
      return {
        title,
        description: `Запрашиваемый ${category === "artists" ? "артист" : "товар"} не найден`,
      };
    }

    return {
      title: `${category === "artists" ? 'Артист маркетплейса "Звучно"' : 'Музыкальный товар маркетплейса "Звучно"'}`,
      description: "Приобретайте музыкальные товары любимых артистов",
    };
  }
}

async function Detail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; category: "release" | "merch" | "artists" }>;
  searchParams: Promise<{ selected?: string }>;
}) {
  const { id, category } = await params;
  const { selected } = await searchParams;
  let card: Awaited<ReturnType<typeof getCardById>>;
  try {
    card = await getCardById(category, id);
  } catch (error) {
    if (error instanceof CardNotFoundError) notFound();
    throw error;
  }

  return (
    <Suspense fallback={<div className={s.message}>Загрузка...</div>}>
      <DetailPage card={card} kind={category} selected={selected} />
    </Suspense>
  );
}

export default Detail;
