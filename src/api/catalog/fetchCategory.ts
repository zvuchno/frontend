const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

type TCard = {
  id: number;
  image: string;
  title: string;
  description: string;
  price?: string | number;
}

interface GategoryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TCard[];
};

export const fetchProductsByCategory = async (
  category: string,
  limit?: number, 
  offset?: number
): Promise<GategoryListResponse> => {

  const params = new URLSearchParams();

  if (limit !== undefined) {
    params.append('limit', limit.toString());
  }

  if (offset !== undefined) {
    params.append('offset', offset.toString());
  }

  const url = `${baseUrl}/v1/${category}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Faild to fetch category data");
  }

  return response.json();
}