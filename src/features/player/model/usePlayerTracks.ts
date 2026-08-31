import { getTracksList } from "@/api/catalog/tracksListApi/getTracksList";
import { TracksListResponse } from "@/api/catalog/tracksListApi/types";
import { useQuery } from "@tanstack/react-query";

export function useGetPlayerTracks(albumId: number) {

  return useQuery<Partial<TracksListResponse> | null>({
    queryKey: ["tracks", albumId],
    queryFn: () => getTracksList({
      albumId,
    }),
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000,
  });
}