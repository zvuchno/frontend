"use client";

import { useEffect, useRef, useState } from "react";

import { ButtonUI } from "@/shared/ui";

import styles from "./AddImageBlock.module.scss";
import { type AddImageBlockProps } from "./AddImageBlock.types";
import toast from "react-hot-toast";
import { checkMediaFiles } from "../../lib/checkMediaFiles";

export const AddImageBlock = ({ severalImages = false, setValue }: AddImageBlockProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Для дополнительных инпутов храним массив refs по индексам
  const additionalInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Стейт только для превью (URL)
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [additionalPreviews, setAdditionalPreviews] = useState<(string | null)[]>([]);

  // Стейт для файлов 
  const [files, setFiles] = useState<{
    mainImage: File | null;
    additionalImages?: File[];
  }>({
    mainImage: null,
    additionalImages: [],
  });

  useEffect(() => {
    // Синхронизируем форму с локальным стейтом
    if (files.mainImage) setValue('mainImage', files.mainImage);
    if (files.additionalImages) setValue('additionalImages', files.additionalImages);
    
  }, [files, setValue]);

  const handleMainFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setMainPreview(null);
      setFiles((prev) => ({ ...prev, mainImage: null }));
      event.target.value = '';
      return;
    }

    const result = await checkMediaFiles(file);
    if (result.error) {
      toast.error(result.error);
      event.target.value = '';
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setMainPreview(objectUrl);
    setFiles((prev) => ({ ...prev, mainImage: file }));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAdditionalFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>, 
    id: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      // Очищаем превью и файл по индексу
      setAdditionalPreviews((prev) => {
        const next = [...prev];
        next[id] = null;
        return next;
      });

      setFiles((prev) => {
        const current = prev.additionalImages ?? [];
        const nextAdditional = [...current];
        nextAdditional[id] = undefined as unknown as File;
        // Удаляем undefined из массива, чтобы не слать мусор
        return {
          ...prev,
          additionalImages: nextAdditional.filter((f): f is File => f !== undefined),
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

    const url = URL.createObjectURL(file);
    setAdditionalPreviews((prev) => {
      const next = [...prev];
      next[id] = url;
      return next;
    });

    setFiles((prev) => {
      const current = prev.additionalImages ?? [];
      const nextAdditional = [...current];
      nextAdditional[id] = file;
      return { ...prev, additionalImages: nextAdditional };
    });

  };

  const renderAdditionalInputs = (id: number) => {
    const hasImage = !!additionalPreviews[id];
    const preview = additionalPreviews[id] ?? null;

    return (
      <div
        key={id}
        className={styles.addImage__additionalInput}
        style={{
          backgroundImage: hasImage
            ? `url(${additionalPreviews[id]})`
            : "url('/icons/plus-sign.svg')",
          backgroundSize: hasImage ? "contain" : "auto",
        }}
        onClick={() => additionalInputsRef.current[id]?.click()}
      >
        <input
          type='file'
          ref={(el) => {
            additionalInputsRef.current[id] = el;
          }}
          onChange={(e) => handleAdditionalFileChange(e, id)}
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
            ? `url(${mainPreview})` 
            : `repeating-conic-gradient(#e9e8e8 0% 25%, #fff 0% 50%)`,
          backgroundSize: mainPreview ? 'cover' : '45px 45px',
          backgroundPosition: 'center',
          backgroundRepeat: mainPreview ? 'no-repeat' : 'repeat',
        }}
      >
        <label htmlFor='image-upload' className={styles.addImage__label}>
          Загрузите фото
        </label>

        <ButtonUI
          variant='secondary'
          size='small'
          className={styles.addImage__button}
          contentClassName={styles.addImage__buttonText}
          onClick={handleButtonClick}
        >
          Выбрать фото
        </ButtonUI>

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
          {[0, 1, 2].map((id) => renderAdditionalInputs(id))}
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
