import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getFinanceReportsAll } from "../api/finance.api";
import {
  type PaginatedStoreResponse,
  type TFinanceReportPreview,
  type TFinanceReportsResponse,
  type TReportPeriodType,
} from "./types";

export function useGetFinanceReports(
  dateFrom: string,
  dateTo: string,
  periodType: TReportPeriodType
) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useInfiniteQuery<
    PaginatedStoreResponse<TFinanceReportsResponse>,
    Error,
    InfiniteData<PaginatedStoreResponse<TFinanceReportPreview>>
  >({
    queryKey: ["finance-reports", dateFrom, dateTo, periodType, { authorized: !!token }],
    queryFn: async ({ pageParam }) => {
      const url = pageParam as string | undefined;
      if (url)
        return getFinanceReportsAll({
          periodStart: dateFrom,
          periodEnd: dateTo,
          periodType: periodType,
          token: token,
        });
      return getFinanceReportsAll({
        periodStart: dateFrom,
        periodEnd: dateTo,
        periodType: periodType,
        token: token,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!token,
  });
}
