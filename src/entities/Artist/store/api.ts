import { TArtistLegalData } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export type TFetchProps<T = unknown> = {
  url: string;
  fetchData?: T;
  defaultMessage?: string;
  method?: "PATCH" | "GET";
};

const createArtistFetchFunction = async <T, D = unknown>(
  props: TFetchProps<D>,
): Promise<T> => {
  const endPoint = `${BASE_URL}/v1${props.url}`;
  const method = props.method;

  const res = await fetch(endPoint, {
    method: props.method || "PATCH",
    headers: { "Content-Type": "application/json" },
    body: method === "PATCH" ? JSON.stringify(props.fetchData) : undefined,
  });

  if (res.status === 204) return {} as T;

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data.error || data.message || data.detail || props.defaultMessage,
    );
  }
  return data as T;
};

export const updateArtistLegalData = async (
  regData: Partial<TArtistLegalData>,
): Promise<Partial<TArtistLegalData>> => {
  return await createArtistFetchFunction<Partial<TArtistLegalData>>({
    url: "/artists/me/legal",
    fetchData: regData,
    defaultMessage: "Ошибка при обновлении данных",
  });
};

export const getArtistLegalData = async (): Promise<Partial<TArtistLegalData>> => {
  return await createArtistFetchFunction<Partial<TArtistLegalData>>({
    url: "/artists/me/legal",
    method: "GET",
    defaultMessage: "Ошибка при получении юридических данных артиста",
  });
};