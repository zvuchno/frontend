'use client';

import { TrackCardProps } from "./TrackCard.type";
import s from "./TrackCard.module.scss";
import React, { useCallback } from "react";
import { Text, Title } from "@/shared/ui/Typography/Typography";
import clsx from "clsx";

const editIcon: React.ReactNode = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
    <path fill="#100f0d" fill-rule="evenodd" d="M14.818 2.87c.2 0 .39.08.53.22l1.061 1.06a.75.75 0 0 1 0 1.062l-13.02 12.99a.8.8 0 0 1-.189.137l-2.109 1.078a.75.75 0 0 1-1.009-1.009l1.078-2.11a.8.8 0 0 1 .137-.187l12.99-13.02a.75.75 0 0 1 .531-.22M16.94.439a1.5 1.5 0 0 1 2.12 2.121L18 3.62a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 0 1 0-1.06z" clip-rule="evenodd"/>
  </svg>
);

const deleteIcon: React.ReactNode = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="none">
    <path fill="#100f0d" d="M9.75 6.429c0-.395-.336-.715-.75-.715s-.75.32-.75.715v10c0 .394.336.714.75.714s.75-.32.75-.714zM5.598 5.715c.414-.014.762.294.777.688l.375 10c.014.394-.31.725-.723.74-.414.014-.762-.295-.777-.689l-.375-10c-.014-.394.31-.725.723-.74M13.125 6.454c.014-.394-.31-.725-.723-.74-.414-.013-.762.295-.776.69l-.375 10c-.015.393.308.724.722.738s.762-.294.776-.688z"/><path fill="#100f0d" fill-rule="evenodd" d="M5.391 1.103a1.7 1.7 0 0 0-.141.684v1.07H.75c-.414 0-.75.32-.75.714 0 .395.336.715.75.715h.795l.894 13.612C2.504 19.066 3.429 20 4.688 20h8.625c1.27 0 2.174-.942 2.248-2.1l.894-13.614h.795c.414 0 .75-.32.75-.715s-.336-.714-.75-.714h-4.5v-1.07a1.7 1.7 0 0 0-.141-.684 1.8 1.8 0 0 0-.407-.58 1.9 1.9 0 0 0-.61-.388A2 2 0 0 0 10.874 0H7.126c-.246 0-.49.045-.718.135a1.9 1.9 0 0 0-.61.387 1.8 1.8 0 0 0-.407.58m1.732.326a.4.4 0 0 0-.264.103.35.35 0 0 0-.109.252v1.073h4.5V1.784a.34.34 0 0 0-.109-.252.37.37 0 0 0-.264-.103H7.123M6 4.286H3.048l.888 13.527v.008c.026.48.362.75.752.75h8.625c.386 0 .72-.264.75-.757l.889-13.528H6" clip-rule="evenodd"/>
  </svg>
)

const Trackcard = ({ image, title, description, duration, price, onEdit, onDelete }: TrackCardProps) => {

  const formatDuration = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return (
    <div className={s.container}>

      <div className={s.card}>
        <div className={s.card__img}>
          <img src={image}/>
        </div>
        <div className={s.card__content}>
          <Title className={s.text} Tag="h6">{title}</Title>
          <Text className={clsx(s.text, s.description)} Tag="p">{description}</Text>
        </div>
        <div className={s.text}>
          {duration
            ? formatDuration(duration)
            : price
              ? `${price} руб`
              : null
          }
        </div>
      </div>
      
      <button className={s.editButton} onClick={onEdit}>
        {editIcon}
      </button>
      <button className={s.deleteButton} onClick={onDelete}>
        {deleteIcon}
      </button>

    </div>
  )
};

export default Trackcard;