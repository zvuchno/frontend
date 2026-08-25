import { type ArtistApiDataItem } from "@/entities/profile";

export type TManagedProfile = {
  id?: number;
  profile_type?: "artist" | "label";
  name: string;
  description?: string;
  cover?: string | null;
  city?: string;
  slug?: string;
  has_account?: boolean;
  is_self?: boolean;
};

export type TManagedProfileResponse = TManagedProfile[];

export type TManagedProfileDetails = TManagedProfile & {
  contacts: ArtistApiDataItem[];
  socials: ArtistApiDataItem[];
  label: {
    id: number;
    name: string;
    slug: string;
  };
};

export type TInvitationResponse = {
  email: string;
  status: string;
  created_at: string;
  expires_at: string;
};

export type ManageInvitationVariables =
  | {
      id: string;
      email: string;
      type?: undefined;
    }
  | {
      id: string;
      email?: string;
      type: "resend" | "revoke";
    };
