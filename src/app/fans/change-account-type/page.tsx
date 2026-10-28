import { Suspense } from "react";

import { type Metadata } from "next";

import { ChangeAccountClient } from "@/screens/ChangeAccountClient";

import { ChangeRole } from "@/features/change-role";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Стать артистом - Профиль | ЗВУЧНО",
  openGraph: {
    title: "Стать артистом - Профиль | ЗВУЧНО",
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
