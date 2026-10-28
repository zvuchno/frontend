import { type Metadata } from "next";

import { AccountLayout } from "@/widgets/layout/account";

import s from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Профиль | ЗВУЧНО",
  openGraph: {
    title: "Профиль | ЗВУЧНО",
  },
};

const FansLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={s.page}>
      <AccountLayout>{children}</AccountLayout>
    </div>
  );
};

export default FansLayout;
