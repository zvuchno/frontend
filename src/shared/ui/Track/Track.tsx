"use client";

import { ButtonLike } from "@/features";
import s from "./Track.module.scss";
import clsx from "clsx";

interface TrackProps {
  isLiked: boolean;
  isPlaying: boolean;
  image: string;
  title: string;
  artistName: string;
  onPlayClick: () => void;
  onCartClick: () => void;
  onLikeClick: (value: boolean) => void;
}

export const Track = ({ 
  isLiked, 
  isPlaying, 
  image, 
  title, 
  artistName, 
  onPlayClick, 
  onCartClick, 
  onLikeClick 
}: TrackProps) => {
  return (
    <div className={s.container}>
      <div className={s.actions}>
        <div 
          className={s.playButton} 
          aria-label="button" 
          style={{ backgroundImage: isPlaying ? "url('/icons/pause.svg')" : "url('/icons/play-in-circle.svg')" }}
          onClick={onPlayClick}
        />
        <div 
          className={s.image} 
          style={{ backgroundImage: `url(${image})` }} 
        />
      </div>

      <div className={s.info}>
        <span className={clsx(s.title, s.text)}>{title}</span>
        <span className={clsx(s.artistName, s.text)}>{artistName}</span>
      </div>
      
      <div className={s.actions}>
        <div 
          className={s.cartButton} 
          onClick={onCartClick}
          aria-label="button" 
        />
        <ButtonLike 
          isLiked={isLiked} 
          className={s.likeButton}
          iconClassName={s.likeButton__icon}
          onToggle={onLikeClick}
        />
      </div>
    </div>
  )
};