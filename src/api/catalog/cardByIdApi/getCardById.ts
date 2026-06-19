import { TDetailCardResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getCardById = async (
  kind: 'merch' | 'release' | 'artists',
  id: string
): Promise<TDetailCardResponse> => {

  try {

    let url: string

    if (kind === 'artists') {
      url = `${baseUrl}/v1/${kind}/profile/${id}`;

    } else {
      url = `${baseUrl}/v1/store/catalog/${kind}/${id}`;
    }
    

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) throw new Error(`Ошибка получения данных продукта типа: ${kind}`);

    const product = await response.json();

    return product;

  } catch (error) {
    throw error;
  }
}