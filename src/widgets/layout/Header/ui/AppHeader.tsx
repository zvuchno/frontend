import { DefaultHeaderActions } from "@/widgets/layout/Header/config/headerActions";
import { AccentContainer } from "@/shared/ui";
import { HeaderUI } from "./HeaderUI";
import { Suspense } from "react";

export const AppHeader = () => {

  return (
    <AccentContainer>
      <Suspense fallback={<div>Загрузка...</div>}>
        <HeaderUI actions={DefaultHeaderActions} />
      </Suspense>
    </AccentContainer>
  );
};

export default AppHeader;
