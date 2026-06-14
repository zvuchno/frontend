import { MerchKindsResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getMerchKinds = async (): Promise<MerchKindsResponse> => {

  const url = `${baseUrl}/v1/store/merch-kinds/`;

  try {
  
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Ошибка получения типов мерча`);

    const data = await response.json();

    return data;

  } catch (error) {
    throw error;
  }
};