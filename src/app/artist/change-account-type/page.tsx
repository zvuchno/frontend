import { Suspense } from "react";

import { ChangeAccountClient } from "@/screens/ChangeAccountClient";

import { ChangeRole } from "@/features/change-role";

export const dynamic = "force-dynamic";

export default function ChangeRolePage() {
  return (
    <section>
      <ChangeRole />
      <Suspense fallback={<div>Загрузка...</div>}>
        <ChangeAccountClient />
      </Suspense>
    </section>
  );
}
