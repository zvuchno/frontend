import { useMutation } from "@tanstack/react-query";

import { downloadFinanceReport } from "../api/finance.api";

export function useDownloadReport() {
  return useMutation({
    mutationFn: async (url: string) => downloadFinanceReport({ downloadUrl: url }),
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
