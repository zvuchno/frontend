'use client';

import { GalleryProps } from "./Gallery.type";
import s from './Gallery.module.scss';
import { useState } from "react";

const Gallery = ({ images }: GalleryProps) => {

  const [selectedImg, setSelectedImg] = useState<string>(images[0]);

  const handleImageClick = (img: string) => {
    setSelectedImg(img)
  };

  return (
    <div className={s.gallery}>
      <div className={s.gallery__container}>
        {images.map((image, index) => {
          return (
            <img 
              key={index} 
              src={image} 
              className={s.gallery__container__img} 
              onClick={() => handleImageClick(image)}
              style={{border: selectedImg === image ? '3px solid #0046d3' : ''}}
              alt={`Миниатюра изображения ${index + 1}`}
            />
          )
        })}
      </div>
      <div className={s.gallery__selected}>
        <img src={selectedImg} alt="Крупное фото выбранного изображения" />
      </div>
    </div>
  )
};

export default Gallery;