import { AccountLayout } from "@/widgets/layout/account";

import s from "./layout.module.scss";

const FansLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={s.page}>
      <AccountLayout>{children}</AccountLayout>
    </div>
  );
};

export default FansLayout;
