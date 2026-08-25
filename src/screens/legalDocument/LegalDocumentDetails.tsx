"use client";

import { type TDocumentType } from "@/api/consent-documents/consent-documents.api";

import { useOpenLegalDocument } from "@/features/legalDocuments";

import { LegalDocumentText } from "@/shared/legalDocumentText";
import { Loader } from "@/shared/ui";

type LegalDocumentDetailsProps = {
  slug: string;
};

export const LegalDocumentDetails = ({ slug }: LegalDocumentDetailsProps) => {
  const documentType = decodeURIComponent(slug) as TDocumentType;
  const { data: document, isLoading, error } = useOpenLegalDocument(documentType);

  if (isLoading) return <Loader />;
  if (error || !document || !document.content) {
    return <div>Не удалось получить документ</div>;
  }

  return <LegalDocumentText document={document.content} />;
};
