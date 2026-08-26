const baseUrl = "/api/backend";
const targetUrl = `${baseUrl}/v1/compliance/consent-documents`;

export const DOCUMENT_TYPE = {
  privacy_policy: "Политика обработки персональных данных",
  artist_offer: "Договор-оферта",
  artist_personal_data: "Согласие на обработку персональных данных",
  artist_distribution: "Согласие на распространение персональных данных",
  artist_newsletter: "Согласие на получение рассылки и рекламных материалов",
  listener_offer: "Договор-оферта",
  listener_personal_data: "Согласие на обработку персональных данных",
  listener_distribution: "Согласие на распространение персональных данных",
  listener_newsletter: "Согласие на получение рассылки и рекламных материалов",
};

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
