"use client";

import { useState } from "react";
import { type PurchasedReleasesDownloadItem, type PurchasedReleaseDownloadOptions } from "@/api/store/types";
import { Loader, ModalUI, Title } from "@/shared/ui";
import s from "./DownloadReleaseModal.module.scss";
import { RELEASE_STATUS_TRANSLATIONS } from "@/shared/constants/translations";
import { getDownloadData } from "@/api/store";
import toast from "react-hot-toast";

interface DownloadReleaseModalProps {
  isOpen: boolean;
  loading: boolean;
  error: string | null;
  data: PurchasedReleaseDownloadOptions | null;
  onClose: () => void;
};

export const DownloadReleaseModal = ({ 
  isOpen,
  loading,
  error,
  data,
  onClose,
}: DownloadReleaseModalProps) => {
  const [downloading, setDownloading] = useState<Record<string, boolean>>({});
  
  if (!isOpen) return null;
  
  const items = data?.items ?? [];

  const startDownload = async (item: PurchasedReleasesDownloadItem) => {
    if (downloading[item.type]) return;
    setDownloading((prev) => ({ ...prev, [item.type]: true }));

    try {
      const result = await getDownloadData(item.download_action_url!);
      window.open(result.url, '_blank');
    } catch (err) {
      console.error(err);
      toast.error('Не удалось получить ссылку для скачивания')
    } finally {
      setDownloading((prev) => ({ ...prev, [item.type]: false }));
    }
  };

  return (
    <ModalUI 
      isOpen={isOpen}
      hasClickOnOverlay={false}
      onClose={onClose}
      closeButtonStyle="circledX"
    >
      <div className={s.modalContent}>
        <Title Tag="h2" className={s.title}>Варианты для скачивания</Title>

        {loading && (
          <Loader />
        )}

        {error && (
          <div className={s.errorMessage}>
            {error}
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <ul className={s.list}>
            {items.map((item, index) => {
              const isDownloading = downloading[item.type];
              return (
                <li key={index} className={s.item}>
                  <div className={s.item__info}>
                    <span className={s.item__title}>{item.title}</span>
                    <span className={s.item__type}>
                      {item.type === 'archive' ? 'Архив' : 'Трек'}
                    </span>
                  </div>

                  {item.status !== 'ready' && (
                    <div className={s.item__status}>
                      <span 
                        className={s.badge}
                        data-status={item.status}
                      >
                        {RELEASE_STATUS_TRANSLATIONS[item.status]}
                      </span>
                    </div>
                  )}

                  {item.status === 'ready' && item.download_action_url && (
                    <button
                      type="button"
                      className={s.downloadButton}
                      onClick={() => void startDownload(item)}
                      disabled={isDownloading}
                      aria-label={`Скачать ${item.title}`}
                    >
                      {isDownloading ? (
                        <span className={s.loader}>Подготовка ссылки…</span>
                      ) : (
                        <>
                          <span>Скачать</span>
                        </>
                      )}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        {!loading && !error && items.length === 0 && (
          <p className={s.emptyState}>Нет доступных файлов для скачивания.</p>
        )}
      </div>
    </ModalUI>
  )
};