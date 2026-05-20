"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import NavBar from "@/features/profile/ui/NavBar/NavBar";
import { fansProfileRoutes } from "@/shared/constants/routes";
import { Title } from "@/shared/ui/Typography/Typography";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
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
    <AccentContainer className={s.container}>
      <Title Tag="h2" className={s.title}>
        Личный кабинет
      </Title>
      <section className={s.section}>
        <NavBar links={fansProfileRoutes} />
        <div className={s.section__content}>{children}</div>
      </section>
    </AccentContainer>
  );
};

export default FansLayout;
