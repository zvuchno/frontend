export type TBecomeArtistProps = {
  profileType: "artist" | "label";
  onClose?: () => void;
};

export type TBecomeArtistRequest = {
  name: string;
  profile_type: "artist" | "label";
};
