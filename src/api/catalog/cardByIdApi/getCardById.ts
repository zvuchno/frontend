import { type TDetailCardResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getCardById = async (
  kind: "merch" | "release" | "artists",
  id: string
): Promise<TDetailCardResponse> => {
  let url: string;

  if (kind === "artists") {
    url = `${baseUrl}/v1/${kind}/profile/${id}`;
  } else {
    url = `${baseUrl}/v1/store/catalog/${kind}/${id}`;
  }

  const errorMessage = kind === "artists" ? "Не удалось получить данные артиста." : "Не удалось получить данные о товаре."
  const response = await fetch(url);

  if (!response.ok) throw new Error(errorMessage);

  return (await response.json()) as TDetailCardResponse;
};
