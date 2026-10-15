import { type TCatalogCard } from "@/api/catalog/catalogListApi/types";

import { ButtonLike } from "@/features/ButtonLike";

import { ProductCard } from "@/entities/ProductCard";
import { type CartItemRespond } from "@/entities/cart";

import { ListSection } from "@/shared/ui";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";

export const MerchSection = ({
  merch,
  //cartItems,
  isAuth,
  addProduct,
}: {
  merch: TCatalogCard[];
  cartItems?: CartItemRespond[];
  isAuth: boolean;
  addProduct: (product: TCatalogCard) => void;
}) => {
  return (
    <ListSection title='Мерч' link={`/catalog/merch`}>
      {merch.map((item) => {
        const url = item.target.url;
        const match = url.match(/(\d+)\/$/);
        const id = match ? match[1] : null;
        const selected =
          item.target.selected_variant_id !== null ? item.target.selected_variant_id : undefined;
        /*const isInCart = cartItems?.find(
          (cartItem) => cartItem.product_variant === item.favorite_variant_id
        );*/
        return (
          <ProductCard
            key={item.product_id}
            title={item.artist_name}
            image={item.image}
            description={
              item.year === null ? `${item.name}` : `${item.name} (${item.year.toString()})`
            }
            price={item.price ?? undefined}
            likeButton={
              <ButtonLike
                isLiked={item.is_favorite}
                onToggle={(isLiked) => {
                  handleToggleFavorites(isLiked, item.favorite_variant_id).catch(console.error);
                }}
                isAuth={isAuth}
              />
            }
            link={`/catalog/album/${id}/?kind=${item.target.type}&selected=${selected}`}
            onHandleClick={() => addProduct(item)}
            /*purchasedItems={isInCart ? isInCart.quantity : undefined}*/
          />
        );
      })}
    </ListSection>
  );
};
