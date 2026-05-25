import { Link } from "@/shared/ui/Link/Link";
import s from "./CatalogList.module.scss";
import { CatalogListProps } from "./CatalogList.types";
import { ProductCard } from "@/entities";
import { fetchProductsByCategory, TAlbum, TArtist, TMerch } from "@/api/catalog/fetchCategory";

const CatalogList = async ({ category, filter }: CatalogListProps) => {

  try {
    const data = await fetchProductsByCategory(category, {limit: 10, filter: filter} );

    const products = data.results;

    return (
      <div className={s.container}>
        <ul className={s.cardList}>
          {products.map(product => {
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
                <li key={(product as TArtist).name}>
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
        <Link className={s.header__link} href={''}>смотреть ещё</Link>
      </div>
    )
  } catch (error) {
    console.log('Ошибка получения продуктов категории:', error)
    return (
      <div>{`Не удалось загрузить продукты в категории ${category}`}</div>
    )
  }
};

export default CatalogList;