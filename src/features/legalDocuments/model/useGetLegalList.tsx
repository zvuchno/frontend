import {
  type TConsentDocument,
  getConsentDocumentsList,
} from "@/api/consent-documents/consent-documents.api";
import { useQuery } from "@tanstack/react-query";

export function useGetLegalList() {
  return useQuery<TConsentDocument[]>({
    queryKey: ["consent-documents"],
    queryFn: () => getConsentDocumentsList(),
  });
}
