export type TReportPeriodType = "day" | "month";
type TReportRequestStatus = "pending" | "ready" | "failed";

export type TFinanceReportPreview = {
  period_start: string;
  period_end: string;
  sales_amount: string;
  download_url: string;
};

export type TFinanceReportsRequest = {
  periodStart?: string;
  periodEnd?: string;
  periodType?: TReportPeriodType;
  token?: string;
  page: number;
};

export type TFinanceReportsResponse = {
  count: number;
  next: string;
  previous: string;
  results: TFinanceReportPreview[];
};

export type TFinanceReportDetails = TFinanceReportPreview & {
  period_type: TReportPeriodType;
  status: TReportRequestStatus;
  orders_count: number;
  donation_amount: string;
  discount_amount: string;
  delivery_amount: string;
  commission_amount: string;
  payout_amount: string;
};

export type PaginatedStoreResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
