"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import { ButtonLike } from "@/features/ButtonLike";

import { useUserStore } from "@/entities/user";

import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";

import { usePlayerStore } from "../store/usePlayerStore";
import styles from "./Player.module.scss";
import type { PlayerUIProps } from "./Player.types";

export const PlayerUI = ({ className }: PlayerUIProps) => {
  const { track, isPlaying, currentTime, totalDuration, togglePlay, seek } = usePlayerStore();

  const { user } = useUserStore();
  const isAuth = !!user?.id;

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);
  const [isNameOverflowing, setIsNameOverflowing] = useState(false);

  const title = track?.name ?? "";
  const artistName = track?.artist_name ?? "";
  const variantId = track?.favorite_variant_id;

  const playback = track?.playback;
  const isReady = playback?.status === "ready" && !!playback?.url;

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Math.floor(Number(e.target.value));
    seek(time);
  };

  useEffect(() => {
    if (containerRef.current && titleRef.current) {
      setIsTitleOverflowing(titleRef.current.scrollWidth > containerRef.current.clientWidth);
    }
  }, [title]);

  useEffect(() => {
    if (containerRef.current && nameRef.current) {
      setIsNameOverflowing(nameRef.current.scrollWidth > containerRef.current.clientWidth);
    }
  }, [title]);

  if (!track) return null;

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.infoWrapper}>
        <div className={styles.image} style={{ backgroundImage: `url(${track.image})` }}></div>
        <div className={styles.info} ref={containerRef}>
          <span
            className={clsx(styles.title, { [styles.animatedText]: isTitleOverflowing })}
            ref={titleRef}
          >
            {title}
          </span>
          <span
            className={clsx(styles.name, { [styles.animatedText]: isNameOverflowing })}
            ref={nameRef}
          >
            {artistName}
          </span>
        </div>
      </div>

      <div className={styles.player}>
        <div
          onClick={isReady ? togglePlay : undefined}
          className={styles.playButton}
          style={{
            backgroundImage: isPlaying ? "url('/icons/pause.svg')" : "url('/icons/play.svg')",
            cursor: isReady ? "pointer" : "not-allowed",
          }}
          aria-label={isReady ? (isPlaying ? "Пауза" : "Воспроизвести") : "Трек загружается"}
          title={isReady ? "" : "Трек ещё не готов"}
          role='button'
        />

        <div className={styles.controls}>
          <span>{formatTime(currentTime)}</span>
          <input
            type='range'
            min={0}
            max={totalDuration || 100}
            value={currentTime}
            onChange={handleSeek}
            className={styles.progressBar}
          />
          <span className={styles.timer}>-{formatTime((totalDuration || 0) - currentTime)}</span>
        </div>

        <div className={styles.likeContainer}>
          {variantId ? (
            <ButtonLike
              isAuth={isAuth}
              isLiked={track.is_favorite}
              className={styles.buttonLike}
              iconClassName={styles.iconLike}
              onToggle={(value) => {
                handleToggleFavorites(value, variantId).catch(console.error);
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

//  моки для отладки
// 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Schwejk_cropped.jpg/1200px-Schwejk_cropped.jpg'
// 'https://cdnuploads.aa.com.tr/uploads/Contents/2024/03/23/thumbs_b_c_4e1dc3413e07d9708b3a82f4c626a220.jpg'
// 'https://cs9-20v4.vkuseraudio.ru/s/v1/acmp/YYXp9PRxLc2NuG0RvWFUvT96lUULjeVoxXZVyWNjH_wtEzuT0w1NWR8I2b7E9bnMftpesWvmp14AcmMsykpXAkN75LecqAqy7rcOB7RC5A3iYxRXoXly4Emysoe-j4w8S3hd-Ad-ZphCtxrznNf4GdCtS_zzdpO_7riXFehpytdxVxZ1Zg.mp3?siren=1'
// 'https://fine.sunproxy.net/file/YVlGMWFTTXN3M0VjVThHdEhvZHd2aS9MK3pTZW9kcmVJR1MrOEp1aWlLQUc0aHdWQ1BDaHNQK1Z0UkRDc1o4NHRCdURhUWc1S2xtVkNJeUtPdjJtQ2JSTzdEazl6dUxCT0VRTzZPWll5ZkE9/Frederik_SHopen_-_Noktyurn_Si-Bemol_Minor_(TheMP3.Info).mp3'
