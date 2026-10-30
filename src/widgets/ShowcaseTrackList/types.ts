import { PaginatedStoreResponse } from "@/api/store/types";
import { TShowcaseTrack } from "@/entities/Artist/model/types";
import type { 
  FetchNextPageOptions, 
  InfiniteData, 
  InfiniteQueryObserverResult 
} from "@tanstack/react-query";

export type TShowcaseTrackListProps = {
  tracksList: TShowcaseTrack[];
  tracksError: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  loadMore: (options?: FetchNextPageOptions | undefined) => 
    Promise<InfiniteQueryObserverResult<InfiniteData<PaginatedStoreResponse<TShowcaseTrack>, unknown>, Error>>
  onDeleteTrack: (id: number) => Promise<void>;
  onEditTrack: (id: number) => void;
  onOrderChange?: (ids: number[]) => void;
};