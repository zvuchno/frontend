//"use client";
import { AccountNavigation } from "@/features/profile";

import { Title } from "@/shared/ui";

import s from "./layout.module.scss";
import { AccentContainerWithPlayer } from "@/widgets/AccentContainerWithPlayer";

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
      <AccentContainerWithPlayer className={s.container}>
        <div className={s.body}>
          <Title Tag='h2' className={s.title}>
            Личный кабинет
          </Title>
          <section className={s.section}>
            <AccountNavigation />
            <div className={s.section__content}>{children}</div>
          </section>
        </div>
      </AccentContainerWithPlayer>
    </div>
  );
};

export default FansLayout;
