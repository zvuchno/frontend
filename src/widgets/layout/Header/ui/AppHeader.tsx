import { DefaultHeaderActions } from "@/widgets/layout/Header/config/headerActions";
import { AccentContainer } from "@/shared/ui";
import { HeaderUI } from "./HeaderUI";

export const AppHeader = () => {

  return (
    <AccentContainer>
      <HeaderUI actions={DefaultHeaderActions} />
    </AccentContainer>
  );
};

export default AppHeader;
