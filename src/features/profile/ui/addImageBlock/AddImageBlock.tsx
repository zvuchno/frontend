'use client';

import { useState, useRef } from "react";
import styles from './AddImageBlock.module.scss';
import { ButtonUI } from "@/shared/ui/button";
import { type AddImageBlockProps } from "./AddImageBlock.types";

export const AddImageBlock: React.FC<AddImageBlockProps> = ({ 
  
}: AddImageBlockProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      console.log('add File: ', objectUrl);
      setPreview(objectUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.addImage__container}>
      <div 
        className={styles.addImage__previewContainer} 
        style={{ 
            backgroundImage: preview ? `url(${preview})` : "url('/bg-image.png')" }}
      >
        <label
          htmlFor="image-upload"
          className={styles.addImage__label}
        >Загрузите фото
        </label>
        
        <ButtonUI
          variant="secondary"
          size="small"
          className={styles.addImage__button} 
          contentClassName={styles.addImage__buttonText}
          onClick={handleButtonClick}
        >
          Выбрать фото
        </ButtonUI>

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className={styles.addImage__input}
        />
      </div>
      <div className={styles.addImage__requirements}>
        <div className={styles.addImage__requirementsWrapper}>  
          <p>Требования к загрузке обложки:</p>
          <p className={styles.addImage__markerPoint}>Формат файла: JPG, PNG</p>
          <p className={styles.addImage__markerPoint}>Размер: не менее 3000x3000 пикселей</p>
          <p className={styles.addImage__markerPoint}>Размер файла: не более 35 МБ</p>
          <p className={styles.addImage__markerPoint}>Цветовой режим: RGB (включая чёрно-белые изображения)</p>
          <p className={styles.addImage__markerPoint}>Разрешение: 72 dpi</p>
        </div>    
        <p>Обложка не должна содержать логотипов, адресов сайтов, дат релиза или какой-либо рекламы</p>
        <p> </p>
      </div>
    </div>
  );
};
