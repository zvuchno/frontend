import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getFinanceReportsAll } from "../api/finance.api";
import { type TFinanceReportsResponse, type TReportPeriodType } from "./types";

export function useGetFinanceReports(
  dateFrom: string,
  dateTo: string,
  periodType: TReportPeriodType
) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useQuery<TFinanceReportsResponse>({
    queryKey: ["finance-reports", dateFrom, dateTo, periodType, { authorized: !!token }],
    queryFn: () =>
      getFinanceReportsAll({
        periodStart: dateFrom,
        periodEnd: dateTo,
        periodType: periodType,
        token: token,
      }),
    enabled: !!token,
  });
}
