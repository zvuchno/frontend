export type TManagedProfile = {
  id: number;
  profile_type: "artist" | "label";
  name: string;
  description: string;
  cover: string | null;
  city: string;
  slug: string;
  has_account: boolean;
  is_self: boolean;
}

export type TManagedProfileResponse = TManagedProfile[]