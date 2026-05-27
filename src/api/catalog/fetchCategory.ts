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

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

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

  try {

    let url: string;

    const params = new URLSearchParams();

    if (limit) {
      params.set('limit', limit);
    }

    if (offset) {
      params.set('offset', offset);
    }

    if (orderingFilter) {
      params.set('ordering', orderingFilter);
    }

    if (filterByGenre) {
      if (Array.isArray(filterByGenre)) {
        params.set('genre', filterByGenre.join(','));
      } else {
        params.set('genre', filterByGenre);
      }
    }

    if (filterBySubcategory) {
      if (Array.isArray(filterBySubcategory)) {
        params.set('kind', filterBySubcategory.join(','));
      } else {
        params.set('kind', filterBySubcategory);
      }
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