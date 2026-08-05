import { type GenresKindsResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getGenresKinds = async (): Promise<GenresKindsResponse> => {
  const url = `${baseUrl}/v1/store/genres/`;
  const response = await fetch(url);

  if (!response.ok) throw new Error(`Ошибка получения типов жанров`);

  return (await response.json()) as GenresKindsResponse;
};
