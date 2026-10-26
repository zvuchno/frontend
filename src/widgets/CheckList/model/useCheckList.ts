import { useQuery } from "@tanstack/react-query";
import { getChecklist } from "../api/checkList.api";

export function useCheckList(artistSlug: string) {
  return useQuery({
    queryKey: ["checkList", artistSlug],
    queryFn: () => getChecklist(),
    refetchOnWindowFocus: false,
  });
};