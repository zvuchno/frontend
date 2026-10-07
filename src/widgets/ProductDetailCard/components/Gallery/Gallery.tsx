"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
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
                className={clsx(
                  s.gallery__container__img,
                  selectedImg === image.image && s.isSelected
                )}
                onClick={() => handleImageClick(image.image)}
                alt={`Миниатюра изображения ${index + 1}`}
                width={100}
                height={100}
              />
            );
          })}
        </div>
      )}
      <div className={s.gallery__selected}>
        {selectedImg ? (
          <Image
            src={selectedImg}
            alt='Крупное фото выбранного изображения'
            width={600}
            height={625}
            priority
          />
        ) : (
          <div className={s.gallery__selected__noPhoto}>Нет изображения</div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
