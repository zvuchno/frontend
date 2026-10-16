import { type TCatalogCard } from "@/api/catalog/catalogListApi/types";
import { type StoreFavorite } from "@/api/store/types";
import { useQueryClient } from "@tanstack/react-query";

import { ButtonLike } from "@/features/ButtonLike";

import { ProductCard } from "@/entities/ProductCard";
import { type CartItemRespond } from "@/entities/cart";

import { ListSection } from "@/shared/ui";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";

export const MusicSection = ({
  albums,
  //cartItems,
  playingAlbumId,
  handlePlayRelease,
  addProduct,
  isAuth,
  favorites,
}: {
  albums: TCatalogCard[];
  cartItems?: CartItemRespond[];
  playingAlbumId: number | null;
  favorites?: StoreFavorite[];
  handlePlayRelease: (releaseId: number) => Promise<void>;
  addProduct: (product: TCatalogCard) => void;
  isAuth: boolean;
}) => {
  const queryClient = useQueryClient();

  return (
    <ListSection title='Музыка' link={`/catalog/album`}>
      {albums.map((item) => {
        const url = item.target.url;
        const match = url.match(/(\d+)\/$/);
        const id = match ? match[1] : null;
        const selected =
          item.target.selected_variant_id !== null ? item.target.selected_variant_id : undefined;
        /*const isInCart = cartItems?.find(
        (cartItem) => cartItem.target.selected_variant_id === selected
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
            link={`/catalog/release/${id}/?kind=${item.target.type}&selected=${selected}`}
            onHandleClick={() => addProduct(item)}
            isRelease
            isPlaying={playingAlbumId === item.target.id}
            onPlay={() => void handlePlayRelease(item.target.id)}
            //purchasedItems={isInCart ? isInCart?.quantity : undefined}
          />
        );
      })}
    </ListSection>
  );
};
