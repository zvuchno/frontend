"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import NavBar from "@/features/profile/ui/NavBar/NavBar";
import { fansProfileRoutes } from "@/shared/constants";
import { Title, AccentContainer } from "@/shared/ui";
import s from "./layout.module.scss";

const FansLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (session?.user.isListener === false) {
      router.replace("/artist/profile");
    }
  }, [pathname, router, session?.user.isListener, status]);

  return (
    <div className={s.page}>
      <AccentContainer className={s.container}>
        <div className={s.body}>
          <Title Tag="h2" className={s.title}>
            Личный кабинет
          </Title>
          <section className={s.section}>
            <NavBar links={fansProfileRoutes} />
            <div className={s.section__content}>{children}</div>
          </section>
        </div>
      </AccentContainer>
    </div>
  );
};

export default FansLayout;
