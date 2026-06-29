"use client";

import { Suspense } from "react";

import { getCatalogList } from "@/api/catalog/catalogListApi/getCatalogList";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { ButtonLike } from "@/features/ButtonLike";

import { ProductCard } from "@/entities/ProductCard";
import { useRecentlyViewed } from "@/entities/recentlyViewed";

import { ListSection } from "@/shared/ui";

export const RecomendationsList = () => {
  const { viewedProducts, addProduct } = useRecentlyViewed();

  const recentViewedToShow = viewedProducts && viewedProducts.slice(0, 4);
  const limitToShow = "4";

  const path = usePathname();
  const isCartPage = path.includes("/cart");

  const recomQuery = useQuery({
    queryKey: ["recom", "album", limitToShow],
    queryFn: () =>
      getCatalogList({
        type: "album",
        ordering: "random",
        limit: limitToShow,
      }),
    refetchOnWindowFocus: false,
  });

  const showRecentViewed = isCartPage && viewedProducts.length > 0;

  const recommendations = showRecentViewed ? recentViewedToShow : recomQuery.data?.results;
  const hasMoreRecommendations = showRecentViewed ? false : !!recomQuery.data?.next;
  console.log(viewedProducts);
  if (!recommendations) return;

  return (
    <Suspense fallback={<div>Загрузка рекомендаций...</div>}>
      <ListSection
        title={showRecentViewed ? "Вы смотрели" : "Вам также может понравиться"}
        link={viewedProducts ? "" : `/catalog/album`}
        hasMore={hasMoreRecommendations}
      >
        {recommendations.map((item) => {
          const url = item.target.url;
          const match = url.match(/(\d+)\/$/);
          const id = match ? match[1] : null;
          const selected =
            item.target.selected_variant_id !== null ? item.target.selected_variant_id : undefined;
          return (
            <ProductCard
              key={item.product_id}
              title={item.artist_name}
              description={
                item.year === null
                  ? `${item.kind} ${item.name}`
                  : `${item.kind} ${item.name} (${item.year.toString()})`
              }
              image={item.image}
              price={item.price}
              likeButton={<ButtonLike isLiked={item.is_favorite} />}
              link={`/catalog/album/${id}/?kind=${item.target.type}&selected=${selected}`}
              onHandleClick={() => addProduct(item)}
            />
          );
        })}
      </ListSection>
    </Suspense>
  );
};
