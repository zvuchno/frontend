const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export type TAlbum = {
  id: number
  name: string;
  price: number | null;
  description: string;
  cover_image: string | null;
};

export type TArtist = {
  name: string;
  description: string;
  cover: string | null;
  city: string;
  url: string;
  slug: string;
};

export type TMerch = {
  id: number
  name: string;
  description: string;
  price: number;
  main_image: string | null;
};

export type TProduct = TAlbum | TArtist | TMerch;

interface CategoryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TProduct[];
};

export const fetchProductsByCategory = async (
  category: string,
  options: {
    limit?: string,
    offset?: string,
    filterByGenre?: string | string[];
    filterBySubcategory?: string | string[];
    orderingFilter?: string;
  }
   
  
): Promise<CategoryListResponse> => {

  const { limit, offset, filterByGenre, filterBySubcategory, orderingFilter } = options;
  console.log('Опиции получаемые функцией', options)

  try {

    let url: string;

    const params = new URLSearchParams();

    if (limit !== undefined) {
      params.append('limit', limit.toString());
    }

    if (offset !== undefined) {
      params.append('offset', offset.toString());
    }


    if (category === 'artists') {
      url = `${baseUrl}/v1/${category}/?${params.toString()}`;

    } else {
      url = `${baseUrl}/v1/store/${category}/?${params.toString()}`;
    }

  
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Ошибка получения продуктов категории: ${category}`);

    const products = await response.json();

    return products;

  } catch (error) {
    throw error;
  }
}