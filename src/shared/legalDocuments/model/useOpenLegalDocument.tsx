import {
  type TConsentDocument,
  type TDocumentType,
  openConsentDocument,
} from "@/api/consent-documents/consent-documents.api";
import { useQuery } from "@tanstack/react-query";

export function useOpenLegalDocument(type: TDocumentType) {
  return useQuery<TConsentDocument>({
    queryKey: ["legal-document", type],
    queryFn: () => openConsentDocument(type),
    enabled: Boolean(type),
  });
}
