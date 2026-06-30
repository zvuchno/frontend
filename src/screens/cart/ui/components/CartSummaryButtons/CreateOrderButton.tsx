import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/entities/user";

import { ButtonUI } from "@/shared/ui";

import styles from "./CartSummaryButtons.module.scss";

export const CreateOrderButton = () => {
  const { user } = useUserStore();
  const isAuthorized = !!user?.id;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onCreateOrder = () => {
    if (isAuthorized || !isAuthorized) router.push(`/order`);
    /*if (!isAuthorized) {
      const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;
      router.push(`/signin?next=${encodeURIComponent(currentUrl)}`);
    }*/
  };

  return (
    <ButtonUI
      variant={"primary"}
      className={styles.cartSummaryButton}
      onClick={onCreateOrder}
    >
      Перейти к оформлению
    </ButtonUI>
  );
};
