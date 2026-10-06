"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

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
              <Image
                key={image.id ? image.id : index}
                src={image.image}
                className={s.gallery__container__img}
                onClick={() => handleImageClick(image.image)}
                style={{ border: selectedImg === image.image ? "3px solid #0046d3" : "" }}
                alt={`Миниатюра изображения ${index + 1}`}
                fill
              />
            );
          })}
        </div>
      )}
      <div className={s.gallery__selected}>
        {selectedImg ? (
          <Image src={selectedImg} alt='Крупное фото выбранного изображения' fill />
        ) : (
          <div className={s.gallery__selected__noPhoto}>Нет изображения</div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
