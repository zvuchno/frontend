import { TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";
import { TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";

type TContact = {
  id: number;
  label: string;
  value: string;
}

type TArtist = {
  contacts: TContact[];
  socials: TContact[];
  name: string;
  description: string;
  cover: string | null;
  city: string;
  url: string;
  slug: string;
}

type TDetailCardResponse = TDetailMerch | TDetailRelease | TArtist;

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchCardById = async (
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
    

    const response = await fetch(url);

    if (!response.ok) throw new Error(`Ошибка получения данных продукта типа: ${kind}`);

    const product = await response.json();

    return product;

  } catch (error) {
    throw error;
  }
}