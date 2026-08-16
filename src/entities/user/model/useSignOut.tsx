import { logoutFromBackend } from "@/api/lib/handlers/logoutFromBackend";
import { useMutation } from "@tanstack/react-query";

export function useSignOut() {
  return useMutation<void, Error, void>({
    mutationFn: () => logoutFromBackend(),
  });
}
