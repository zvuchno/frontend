import { useRouter, useSearchParams } from "next/navigation";

import { ButtonUI } from "@/shared/ui";

export const SecondaryButton = ({
  isLoading,
  mode,
  registerRoute,
  onLoginClick,
}: {
  isLoading: boolean;
  mode: string;
  registerRoute: string;
  onLoginClick?: () => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRegisterClick = () => {
    const nextRoute = searchParams.get("next");

    let route: string;

    if (nextRoute) {
      const params = new URLSearchParams();
      params.append("next", encodeURIComponent(nextRoute));
      route = `${registerRoute}?${params.toString()}`;
    } else {
      route = registerRoute;
    }

    router.replace(route);
  };

  return (
    <ButtonUI
      variant='secondary'
      type='button'
      size='small'
      onClick={mode === "login" ? handleRegisterClick : onLoginClick}
      disabled={isLoading}
    >
      {mode === "login" ? "Зарегистрироваться" : "Уже есть аккаунт? Войти"}
    </ButtonUI>
  );
};
