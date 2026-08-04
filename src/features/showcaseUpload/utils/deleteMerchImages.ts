import { TDeleteImageRequest } from "@/entities/Artist/model/types";

export async function deleteMerchImages(
  merchId: number,
  imageId: number[],
  deleteFanc: (payload: TDeleteImageRequest ) => Promise<void>,
) {

  // Удаляем картинки параллельно
  if (imageId && imageId.length > 0) {
    const uploadPromises = imageId.map((img) =>
      deleteFanc({
        id: merchId,
        image_id: img,
      })
    );

    await Promise.all(uploadPromises);
  }
}