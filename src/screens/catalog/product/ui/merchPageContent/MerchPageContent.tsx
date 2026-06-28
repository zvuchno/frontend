"use client";

import { useState } from "react";

import { MerchDescription, type TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";
import { RecomendationsList } from "@/widgets/RecomendationsList";

import { AddToCartModal, type TDataForModal } from "@/features/addToCartModal";

interface MerchPageContentProps {
  merch: TDetailMerch;
}

const MerchPageContent = ({ merch }: MerchPageContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataForModal, setDataForModl] = useState<TDataForModal | null>(null);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpenAddtoCartModal = (data: TDataForModal) => {
    setDataForModl(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <MerchDescription product={merch} onClick={handleOpenAddtoCartModal} />

      <RecomendationsList />

      {dataForModal && (
        <AddToCartModal isOpen={isModalOpen} data={dataForModal} onClose={handleClose} />
      )}
    </>
  );
};

export default MerchPageContent;
