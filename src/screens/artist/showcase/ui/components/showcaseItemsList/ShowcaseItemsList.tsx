"use client";

import { useSession } from "next-auth/react";
import s from "./showcaseItemsList.module.scss";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedStoreResponse } from "@/api/store/types";
import { getShowcasePromocodes, type TShowcasePromocodes } from "@/entities/Artist";
import { Title } from "@/shared/ui";

type TItem = "product" | "promo";

interface ShowcaseItemsListProps {
  itemType?: TItem
}

export const ShowcaseItemsList = ({ itemType = 'product' }: ShowcaseItemsListProps) => {
  // не передаю сюда, а здесь беру из стора одновременно и товары и промокоды, 
  // передаю только тип, который сейчас нужно отображать

  return (
    <div className={s.content}>
      <Title Tag='h4' className={s.title}>
        {itemType === 'product' ? 'Товары' : 'Промокоды'}
      </Title>
    </div>
  )
}