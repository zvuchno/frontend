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
  page,
}: TFinanceReportsRequest): Promise<TFinanceReportsResponse> {
  const limit = 5;
  const offset = limit * (page - 1);
  const periodStartParams = periodStart && `date_from=${periodStart}`;
  const periodEndParams = periodEnd && `date_to=${periodEnd}`;
  const periodTypeParams = periodType && `period_type=${periodType}`;

  const targetUrl = `${baseUrl}/v1/store/me/reports/?${periodStartParams}&${periodEndParams}&limit=${limit}&offset=${offset}&${periodTypeParams}`;

  const response = await authFetchClient<TFinanceReportsResponse>(
    targetUrl,
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

export async function downloadFinanceReport({
  downloadUrl,
  token,
}: {
  downloadUrl: string;
  token?: string;
}): Promise<{ blob: Blob; filename: string }> {
  const response = await fetch(downloadUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Ошибка при скачивании файла`);
  }

  const disposition = response.headers.get("content-disposition");
  console.log(disposition);
  const matches = disposition?.match(/filename="?([^"]+)"?/) ?? null;
  console.log(matches);
  const filename = matches !== null ? matches[1] : "report.pdf";
  console.log(filename);
  const blob = await response.blob();
  return { blob, filename };
}
