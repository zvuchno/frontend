import { downloadArtistSalesReport } from "@/api/artist/ordersApi/getArtistOrders";
import { useMutation } from "@tanstack/react-query";

interface DownloadSalesStatementPayload {
  startDate: string;
  endDate: string;
}

export function useDownloadSalesStatement() {
  return useMutation({
    mutationFn: ({ startDate, endDate }: DownloadSalesStatementPayload) =>
      downloadArtistSalesReport(startDate, endDate),
    onSuccess: ({ blob, filename }) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: (err) => {
      console.error("Ошибка при скачивании:", err);
    },
  });
}
