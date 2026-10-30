import { useQuery } from "@tanstack/react-query";

import { getChecklist } from "../api/checkList.api";

export function useCheckList() {
  return useQuery({
    queryKey: ["checkList"],
    queryFn: () => getChecklist(),
    refetchOnWindowFocus: false,
  });
}
