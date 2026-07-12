import { RateLimitError } from "@/api/authFetchFromClient/authFetchClient";
import { addToFavorites } from "@/api/catalog/favoritesApi/addToFavorites";
import { deleteFromFavorites } from "@/api/catalog/favoritesApi/deleteFromFavorites";
import toast from "react-hot-toast";

export const handleToggleFavorites = async (isLiked: boolean, id: number) => {
  if (isLiked) {
      try {
        await addToFavorites({
          product_variant: id,
        })
        toast.success('Добавлено в избранное')
      } catch(error) {
        if (error instanceof RateLimitError) {
          const waitSeconds = Math.ceil(error.retryAfterMs / 1000);
          toast.error(`Слишком много запросов. Попробуйте через ${waitSeconds} сек.`);
        }
        toast.error('Не удалось добавить в избранное')
        console.error('Ошибка при добавлении в избранное:', error);
      }

    } else {
      try {
        await deleteFromFavorites({
          product_variant: id,
        })
        toast.success('Удалено из избранного')
      } catch(error) {
        if (error instanceof RateLimitError) {
          const waitSeconds = Math.ceil(error.retryAfterMs / 1000);
          toast.error(`Слишком много запросов. Попробуйте через ${waitSeconds} сек.`);
        }
        toast.error('Не удалось удалить из избранного')
        console.error('Ошибка при при удалении из избранного:', error);
      }

    }
}