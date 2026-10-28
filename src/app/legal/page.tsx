import { type Metadata } from "next";

import { LegalDocuments } from "@/screens/legal/ui/LegalDocuments";

export const metadata: Metadata = {
  title: "Условия использования | ЗВУЧНО",
  openGraph: {
    title: "Условия использования | ЗВУЧНО",
  },
};

export default function LegalDocumentsPage() {
  return <LegalDocuments />;
}
