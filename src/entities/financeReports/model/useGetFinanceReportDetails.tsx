import { useQuery } from "@tanstack/react-query";

import { getFinanceReport } from "../api/finance.api";
import { type TFinanceReportDetails } from "./types";

export function useGetFinanceReportDetails(id: string) {
  return useQuery<TFinanceReportDetails>({
    queryKey: ["finance-report", id],
    queryFn: () => getFinanceReport({ reportId: id }),
    refetchOnWindowFocus: false,
  });
}
