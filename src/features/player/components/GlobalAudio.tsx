"use client";

import { useEffect } from "react";
import { usePlayerStore } from "../store/usePlayerStore";

export const GlobalAudio = () => {
  const { 
    track, 
    setTotalDuration, 
    setCurrentTime, 
    setAudioInstance,
    togglePlay,
  } = usePlayerStore();

  useEffect(() => {
    const audio = new Audio();

    const onTimeUpdate = () => {
      setCurrentTime(Math.floor(audio.currentTime));
    };

    const onLoadedMetadata = () => {
      setTotalDuration(Math.floor(audio.duration));
      togglePlay();
    };

    const onEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    setAudioInstance(audio);

    if (track) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
      const playback = track.playback;
      if (playback.status === 'ready' && playback.url) {
        audio.src = `${baseUrl}/v1/store/player/tracks/${track.id}/play/`;
        audio.load();
      }
    }

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  },  [track, setCurrentTime, setTotalDuration, setAudioInstance])
  return null;
}