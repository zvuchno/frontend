"use client";

import { DOCUMENT_TYPE, type TDocumentType } from "@/api/consent-documents/consent-documents.api";
import { useRouter } from "next/navigation";

import { useGetLegalList } from "@/shared/legalDocuments";
import { AccentContainer, Loader } from "@/shared/ui";

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

  const common = documents.filter((document) => document.document_type === "privacy_policy");
  const forArtists = documents.filter((document) => document.document_type.startsWith("artist"));
  const forListeners = documents.filter((document) =>
    document.document_type.startsWith("listener")
  );

  return (
    <AccentContainer className={styles.sectionWrapper}>
      <section className={styles.mainSection}>
        <h1 className={styles.mainSectionTitle}>ПРАВОВАЯ ИНФОРМАЦИЯ</h1>

        <div className={styles.legalSection}>
          <div className={styles.legalSectionCover}>
            <div className={styles.legalSectionText}>
              Мы понимаем, что доверие - основа нашего комьюнити. Поэтому открыто публикуем все
              важные документы и следим за их актуальностью
            </div>
          </div>
          <div className={styles.legalSectionContent}>
            {common && (
              <article className={styles.legalSectionList}>
                <h2 className={styles.legalSectionSubtitle}>Общие</h2>
                <ul className={styles.legalSectionDocuments}>
                  {common.map((document) => (
                    <li
                      key={document.document_type}
                      className={styles.legalDocument}
                      title={DOCUMENT_TYPE[document.document_type]}
                      onClick={() => onHandleOpenDocument(document.document_type)}
                    >
                      <span className={styles.legalDocumentName}>
                        {DOCUMENT_TYPE[document.document_type]}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            )}
            {forArtists && (
              <article className={styles.legalSectionList}>
                <h2 className={styles.legalSectionSubtitle}>Для артистов</h2>
                <ul className={styles.legalSectionDocuments}>
                  {forArtists.map((document) => (
                    <li
                      key={document.document_type}
                      className={styles.legalDocument}
                      title={DOCUMENT_TYPE[document.document_type]}
                      onClick={() => onHandleOpenDocument(document.document_type)}
                    >
                      <span className={styles.legalDocumentName}>
                        {DOCUMENT_TYPE[document.document_type]}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            )}
            {forListeners && (
              <article className={styles.legalSectionList}>
                <h2 className={styles.legalSectionSubtitle}>Для слушателей</h2>
                <ul className={styles.legalSectionDocuments}>
                  {forListeners.map((document) => (
                    <li
                      key={document.document_type}
                      className={styles.legalDocument}
                      title={DOCUMENT_TYPE[document.document_type]}
                      onClick={() => onHandleOpenDocument(document.document_type)}
                    >
                      <span className={styles.legalDocumentName}>
                        {DOCUMENT_TYPE[document.document_type]}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            )}
          </div>
        </div>
      </section>
    </AccentContainer>
  );
};
