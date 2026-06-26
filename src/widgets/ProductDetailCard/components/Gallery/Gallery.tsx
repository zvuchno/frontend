"use client";

import { useEffect, useState } from "react";

import s from "./Gallery.module.scss";
import { type GalleryProps } from "./Gallery.types";

const Gallery = ({ images }: GalleryProps) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(
    images.length > 0 ? images[0].image : null
  );

  useEffect(() => {
    setSelectedImg(images.length > 0 ? images[0].image : null);
  }, [images]);

  const handleImageClick = (img: string) => {
    setSelectedImg(img);
  };

  return (
    <div className={s.gallery}>
      {images.length > 1 && (
        <div className={s.gallery__container}>
          {images.map((image, index) => {
            return (
              <img
                key={image.id ? image.id : index}
                src={image.image}
                className={s.gallery__container__img}
                onClick={() => handleImageClick(image.image)}
                style={{ border: selectedImg === image.image ? "5px solid #0046d3" : "" }}
                alt={`Миниатюра изображения ${index + 1}`}
              />
            );
          })}
        </div>
      )}
      <div className={s.gallery__selected}>
        {selectedImg ? (
          <img src={selectedImg} alt='Крупное фото выбранного изображения' />
        ) : (
          <div className={s.gallery__selected__noPhoto}>Нет изображения</div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
