"use client";

import { Suspense, useState } from "react";

import { getCatalogList } from "@/api/catalog/catalogListApi/getCatalogList";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { MerchDescription, type TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";

import { ButtonLike } from "@/features/ButtonLike";
import { AddToCartModal, type TDataForModal } from "@/features/addToCartModal";

import { ProductCard } from "@/entities/ProductCard";
import { useUserStore } from "@/entities/user/store/useUserStore";

import { ListSection } from "@/shared/ui";

interface MerchPageContentProps {
  merch: TDetailMerch;
}

const MerchPageContent = ({ merch }: MerchPageContentProps) => {
  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataForModal, setDataForModl] = useState<TDataForModal | null>(null);

  const query = useQuery({
    queryKey: ["recom", "merch"],
    queryFn: () =>
      getCatalogList({
        type: "merch",
        ordering: "random",
        limit: "4",
      }),
    refetchOnWindowFocus: false,
  });

  const recomendations = query.data?.results;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpenAddtoCartModal = (data: TDataForModal) => {
    if (!isAuthorized) {
      const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;
      router.push(`/signin?next=${encodeURIComponent(currentUrl)}`);
    } else {
      setDataForModl(data);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <MerchDescription product={merch} onClick={handleOpenAddtoCartModal} />
      <Suspense fallback={<div>Загрузка рекомендаций...</div>}>
        {recomendations && (
          <ListSection title='Вам также может понравиться' link={`/catalog/merch`}>
            {recomendations.map((item) => {
              const url = item.target.url;
              const match = url.match(/(\d+)\/$/);
              const id = match ? match[1] : null;
              const selected =
                item.target.selected_variant_id !== null
                  ? item.target.selected_variant_id
                  : undefined;
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
                />
              );
            })}
          </ListSection>
        )}
      </Suspense>

      {dataForModal && (
        <AddToCartModal isOpen={isModalOpen} data={dataForModal} onClose={handleClose} />
      )}
    </>
  );
};

export default MerchPageContent;
