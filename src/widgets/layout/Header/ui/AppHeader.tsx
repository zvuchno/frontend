import { Suspense } from "react";

import { AccentContainer } from "@/shared/ui";

import { DefaultHeaderActions } from "../config/headerActions";
import { HeaderUI } from "./HeaderUI";

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
