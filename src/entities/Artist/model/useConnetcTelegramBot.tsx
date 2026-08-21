import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import { connectTelegramBot } from "../api/artistSettings.api";
import { type TTelegramBotConnectResponse } from "./artistSettings.types";

export function useConnetcTelegramBot() {
  return useMutation<TTelegramBotConnectResponse, Error>({
    mutationFn: () => connectTelegramBot(),
    onSuccess: (data) => {
      window.open(data.url, "_blank", "noopener,noreferrer");
    },
    onError: () => {
      toast.error("Не удалось подключиться к телеграм-боту. Повторите попытку");
    },
  });
}
