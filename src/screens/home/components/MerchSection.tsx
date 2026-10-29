import { type TCatalogCard } from "@/api/catalog/catalogListApi/types";
import { type StoreFavorite } from "@/api/store/types";
import { useQueryClient } from "@tanstack/react-query";

import { ButtonLike } from "@/features/ButtonLike";

import { ProductCard } from "@/entities/ProductCard";
import { type CartItemRespond } from "@/entities/cart";

import { ListSection } from "@/shared/ui";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";

export const MerchSection = ({
  merch,
  //cartItems,
  isAuth,
  favorites,
  addProduct,
}: {
  merch: TCatalogCard[];
  cartItems?: CartItemRespond[];
  isAuth: boolean;
  favorites?: StoreFavorite[];
  addProduct: (product: TCatalogCard) => void;
}) => {
  const queryClient = useQueryClient();

  return (
    <ListSection title='Мерч' link={`/catalog/merch`}>
      {merch.map((item) => {
        const url = item.target.url;
        const match = url.match(/(\d+)\/$/);
        const id = match ? match[1] : null;
        const selected =
          item.target.selected_variant_id !== null ? item.target.selected_variant_id : undefined;

        const basePath = `/catalog/${item.target.type}/${id}/`;

        const href =
          item.target.type === "merch" || !selected
            ? basePath
            : `${basePath}?selected=${encodeURIComponent(selected)}`;
        /*const isInCart = cartItems?.find(
          (cartItem) => cartItem.product_variant === item.favorite_variant_id
        );*/
        const isFavorite = favorites?.some(
          (favorite) => favorite.product_variant === item.favorite_variant_id
        );
        const toggleFavorite = async (isLiked: boolean) => {
          await handleToggleFavorites(isLiked, item.favorite_variant_id);
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["favorites-catalog"] }),
            queryClient.invalidateQueries({ queryKey: ["listener", "favorites"] }),
          ]);
        };
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
                isLiked={isFavorite ?? false}
                onToggle={(isLiked) => {
                  void toggleFavorite(isLiked).catch(console.error);
                }}
                isAuth={isAuth}
              />
            }
            link={href}
            onHandleClick={() => addProduct(item)}
            /*purchasedItems={isInCart ? isInCart.quantity : undefined}*/
          />
        );
      })}
    </ListSection>
  );
};
