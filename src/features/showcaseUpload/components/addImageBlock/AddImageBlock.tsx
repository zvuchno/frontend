"use client";

import { useEffect, useRef, useState } from "react";

import { ButtonUI } from "@/shared/ui";

import styles from "./AddImageBlock.module.scss";
import type { TImage, AddImageBlockProps } from "./AddImageBlock.types";
import toast from "react-hot-toast";
import { checkMediaFiles } from "../../lib/checkMediaFiles";

export const AddImageBlock = ({ 
  severalImages = false, 
  initialMainPreview,
  initialAdditionalPreviews,
  setValue,
  onDelete,
}: AddImageBlockProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Для дополнительных инпутов храним массив refs по индексам
  const additionalInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Стейт только для превью (URL)
  const [mainPreview, setMainPreview] = useState<TImage | null>(initialMainPreview ?? null);
  const [additionalPreviews, setAdditionalPreviews] = useState<(TImage | null)[]>(initialAdditionalPreviews ?? []);

  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  // Стейт для файлов 
  const [files, setFiles] = useState<{
    mainImage: File | null;
    additionalImages?: File[];
  }>({
    mainImage: null,
    additionalImages: [],
  });

   useEffect(() => {
    onDelete(deletedImageIds);
  }, [deletedImageIds, onDelete]);

  // useEffect(() => {
  //   // Синхронизируем форму с локальным стейтом
  //   if (files.mainImage) {
  //     setValue('mainImage', files.mainImage);
  //   } else {
  //     setValue('mainImage', []);
  //   }
    
  //   if (files.additionalImages && files.additionalImages.length > 0) {
  //     setValue('additionalImages', files.additionalImages);
  //   } else {
  //     setValue('additionalImages', []);
  //   }
    
  // }, [files, setValue]);

  useEffect(() => {
    return () => {
      if (mainPreview && !mainPreview.image.startsWith('http')) {
        URL.revokeObjectURL(mainPreview.image);
      }
      additionalPreviews.forEach((i) => {
        if (i && !i.image.startsWith('http')) {
          URL.revokeObjectURL(i.image);
        }
      });
    };
  }, [mainPreview, additionalPreviews]);

  const handleMainFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setMainPreview(null);
      setFiles((prev) => ({ ...prev, mainImage: null }));
      setValue('mainImage', null);
      event.target.value = '';
      return;
    }

    const result = await checkMediaFiles(file);
    if (result.error) {
      toast.error(result.error);
      event.target.value = '';
      return;
    }

    // Если был старый временный URL — отзываем его
    if (mainPreview && !mainPreview.image.startsWith('http')) {
      URL.revokeObjectURL(mainPreview.image);
    }

    const objectUrl = URL.createObjectURL(file);
    setMainPreview({image: objectUrl, is_main: true});

    setFiles((prev) => {
      const newFiles = { ...prev, mainImage: file };
      setValue('mainImage', file); // обновляем форму
      return newFiles;
    });
  };

  const clearMainImage = (id?: number) => {
    // Отзываем старый временный URL
    if (mainPreview && !mainPreview.image.startsWith('http')) {
      URL.revokeObjectURL(mainPreview.image);
    }
    setMainPreview(null);
    setFiles((prev) => ({ ...prev, mainImage: null }));
    setValue('mainImage', null); 

    if (id && severalImages) {
      setDeletedImageIds((prev) => [...prev, id]);
    };
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAdditionalFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>, 
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      // Очищаем превью и файл по индексу
      setAdditionalPreviews((prev) => {
        const next = [...prev];
        next[index] = null;
        return next;
      });

      setFiles((prev) => {
        const current = prev.additionalImages ?? [];
        const nextAdditional = [...current];
        if (index < nextAdditional.length) {
          nextAdditional.splice(index, 1);
        }
        setValue('additionalImages', nextAdditional);
        return {
          ...prev,
          additionalImages: nextAdditional,
        };
      });
      event.target.value = '';
      return;
    }

    const result = await checkMediaFiles(file);
    if (result.error) {
      toast.error(result.error);
      event.target.value = '';
      return;
    }

    // Отзываем старый URL, если был
    if (additionalPreviews[index] && !additionalPreviews[index]?.image.startsWith('http')) {
      URL.revokeObjectURL(additionalPreviews[index].image);
    }

    const url = URL.createObjectURL(file);
    setAdditionalPreviews((prev) => {
      const next = [...prev];
      next[index] = {
        image: url,
        is_main: false
      };
      return next;
    });

    setFiles((prev) => {
      const current = prev.additionalImages ?? [];
      const nextAdditional = [...current];
      nextAdditional[index] = file;
      setValue('additionalImages', nextAdditional);
      return { ...prev, additionalImages: nextAdditional };
    });

  };

  const clearAdditionalImageAt = (index: number, id?: number) => {
    // Отзываем временный URL, если он был
    if (additionalPreviews[index] && !additionalPreviews[index]?.image.startsWith('http')) {
      URL.revokeObjectURL(additionalPreviews[index].image);
    }

    setAdditionalPreviews((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });

    setFiles((prev) => {
      const current = prev.additionalImages ?? [];
      const nextAdditional = [...current];
      // Удаляем файл по индексу
      if (index < nextAdditional.length) {
        nextAdditional.splice(index, 1);
      }
      setValue('additionalImages', nextAdditional)
      return { ...prev, additionalImages: nextAdditional };
    });

    if (id) {
      setDeletedImageIds((prev) => [...prev, id]);
    };
  };

  const renderAdditionalInputs = (index: number) => {
    const hasImage = !!additionalPreviews[index];
    //const preview = additionalPreviews[index] ?? null;

    return (
      <div
        key={index}
        className={styles.addImage__additionalInput}
        style={{
          backgroundImage: hasImage
            ? `url(${additionalPreviews[index]?.image})`
            : "url('/icons/plus-sign.svg')",
          backgroundSize: hasImage ? "contain" : "auto",
          position: 'relative',
        }}
        onClick={() => additionalInputsRef.current[index]?.click()}
      >
        {hasImage && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              void clearAdditionalImageAt(index, additionalPreviews[index]?.id);
            }}
            className={styles.addImage__removeButton}
            aria-label="Удалить изображение"
          >
            ✕
          </button>
        )}

        <input
          type='file'
          ref={(el) => {
            additionalInputsRef.current[index] = el;
          }}
          onChange={(e) => void handleAdditionalFileChange(e, index)}
          accept='image/*'
          hidden
        />
      </div>
    );
  };

  return (
    <div className={styles.addImage__container}>
      <div
        className={styles.addImage__previewContainer}
        style={{
          backgroundImage: mainPreview 
            ? `url(${mainPreview.image})` 
            : `repeating-conic-gradient(#e9e8e8 0% 25%, #fff 0% 50%)`,
          backgroundSize: mainPreview?.image ? 'cover' : '45px 45px',
          backgroundPosition: 'center',
          backgroundRepeat: mainPreview?.image ? 'no-repeat' : 'repeat',
          position: 'relative'
        }}
      >
        {mainPreview && (
          <button
            type="button"
            onClick={() => void clearMainImage(mainPreview.id)}
            className={styles.addImage__removeButton}
            aria-label="Удалить главное фото"
          >
            ✕
          </button>
        )}

        {!mainPreview && (
          <label htmlFor='image-upload' className={styles.addImage__label}>
            Загрузите фото
          </label>
        )}

        {!mainPreview && (
          <ButtonUI
            variant='secondary'
            size='small'
            className={styles.addImage__button}
            contentClassName={styles.addImage__buttonText}
            onClick={handleButtonClick}
          >
            Выбрать фото
          </ButtonUI>
        )}

        <input
          id="image-upload"
          type='file'
          ref={fileInputRef}
          onChange={handleMainFileChange}
          accept='image/*'
          className={styles.addImage__input}
        />
      </div>

      {severalImages && (
        <div className={styles.addImage__additionalInputsWrapper}>
          {[0, 1, 2].map((index) => renderAdditionalInputs(index))}
        </div>
      )}

      <div className={styles.addImage__requirements}>
        <div className={styles.addImage__requirementsWrapper}>
          <p>Требования к загрузке обложки:</p>
          <p className={styles.addImage__markerPoint}>Формат файла: JPG, PNG, WebP</p>
          <p className={styles.addImage__markerPoint}>Размер: не менее 1000x1000 пикселей</p>
          <p className={styles.addImage__markerPoint}>Размер файла: не более 35 МБ</p>
          {/* <p className={styles.addImage__markerPoint}>
            Цветовой режим: RGB (включая чёрно-белые изображения)
          </p>
          <p className={styles.addImage__markerPoint}>Разрешение: 72 dpi</p> */}
        </div>
        <p>
          Обложка не должна содержать логотипов, адресов сайтов, дат релиза или какой-либо рекламы
        </p>
        <p> </p>
      </div>
    </div>
  );
};
