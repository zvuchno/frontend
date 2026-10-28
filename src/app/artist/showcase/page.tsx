import { type Metadata } from "next";

import { ShowcasePage } from "@/screens/artist/showcase";

export const metadata: Metadata = {
  title: "Витрина - Личный кабинет | ЗВУЧНО",
  openGraph: {
    title: "Витрина - Личный кабинет | ЗВУЧНО",
  },
};
export default function Showcase() {
  return <ShowcasePage />;
}
