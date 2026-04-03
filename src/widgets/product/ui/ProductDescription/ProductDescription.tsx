import { Text, Title } from "@/shared/ui/Typography/Typography";
import Gallery from "../components/Gallery/Gallery";
import { ProductDescriptionProps } from "./ProductDescription.type";
import TabBar from "../components/TabBar/TabBar";
import s from "./ProductDescription.module.scss";
import SizeRange from "../components/SizeRange/SizeRange";
import { ButtonUI } from "@/shared/ui/button";

const ProductDescription = ({ variant, product }: ProductDescriptionProps) => {

  const tabsData = [
    {
      title: 'Описание',
      description: product.description
    },
    {
      title: 'Доставка',
      description: product.delivery
    },
    {
      title: 'Возврат',
      description: product.refund
    }
  ];

  const selecSize = (size: string) => {
    console.log('size:', size)
  };

  return (
    <div className={s.container}>

      <Gallery images={product.images} />

      <div className={s.card}>
        <div className={s.card__artist}>
          <div className={s.card__artist__img}>
            <img src={product.artistImage} alt={product.artistName} />
          </div>
          <Title Tag="h4" className={s.card__artist__name}>{product.artistName}</Title>
        </div>
        <Title Tag="h3" className={s.card__title}>{product.name}</Title>
        {variant === 'merch' && (
          <>
            <Text Tag="p" className={s.card__itemNumber}>Артикул: {product.itemNumber}</Text>
            <Text Tag="p" className={s.card__price}>{product.price} ₽</Text>
            {product.sizes && product.sizes.length > 0 && <SizeRange sizes={product.sizes} onClick={selecSize}/>}
            <ButtonUI variant="primary" size="standart" className={s.card__button}>В корзину</ButtonUI>
          </>
        )}
        <div className={s.card__tabBar}>
          <TabBar data={tabsData} />
        </div>
      </div>

    </div>
  )
};

export default ProductDescription;