import { type FieldValues } from "@/features/profile";

export type TArtistSettingsFieldValues = Pick<
  FieldValues,
  "email" | "phone" | "password" | "repeatPassword"
>;
