import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getFinanceReportsAll } from "../api/finance.api";
import {
  type PaginatedStoreResponse,
  type TFinanceReportPreview,
  type TReportPeriodType,
} from "./types";

export function useGetFinanceReports(
  dateFrom: string,
  dateTo: string,
  periodType: TReportPeriodType,
  page: number
) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useQuery<PaginatedStoreResponse<TFinanceReportPreview>, Error>({
    queryKey: ["finance-reports", dateFrom, dateTo, periodType, page, { authorized: !!token }],
    queryFn: async () => {
      return getFinanceReportsAll({
        periodStart: dateFrom,
        periodEnd: dateTo,
        periodType: periodType,
        page: page,
        token: token,
      });
    },

    enabled: !!token,
  });
}
