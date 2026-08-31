//"use client";
import { AccountNavigation } from "@/features/profile";

import { AccentContainer, Title } from "@/shared/ui";

import s from "./layout.module.scss";

const FansLayout = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   if (status === "loading") {
  //     return;
  //   }

  //   if (status === "unauthenticated") {
  //     router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
  //     return;
  //   }
  // }, [pathname, router, session?.user.isListener, status]);

  return (
    <div className={s.page}>
      <AccentContainer className={s.container}>
        <div className={s.body}>
          <Title Tag='h2' className={s.title}>
            Личный кабинет
          </Title>
          <section className={s.section}>
            <AccountNavigation />
            <div className={s.section__content}>{children}</div>
          </section>
        </div>
      </AccentContainer>
    </div>
  );
};

export default FansLayout;
