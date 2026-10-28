import { Suspense } from "react";

import { type Metadata } from "next";

import { ChangeAccountClient } from "@/screens/ChangeAccountClient";

import { ChangeRole } from "@/features/change-role";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Личный кабинет - изменить роль | ЗВУЧНО",
  openGraph: {
    title: "Личный кабинет - изменить роль | ЗВУЧНО",
  },
};

export default function ChangeRolePage() {
  return (
    <>
      <ChangeRole />
      <Suspense fallback={<div>Загрузка...</div>}>
        <ChangeAccountClient />
      </Suspense>
    </>
  );
}
