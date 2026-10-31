"use client";

import { useCallback } from "react";

import clsx from "clsx";
import Image from "next/image";

import { Text, Title } from "@/shared/ui";

import s from "./TrackCard.module.scss";
import { type TrackCardProps } from "./TrackCard.type";
import { DeleteIcon, EditIcon } from "@/shared/ui/Icons";

export const TrackCard = ({
  image,
  title,
  description,
  duration,
  price,
  onEdit,
  onDelete,
}: TrackCardProps) => {
  const formatDuration = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.card__img}>
          {image && <Image src={image} alt={title ?? "Трек"} width={50} height={50} />}
        </div>
        <div className={s.card__content}>
          {title && (
            <Title className={s.text} Tag='h6'>
              {title}
            </Title>
          )}
          <Text className={clsx(s.text, s.description)} Tag='p'>
            {description}
          </Text>
        </div>
        <div className={s.text}>
          {duration ? formatDuration(duration) : price ? `${price} руб` : null}
        </div>
      </div>

      {onEdit && (
        <button 
          className={s.editButton} 
          onClick={onEdit} 
          type="button" 
          data-testid="track-card-edit-bitton"
        >
          <EditIcon />
        </button>
      )}
      {onDelete && (
        <button 
          className={s.deleteButton} 
          onClick={onDelete} 
          type="button" 
          data-testid="track-card-delete-bitton"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

