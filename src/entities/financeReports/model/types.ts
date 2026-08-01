export type TReportPeriodType = "day" | "month";
type TReportRequestStatus = "pending" | "ready" | "failed";

export type TFinanceReportPreview = {
  id: number;
  period_start: string;
  period_end: string;
  items_count: number;
  sales_amount: string;
  file_url: string;
  created_at: string;
};

export type TFinanceReportsRequest = {
  periodStart: string;
  periodEnd: string;
  periodType: TReportPeriodType;
  token?: string;
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
