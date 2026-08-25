"use client";

import { useRouter } from "next/navigation";

import { ContactsModule } from "@/widgets/ContactsModule";

export default function ContactsModalPage() {
  const router = useRouter();

  return <ContactsModule isOpen onClose={() => router.back()} />;
}
