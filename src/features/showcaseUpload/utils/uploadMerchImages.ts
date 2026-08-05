import type { TAddImagePayload, TAddImageResponse } from "@/entities/Artist";

export async function uploadMerchImages(
  merchId: number,
  uploadFanc: (args: { id: number; payload: TAddImagePayload }) => Promise<TAddImageResponse>,
  mainImage?: File | null,
  additionalImages?: File[],
) {
  // 1. Загружаем главную картинку
  if (mainImage) {
    await uploadFanc({
      id: merchId,
      payload: {
        image: mainImage,
        is_main: true,
      },
    });
  }

  // 2. Загружаем дополнительные картинки параллельно
  if (additionalImages && additionalImages.length > 0) {
    const uploadPromises = additionalImages.map((img) =>
      uploadFanc({
        id: merchId,
        payload: {
          image: img,
          is_main: false,
        },
      })
    );

    await Promise.all(uploadPromises);
  }
}