'use client';

import { useState, useRef } from "react";
import styles from './AddImageBlock.module.scss';
import { ButtonUI } from "@/shared/ui/button";
import { type AddImageBlockProps } from "./AddImageBlock.types";

export const AddImageBlock: React.FC<AddImageBlockProps> = ({ 
  severalImages = false
}: AddImageBlockProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalInputsRef = useRef<Record<string, HTMLInputElement | null>>({});
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [additionalPreviews, setAdditionalPreviews] = useState<Record<string, string>>({});

  const handleMainFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const objectUrl = URL.createObjectURL(file);
    setMainPreview(objectUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAdditionalFileChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAdditionalPreviews((prev) => ({ ...prev, [id]: url }));
    }
  };

  const renderAdditionalInputs = (id: string) => {
    const hasImage = !!additionalPreviews[id];
    
    return (
      <div 
        key={id}
        className={styles.addImage__additionalInput}
        style={
          { 
            backgroundImage: hasImage ? `url(${additionalPreviews[id]})` : "url('/plus-sign.svg" ,
            backgroundSize: hasImage ? 'contain' : 'auto' 
          }    
        }
        onClick={() => additionalInputsRef.current[id]?.click()}
      >      
        <input
          type="file"
          ref={(el) => {(additionalInputsRef.current[id] = el)}}
          onChange={(e) => handleAdditionalFileChange(e, id)}
          accept="image/*"
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
            backgroundImage: mainPreview ? `url(${mainPreview})` : "url('/bg-image.png')" }}
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
          onChange={handleMainFileChange}
          accept="image/*"
          className={styles.addImage__input}
        />
      </div>

      {severalImages && (
        <div className={styles.addImage__additionalInputsWrapper}>
          {['side1', 'side2', 'side3'].map((id) => renderAdditionalInputs(id))}
        </div>
      )}
      
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
