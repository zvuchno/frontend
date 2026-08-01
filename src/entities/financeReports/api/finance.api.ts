import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import {
  type TFinanceReportDetails,
  type TFinanceReportsRequest,
  type TFinanceReportsResponse,
} from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getFinanceReportsAll({
  periodStart,
  periodEnd,
  periodType = "month",
  token,
}: TFinanceReportsRequest): Promise<TFinanceReportsResponse> {
  const response = await authFetchClient<TFinanceReportsResponse>(
    `${baseUrl}/v1/store/me/reports/?date_from=${periodStart}&date_to=${periodEnd}&limit=5&offset=5&period_type=${periodType}`,
    {
      method: "GET",
      credentials: "include",
    },
    token
  );

  if (!response) {
    throw new Error(
      `Ошибка получения финансовых отчетов за период с ${periodStart} по ${periodEnd}`
    );
  }
  return response;
}

export async function getFinanceReport({
  reportId,
  token,
}: {
  reportId: string;
  token?: string;
}): Promise<TFinanceReportDetails> {
  const response = await authFetchClient<TFinanceReportDetails>(
    `${baseUrl}/v1/store/me/reports/${reportId}/`,
    {
      method: "GET",
      credentials: "include",
    },
    token
  );

  if (!response) {
    throw new Error(`Ошибка получения финансового отчета №${reportId}`);
  }
  return response;
}
