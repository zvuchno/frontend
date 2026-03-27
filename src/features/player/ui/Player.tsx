import type { FC } from "react";
import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Player.module.scss'
import type { PlayerUIProps } from "./Player.types";
import { ButtonLike } from "@/features/ButtonLike";

export const PlayerUI: FC<PlayerUIProps> = ({
    className, 
    image, 
    title, 
    artistName,
    audioTrack,
    isLiked = false,
}: PlayerUIProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);
  const [isNameOverflowing, setIsNameOverflowing] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);

  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const timeInSeconds = Math.floor(time);
    const minutes = timeInSeconds > 0 ? Math.floor(timeInSeconds / 60) : Math.ceil(timeInSeconds / 60);
    const seconds = Math.abs(Math.floor(timeInSeconds % 60));
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTotalDuration(Math.floor(audioRef.current.duration));
    }
  };

  const handleSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Math.floor(Number(e.target.value));
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
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
  

  return (
  <div className={clsx(styles.container, className)}>
    <div className={styles.infoWrapper}>
      <div className={styles.image} style={{ backgroundImage: `url(${image})` }}></div>
      <div className={styles.info} ref={containerRef}>
        <span className={clsx(styles.title, {[styles.animatedText]: isTitleOverflowing})} ref={titleRef}>{title}</span>
        <span className={clsx(styles.name, {[styles.animatedText]: isNameOverflowing})} ref={nameRef}>{artistName}</span>
      </div>
    </div>
    <div className={styles.player}>
      <audio 
        ref={audioRef} 
        src={audioTrack} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div onClick={togglePlay} className={styles.playButton} style={{ backgroundImage: isPlaying ? "url('/pause.svg')" : "url('/play.svg')" }}></div>
      <div className={styles.controls}>
        <span>{formatTime(currentTime)}</span>
        <input 
          type="range"
          min={0}
          max={totalDuration}
          value={currentTime} 
          onChange={handleSet} 
          className={styles.progressBar}
        />
        <span className={styles.timer}>{formatTime(currentTime - totalDuration)}</span>
      </div>
      <div className={styles.likeContainer}><ButtonLike isLiked={isLiked} className={styles.buttonLike} iconClassName={styles.iconLike}/></div>
    </div>
  </div>)
}

//  моки для отладки
// 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Schwejk_cropped.jpg/1200px-Schwejk_cropped.jpg'
// 'https://cdnuploads.aa.com.tr/uploads/Contents/2024/03/23/thumbs_b_c_4e1dc3413e07d9708b3a82f4c626a220.jpg'
// 'https://cs9-20v4.vkuseraudio.ru/s/v1/acmp/YYXp9PRxLc2NuG0RvWFUvT96lUULjeVoxXZVyWNjH_wtEzuT0w1NWR8I2b7E9bnMftpesWvmp14AcmMsykpXAkN75LecqAqy7rcOB7RC5A3iYxRXoXly4Emysoe-j4w8S3hd-Ad-ZphCtxrznNf4GdCtS_zzdpO_7riXFehpytdxVxZ1Zg.mp3?siren=1'
// 'https://fine.sunproxy.net/file/YVlGMWFTTXN3M0VjVThHdEhvZHd2aS9MK3pTZW9kcmVJR1MrOEp1aWlLQUc0aHdWQ1BDaHNQK1Z0UkRDc1o4NHRCdURhUWc1S2xtVkNJeUtPdjJtQ2JSTzdEazl6dUxCT0VRTzZPWll5ZkE9/Frederik_SHopen_-_Noktyurn_Si-Bemol_Minor_(TheMP3.Info).mp3'