import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getFinanceReport } from "../api/finance.api";
import { type TFinanceReportDetails } from "./types";

export function useGetFinanceReportDetails(id: string) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useQuery<TFinanceReportDetails>({
    queryKey: ["finance-report", id, { authorized: !!token }],
    queryFn: () => getFinanceReport({ reportId: id, token: token }),
    enabled: !!token,
  });
}
