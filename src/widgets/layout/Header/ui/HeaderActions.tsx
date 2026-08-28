"use client";

import { useCart } from "@/entities/cart";

import { type THeaderAction } from "../config/headerActions";
import { HeaderActionLink } from "./HeaderActionLink";

export const HeaderActions = ({
  actions,
  isAuthorized,
  userType,
  onSearchOpen,
}: {
  actions: THeaderAction[];
  isAuthorized: boolean;
  userType: "artist" | "listener";
  onSearchOpen: (set: boolean) => void;
}) => {
  const { data } = useCart();
  const itemsCount = data?.items?.length ?? 0;
  const handleSearchOpen = () => {
    onSearchOpen(true);
  };

  return (
    <>
      {actions.map((action) => {
        const handleActionClick = () => {
          if (action.title === "Поиск") {
            handleSearchOpen();
          }
        };

        const href =
          action.title === "Профиль"
            ? userType === "artist"
              ? "/artist/profile"
              : "/fans/profile"
            : action.href;

        if (action.title === "Профиль" && !isAuthorized) {
          return null;
        }
        return (
          <HeaderActionLink
            key={action.title}
            action={action}
            onHandleClick={handleActionClick}
            count={itemsCount}
            link={href}
          />
        );
      })}
    </>
  );
};
