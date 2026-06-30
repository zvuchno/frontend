"use client";

import clsx from "clsx";

import { ButtonLike } from "@/features/ButtonLike";

import s from "./Track.module.scss";

interface TrackProps {
  isLiked: boolean;
  isPlaying: boolean;
  image: string | null;
  title: string;
  artistName: string;
  hasCart: boolean;
  onPlayClick: () => void;
  onCartClick?: () => void;
  onLikeClick: (value: boolean) => void;
}

export const Track = ({
  isLiked,
  isPlaying,
  image,
  title,
  artistName,
  hasCart,
  onPlayClick,
  onCartClick,
  onLikeClick,
}: TrackProps) => {
  return (
    <div className={s.container}>
      <div className={s.actions}>
        <div
          className={s.playButton}
          aria-label='button'
          style={{
            backgroundImage: isPlaying
              ? "url('/icons/pause.svg')"
              : "url('/icons/play-in-circle.svg')",
          }}
          onClick={onPlayClick}
        />
        {image && (
          <div 
            className={s.image} 
            style={{ backgroundImage: `url(${image})` }} 
          />
        )}
      </div>

      <div className={s.info}>
        <span className={clsx(s.title, s.text)}>{title}</span>
        <span className={clsx(s.artistName, s.text)}>{artistName}</span>
      </div>

      <div className={s.actions}>
        {hasCart && onCartClick && (
          <div className={s.cartButton} onClick={onCartClick} aria-label='button' />
        )}
        <ButtonLike
          isLiked={isLiked}
          className={s.likeButton}
          iconClassName={s.likeButton__icon}
          onToggle={onLikeClick}
        />
      </div>
    </div>
  );
};
