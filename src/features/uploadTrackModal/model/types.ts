import { TReleaseType } from "@/entities/Artist";

export type TShowcaseTrack = {
  id: number;
  artist_name: string | null;
  name: string;
  album: number;
  duration: number | null;
  position: number | null;
  price: string;
  allow_overpay: boolean;
  image: string | null;
  is_favorite: boolean;
};

export type TShowcaseUpdateTrackInfoPayload = { //
  id: number;
  name?: string;
  album?: number;
  position?: number | null;
  price?: string;
  allow_overpay?: boolean;
  description?: string;
  audio_file?: File;
};

export type TShowcaseTrackDetail = TShowcaseTrack & { //
  audio_file: File;
  description: string;
};

export type TUploadTrackPayload = { //
  album_id: number;
  filename: string;
  size: number;
  content_type?: string;
  name?: string;
  description?: string;
  price?: string;
  allow_overpay?: boolean;
};

type TUploadTrack = {
  id: number;
  name: string;
  description: string;
  position: number | null;
  price: string;
  allow_overpay: boolean;
};

type TUploadTrackTransport = {
  method: string;
  url: string;
  headers: Record<string, string>;
  fields: Record<string, string>;
  file_field_name: string;
};

type TUploadTrackState = {
  id: number;
  status: "initiated" | "uploaded" | "completed" | "failed" | "expired";
  uploaded_size: number | null;
  expires_at: string;
  completed_at: string | null;
  complete_url: string;
  transport: TUploadTrackTransport;
};

export type TUploadTrackResponse = { //
  track: TUploadTrack;
  upload: TUploadTrackState;
};

export type TUpdateTrackPayload = { //
  track_id: number;
  filename: string;
  size: number;
  content_type?: string;
};

export interface UploadTrackModalProps {
  isOpen: boolean;
  albumId: number;
  onClose: () => void;
  trackId?: number;
  releaseType?: TReleaseType;
};

export type TrackFormValues = {
  name: string;
  price?: number | null;
  allowHigherPrice: boolean;
  description: string;
  track: File | null;
};