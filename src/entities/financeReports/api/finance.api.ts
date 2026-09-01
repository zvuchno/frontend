import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { formatDateToApi } from "@/shared/utils/formatDate";

import {
  type TFinanceReportDetails,
  type TFinanceReportsRequest,
  type TFinanceReportsResponse,
} from "../model/types";

const baseUrl = "/api/backend";

export async function getFinanceReportsAll({
  periodStart = "1900-01-01",
  periodEnd,
  periodType = "month",

  page,
}: TFinanceReportsRequest): Promise<TFinanceReportsResponse> {
  const limit = 5;
  const offset = limit * (page - 1);

  const endDate = formatDateToApi(new Date());
  const currentEndDay = periodEnd ? periodEnd : endDate;
  const periodStartParams = periodStart && `date_from=${periodStart}`;
  const periodEndParams = currentEndDay && `date_to=${currentEndDay}`;
  const periodTypeParams = periodType && `period_type=${periodType}`;

  const targetUrl = `${baseUrl}/v1/store/me/reports?${periodStartParams}&${periodEndParams}&limit=${limit}&offset=${offset}&${periodTypeParams}`;

  const response = await authFetchClient<TFinanceReportsResponse>(targetUrl, {
    method: "GET",
    credentials: "include",
  });

  if (!response) {
    throw new Error(
      `Ошибка получения финансовых отчетов за период с ${periodStart} по ${currentEndDay}`
    );
  }
  return response;
}

export async function getFinanceReport({
  reportId,
}: {
  reportId: string;
}): Promise<TFinanceReportDetails> {
  const response = await authFetchClient<TFinanceReportDetails>(
    `${baseUrl}/v1/store/me/reports/${reportId}/`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response) {
    throw new Error(`Ошибка получения финансового отчета №${reportId}`);
  }
  return response;
}

export async function downloadFinanceReport({
  downloadUrl,
}: {
  downloadUrl: string;
}): Promise<{ blob: Blob; filename: string }> {
  const response = await fetch(downloadUrl, {
    method: "GET",
    headers: {},
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Ошибка при скачивании файла`);
  }

  const disposition = response.headers.get("content-disposition");

  const matches = disposition?.match(/filename="?([^"]+)"?/) ?? null;

  const filename = matches !== null ? matches[1] : "report.pdf";

  const blob = await response.blob();
  return { blob, filename };
}
