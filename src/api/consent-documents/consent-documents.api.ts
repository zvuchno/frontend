const baseUrl = "/api/backend";
const targetUrl = `${baseUrl}/v1/compliance/consent-documents`;

export enum DOCUMENT_TYPE {
  privacy_policy = "Политика обработки персональных данных",
  artist_offer = " Артист: Договор-оферта",
  artist_personal_data = "Артист: Согласие на обработку ПДН",
  artist_distribution = "Артист: Согласие на распространение ПДН",
  artist_newsletter = "Артист: Согласие на получение рассылки",
  listener_offer = "Слушатель: Договор-оферта",
  listener_personal_data = "Слушатель: Согласие на обработку ПДН",
  listener_distribution = "Слушатель: Согласие на распространение ПДН",
  listener_newsletter = "Слушатель: Согласие на получение рассылки",
}

export type TDocumentType = keyof typeof DOCUMENT_TYPE;

export type TConsentDocument = {
  document_type: TDocumentType;
  version: string;
  created_at: string;
  content?: string;
};

export async function getConsentDocumentsList(): Promise<TConsentDocument[]> {
  const res = await fetch(targetUrl, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Не удалось получить список документов");
  }

  const data: TConsentDocument[] = (await res.json()) as TConsentDocument[];
  return data;
}

export async function openConsentDocument(documentType: TDocumentType): Promise<TConsentDocument> {
  const res = await fetch(`${targetUrl}/${documentType}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Не удалось открыть документ");
  }

  const data = (await res.json()) as TConsentDocument;

  return data;
}
