import type { PaginatedStoreResponse } from "@/api/store/types";
import { type TBonusItem } from "@/entities/Artist";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";

export type TShowcaseBonusListProps = {
  bonusList: TBonusItem[];
  bonusError: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  loadMore: (options?: FetchNextPageOptions | undefined) => 
    Promise<InfiniteQueryObserverResult<InfiniteData<PaginatedStoreResponse<TBonusItem>, unknown>, Error>>
  onDeleteBonus: (id: number) => Promise<void>;
  onEditBonus: (id: number) => void;
  onOrderChange?: (ids: number[]) => void;
};