import { GenresKindsResponse } from "./genresKindsApi.types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getGenresKinds = async (): Promise<GenresKindsResponse> => {

  const url = `${baseUrl}/v1/store/genres/`;

  try {
  
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Ошибка получения типов жанров`);

    const data = await response.json();

    return data;

  } catch (error) {
    throw error;
  }
};