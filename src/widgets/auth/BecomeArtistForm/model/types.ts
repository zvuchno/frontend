import { type TConsent } from "@/entities/user";

export type TBecomeArtistProps = {
  profileType: "artist" | "label";
  currentUserType: "artist" | "listener";
  onClose?: () => void;
};

export type TBecomeArtistRequest = {
  name: string;
  profile_type: "artist" | "label";
  consents?: TConsent[];
};

export type TBecomeArtistFormData = {
  name: string;
  artist_offer?: boolean;
  artist_personal_data?: boolean;
  artist_distribution?: boolean;
  artist_newsletter?: boolean;
}