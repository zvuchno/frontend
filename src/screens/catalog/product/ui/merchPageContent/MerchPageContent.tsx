'use client';

import { MerchDescription, TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";
import s from "./MerchPageContent.module.scss";
import { ListSection } from "@/shared/ui";
import { getCatalogList } from "@/api/catalog/catalogListApi/getCatalogList";
import { Suspense } from "react";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";
import { useQuery } from "@tanstack/react-query";

interface MerchPageContentProps {
  merch: TDetailMerch;
}

const MerchPageContent = ({merch}: MerchPageContentProps) => {

  const query = useQuery({ 
    queryKey: ['recom', 'merch'], 
    queryFn: () => getCatalogList({
      type: 'merch',
      ordering: 'random',
      limit: 4
    }),
    refetchOnWindowFocus: false,
  });

  const recomendations = query.data?.results

  return (
    <div className={s.page}>
      <MerchDescription product={merch}/>
      <Suspense fallback={<div>Загрузка рекомендаций...</div>}>
        <ListSection title="Вам также может понравиться" link="">
          {recomendations && recomendations.map(item => (
            <ProductCard 
              key={item.product_id}
              title={item.artist_name}
              description={ item.year === null ? item.name : `${item.name} (${item.year.toString()})`}
              image={item.image}
              price={item.price}
              likeButton={<ButtonLike isLiked={item.is_favorite} />}
            />
          ))}
        </ListSection>
      </Suspense>
    </div>
  )
};

export default MerchPageContent;