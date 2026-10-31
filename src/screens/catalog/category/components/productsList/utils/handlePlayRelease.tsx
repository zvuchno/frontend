import toast from "react-hot-toast";

import { getTracksList } from "@/api/catalog/tracksListApi/getTracksList";
import { type TTrack } from "@/api/catalog/tracksListApi/types";

export const handlePlayRelease = async ({
  releaseId,
  playingAlbumId,
  togglePlay,
  playAlbum,
  setPlayingAlbumId,
}: {
  releaseId: number;
  playingAlbumId: number | null;
  togglePlay: () => Promise<void>;
  playAlbum: (tracks: TTrack[], startIndex: number) => void;
  setPlayingAlbumId: (albumId: number) => void;
}) => {
  if (playingAlbumId === releaseId) {
    await togglePlay();
    return;
  }

  try {
    const data = await getTracksList({ albumId: releaseId });
    const tracks = data?.tracks;
    if (!tracks?.length) return;
    playAlbum(tracks, 0);
    setPlayingAlbumId(releaseId);
  } catch (err) {
    console.error("Не удалось загрузить треки релиза", err);
    toast.error("Не удалось загрузить треки релиза");
  }
};
