import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { downloadFinanceReport } from "../api/finance.api";

export function useDownloadReport() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation({
    mutationFn: async (url: string) => downloadFinanceReport({ downloadUrl: url, token: token }),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", "report.pdf");

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
