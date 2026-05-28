"use client";

import { TAlbum, TArtist, TMerch, TProduct } from "@/api/catalog/fetchCategory";
import { ProductCard } from "@/entities";
import { useEffect, useState } from "react";
import s from "./ProductsList.module.scss";
import { ProductsListProps, ProductsListResponse } from "./ProductsList.types";
import { ButtonUI } from "@/shared/ui/button";

const ProductsList = ({ products, link }: ProductsListProps) => {

  const [allProducts, setAllProducts] = useState<TProduct[] | []>([]);
  const [nextLink, setNextLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAllProducts(products);
    setNextLink(link);
    setError(null);
  }, [products, link]);

  const handleLoadMore = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error('Ошибка получения карточек каталога');

      const data: ProductsListResponse = await res.json();

      setAllProducts(prev => [...prev, ...data.results]);
      setNextLink(data.next);
      
    } catch (error) {
      setError('Не удалось загрузить данные');
      
    } finally {
      setIsLoading(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className={s.message}>Ничего не найдено</div>
    )
  } else {
    return (
      <div className={s.container}>
        <ul className={s.cardList}>
          {allProducts.map(product => {
            const isAlbum = 'cover_image' in product;
            const isMerch = 'main_image' in product;
            const isArtist = 'city' in product;

            if (isAlbum) {
              return (
                <li key={(product as TAlbum).id}>
                  <ProductCard 
                    image={(product as TAlbum).cover_image} 
                    title={(product as TAlbum).name} 
                    description={(product as TAlbum).description} 
                    price={(product as TAlbum).price ?? undefined}
                  />
                </li>
              )
            } else if (isMerch) {
              return (
                <li key={(product as TMerch).id}>
                  <ProductCard 
                    image={(product as TMerch).main_image} 
                    title={(product as TMerch).name} 
                    description={(product as TMerch).description} 
                    price={(product as TMerch).price}
                  />
                </li>
              )
            } else if (isArtist) {
              return (
                // TODO: заменить slug на id (когда на бэке изменят)
                <li key={(product as TArtist).slug}>
                  <ProductCard 
                    image={(product as TArtist).cover} 
                    title={(product as TArtist).name} 
                    description={'Артист'}
                  />
                </li>
              )
            }
          })}
        </ul>

        {error && (
          <div className={s.errorBlock}>
            <p className={s.message}>{error}</p>
            <ButtonUI
              variant="primary"
              className={s.retryButton}
              onClick={() => nextLink && handleLoadMore(nextLink)}
            >
              Повторить запрос
            </ButtonUI>
          </div>
        )}

        {nextLink && !error && (
          <button 
            className={s.button} 
            onClick={() => handleLoadMore(nextLink)}
            disabled={isLoading}
          >
            {isLoading ? 'загрузка...' : 'смотреть ещё'}
          </button>
        )}
      </div>
    )
  }
};

export default ProductsList;