import { type ReactNode } from "react";

import LogoutButton from "@/features/logoutButton/LogoutButton";

import { Title } from "@/shared/ui";

import s from "./SideMenu.module.scss";

export const SideMenu = ({ children }: { children: ReactNode }) => {
  return (
    <section className={s.sideMenu}>
      <Title Tag='h2' className={s.title}>
        Личный кабинет
      </Title>
      <div className={s.sideMenuContent}>{children}</div>

      <LogoutButton className={s.logoutButton} />
    </section>
  );
};
