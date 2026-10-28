import { type Metadata } from "next";

import { Contacts } from "@/shared/Contacts";

export const metadata: Metadata = {
  title: "Контакты | ЗВУЧНО",
  description: "Команда ЗВУЧНО всегда открыта к диалогу. Напишите нам: support@zvuchno.space",
  openGraph: {
    title: "Контакты | ЗВУЧНО",
    description: "Команда ЗВУЧНО всегда открыта к диалогу. Напишите нам: support@zvuchno.space",
    type: "article",
    url: `${new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000")}contacts/`,
  },
};

export default function ContactsPage() {
  return <Contacts />;
}
