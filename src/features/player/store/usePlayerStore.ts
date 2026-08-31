import { create } from 'zustand';
import { TTrack } from "@/api/catalog/tracksListApi/types";
import toast from 'react-hot-toast';

interface PlayerState {
  track: TTrack | null;
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  audioInstance: HTMLAudioElement | null;
  playlist: TTrack[];
  currentIndex: number; // индекс текущего трека в плейлисте
  playingAlbumId: number | null;

  setAudioInstance: (audio: HTMLAudioElement) => void;
  setTotalDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setTrack: (track: TTrack) => void;
  setPlaylist: (playlist: TTrack[]) => void;
  setPlayingAlbumId: (albumId: number) => void;

  togglePlay: () => Promise<void>;
  playAlbum: (tracks: TTrack[], startIndex: number) => void;
  seek: (time: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  reset: () => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  track: null,
  isPlaying: false,
  currentTime: 0,
  totalDuration: 0,
  audioInstance: null,
  playlist: [],
  currentIndex: -1,
  playingAlbumId: null,

  setAudioInstance: (audio) => set({ audioInstance: audio }),

  setTotalDuration: (duration) => set({ totalDuration: duration }),

  setCurrentTime: (time) => set({ currentTime: time }),

  setPlayingAlbumId: (albumId) => set({ playingAlbumId: albumId }),

  setTrack: (track) => {
    const { playlist, currentIndex } = get();
    // Если трек есть в плейлисте, сохраняем индекс, иначе ставим -1
    const newIndex = playlist.findIndex(t => t.id === track.id);
    set({ track, isPlaying: false, currentTime: 0, totalDuration: 0, currentIndex: newIndex });
  },

  setPlaylist: (playlist) => {
    const { track } = get();
    if (!track || playlist.length === 0) {
      set({ playlist, currentIndex: -1, track: null });
      return;
    }
    let currentIndex = -1;
    if (track) {
      currentIndex = playlist.findIndex(t => t.id === track.id);
    }
    // если текущего трека нет в новом плейлисте — стартуем с первого
    if (currentIndex < 0) currentIndex = 0;
    const currentTrack = playlist[currentIndex];
    set({ playlist, currentIndex, track: currentTrack });
  },

  playAlbum: (tracks: TTrack[], startIndex = 0) => {
    set((state) => {
      const playlist = tracks;
      const currentIndex = Math.max(0, Math.min(startIndex, playlist.length - 1));
      const track = playlist[currentIndex];
      return { playlist, currentIndex, track, isPlaying: true };
    });
    get().togglePlay().catch(console.error);
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

  nextTrack: () => {
    const { playlist, currentIndex, setTrack } = get();
    if (playlist.length === 0 || currentIndex < 0) return;

    const nextIndex = (currentIndex + 1) % playlist.length; // зацикливаем на первый
    const nextTrack = playlist[nextIndex];
    setTrack(nextTrack);
    // сразу запускаем воспроизведение трека
    usePlayerStore.getState().togglePlay();
  },

  prevTrack: () => {
    const { playlist, currentIndex, setTrack } = get();
    if (playlist.length === 0 || currentIndex < 0) return;

    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1; // зацикливаем на последний
    const prevTrack = playlist[prevIndex];
    setTrack(prevTrack);
    // сразу запускаем воспроизведение трека
    usePlayerStore.getState().togglePlay();
  },

  reset: () => set({ 
    track: null, 
    isPlaying: false, 
    currentTime: 0, 
    totalDuration: 0, 
    playlist: [],
    currentIndex: -1
  }),
}))