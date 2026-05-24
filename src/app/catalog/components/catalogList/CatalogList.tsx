import { Link } from "@/shared/ui/Link/Link";
import s from "./CatalogList.module.scss";
import { CatalogListProps } from "./CatalogList.types";
import { ProductCard } from "@/entities";
import { fetchProductsByCategory } from "@/api/catalog/fetchCategory";

// возможно передавать сюда еще contentType для определения того, какие карточки отображать (у артиста карточка отличается)

const CatalogList = async ({ category }: CatalogListProps) => {

  try {
    const data = await fetchProductsByCategory(category, 20 )

    const products = data.results

    return (
      <div className={s.container}>
        <ul className={s.cardList}>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard 
                image={product.image} 
                title={product.title} 
                description={product.description} 
                price={product.price}
              />
            </li>
          ))}
        </ul>
        <Link className={s.header__link} href={''}>смотреть ещё</Link>
      </div>
    )
  } catch (error) {
    console.log('Ошибка получения продуктов категории:', error)
    return (
      <div>{`Не удалось получить продукты в категории ${category}`}</div>
    )
  }
};

export default CatalogList;