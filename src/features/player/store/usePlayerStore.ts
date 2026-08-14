import { create } from 'zustand';
import { TTrack } from "@/api/catalog/tracksListApi/types";
import toast from 'react-hot-toast';

interface PlayerState {
  track: TTrack | null;
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  audioInstance: HTMLAudioElement | null;
  setAudioInstance: (audio: HTMLAudioElement) => void;
  setTotalDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setTrack: (track: TTrack) => void;
  togglePlay: () => Promise<void>;
  seek: (time: number) => void;
  reset: () => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  track: null,
  isPlaying: false,
  currentTime: 0,
  totalDuration: 0,
  audioInstance: null,

  setAudioInstance: (audio) => set({ audioInstance: audio }),

  setTotalDuration: (duration) => set({ totalDuration: duration }),

  setCurrentTime: (time) => set({ currentTime: time }),

  setTrack: (track) => {
    set({ track, isPlaying: false, currentTime: 0, totalDuration: 0 });
},

  togglePlay: async () => {
    const { track, audioInstance } = get();
    if (!track) return;

    const playback = track.playback;
    if (playback.status !== 'ready' || !playback.url) {
      console.warn('Трек не готов к воспроизведению');
      toast.error('Трек не готов к воспроизведению. Повторите позже')
      return;
    }

    if (!audioInstance) return; 

    try {
      const isCurrentlyPlaying = !audioInstance.paused && audioInstance.readyState > 2;
      console.log('isCurrentlyPlaying:', isCurrentlyPlaying)
      if (isCurrentlyPlaying) {
        audioInstance.pause();
        set({ isPlaying: false });
      } else {
        await audioInstance.play();
        set({ isPlaying: true });
      }
    } catch (e) {
      console.warn('Autoplay blocked by browser', e);
    }
  },

  seek: (time) => {
    const { audioInstance } = usePlayerStore.getState();
    if (!audioInstance || time < 0) return;
    const cappedTime = Math.min(time, audioInstance.duration || time);
    audioInstance.currentTime = cappedTime;
  },

  reset: () => set({ track: null, isPlaying: false, currentTime: 0, totalDuration: 0 }),
}))