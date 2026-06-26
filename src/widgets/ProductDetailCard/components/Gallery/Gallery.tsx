"use client";

import { useEffect, useState } from "react";

import s from "./Gallery.module.scss";
import { type GalleryProps } from "./Gallery.types";

const Gallery = ({ images }: GalleryProps) => {
  const [selectedImg, setSelectedImg] = useState<string>(images[0].image);

  useEffect(() => {
    setSelectedImg(images[0].image);
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
                key={image.id}
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
        <img src={selectedImg} alt='Крупное фото выбранного изображения' />
      </div>
    </div>
  );
};

export default Gallery;
