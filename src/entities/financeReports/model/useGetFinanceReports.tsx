import { useQuery } from "@tanstack/react-query";

import { getFinanceReportsAll } from "../api/finance.api";
import {
  type PaginatedStoreResponse,
  type TFinanceReportPreview,
  type TReportPeriodType,
} from "./types";

export function useGetFinanceReports(
  periodType: TReportPeriodType,
  page: number,
  dateFrom?: string,
  dateTo?: string
) {
  return useQuery<PaginatedStoreResponse<TFinanceReportPreview>, Error>({
    queryKey: ["finance-reports", dateFrom, dateTo, periodType, page],
    queryFn: async () => {
      return getFinanceReportsAll({
        periodStart: dateFrom,
        periodEnd: dateTo,
        periodType: periodType,
        page: page,
      });
    },
    refetchOnWindowFocus: false,
  });
}
