import { type TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";
import { type TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";

type TContact = {
  id: number;
  label: string;
  value: string;
}

type TArtist = {
  contacts: TContact[];
  socials: TContact[];
  name: string;
  description: string;
  cover: string | null;
  city: string;
  url: string;
  slug: string;
}

export type TDetailCardResponse = TDetailMerch | TDetailRelease | TArtist;