"use client";

import { DOCUMENT_TYPE, type TDocumentType } from "@/api/consent-documents/consent-documents.api";

import { LegalDocumentText } from "@/shared/legalDocumentText";
import { useOpenLegalDocument } from "@/shared/legalDocuments";
import { AccentContainer, Loader } from "@/shared/ui";

import styles from "./LegalDocumentDetails.module.scss";

type LegalDocumentDetailsProps = {
  slug: string;
};

// берет строку в кот вначале строки указана дата в формате "гггг-мм-дд....." и возвращает дату в формате дд/мм/гггг
const documentDateFormatter = (date: string) => {
  const separatedDate = date.slice(0, 10);
  const year = separatedDate.slice(0, 4);
  const month = separatedDate.slice(5, 7);
  const day = separatedDate.slice(8, 10);
  return `${day}/${month}/${year}`;
};

export const LegalDocumentDetails = ({ slug }: LegalDocumentDetailsProps) => {
  const documentType = decodeURIComponent(slug) as TDocumentType;
  const { data: document, isLoading, error } = useOpenLegalDocument(documentType);

  if (isLoading) return <Loader />;
  if (error || !document || !document.content) {
    return (
      <AccentContainer className={styles.legalDocumentsWrapper}>
        <div>Не удалось получить документ</div>
      </AccentContainer>
    );
  }

  return (
    <AccentContainer className={styles.legalDetailsWrapper}>
      <section className={styles.legalDetailsContent}>
        <div className={styles.legalDetailsHeader}>
          <h1 className={styles.legalDetailsTitle}>{DOCUMENT_TYPE[document.document_type]}</h1>
          <span className={styles.legalDetailsDate}>
            Дата размещения на Сайте: {documentDateFormatter(document.created_at)}
          </span>
        </div>
        <LegalDocumentText document={document.content} />
      </section>
    </AccentContainer>
  );
};
