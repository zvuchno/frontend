const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export type TFetchProps<T = unknown> = {
  url: string;
  fetchData?: T;
  defaultMessage?: string;
  method?: "PATCH" | "GET";
};

interface ArtistLegalData {
  legal_profile?: {
    recipient_type?: string;
    recipient_name?: string;
    taxation_system?: string;
  };
  identity_data: {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    birth_date?: string;
    registration_address?: string;
    passport_series?: string;
    passport_number?: string;
    passport_issued_by?: string;
    passport_issue_date?: string;
  };
  bank_data?: {
    bank_name?: string;
    bik?: string;
    inn?: string;
    correspondent_account?: string;
    checking_account?: string;
  };
}

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
  regData: ArtistLegalData,
): Promise<ArtistLegalData> => {
  return await createArtistFetchFunction<ArtistLegalData, ArtistLegalData>({
    url: "/artists/me/legal",
    fetchData: regData,
    method: "PATCH",
    defaultMessage: "Ошибка при обновлении данных",
  });
};

export const getArtistLegalData = async (): Promise<ArtistLegalData> => {
  return await createArtistFetchFunction<ArtistLegalData>({
    url: "/artists/me/legal",
    method: "GET",
    defaultMessage: "Ошибка при получении юридических данных",
  });
};