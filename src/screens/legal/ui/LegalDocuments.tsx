"use client";

import { DOCUMENT_TYPE, type TDocumentType } from "@/api/consent-documents/consent-documents.api";
import { useRouter } from "next/navigation";

import { useGetLegalList } from "@/features/legalDocuments";

import { Loader } from "@/shared/ui";

import styles from "./LegalDocuments.module.scss";

export const LegalDocuments = () => {
  const { data: documents, isLoading } = useGetLegalList();

  const router = useRouter();
  const onHandleOpenDocument = (type: TDocumentType) => {
    const slug = type;
    router.push(`/legal/${slug}`);
  };

  if (isLoading) return <Loader />;

  if (!documents) return <div> Не удалось получить список документов</div>;

  return (
    <ul className={styles.legal}>
      {documents.map((document) => (
        <li
          key={document.document_type}
          className={styles.legalDocument}
          title={DOCUMENT_TYPE[document.document_type]}
          onClick={() => onHandleOpenDocument(document.document_type)}
        >
          <span className={styles.legalDocumentName}>{DOCUMENT_TYPE[document.document_type]}</span>
        </li>
      ))}
    </ul>
  );
};
