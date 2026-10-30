import { TReleaseType } from "@/entities/Artist";
import { SelectOptionItem } from "@/shared/ui/Select/Select.types";

export type VariantForm = {
  value: string;
  sku?: string;
  stock?: number; 
};

export type TPrivacy = "public" | "link_only" | "hidden";

export type UploadReleaseFormValues = {
  name: string;
  releaseDate: string; // для альбома
  releaseType?: TReleaseType; // для альбома
  upc?: number | null; // для альбома
  genre?: string; // для альбома
  price: number | null;
  allowHigherPrice: boolean;
  description?: string;
  privacy?: TPrivacy;
  mainImage?: File | null;
  additionalImages?: File[];
  artistId?: string;
  tracksOrder?: number[] | null;
};

export type UploadMerchFormValues = {
  name: string;
  kind?: string; // для мерча
  album?: string; // для мерча
  price: number | null;
  allowHigherPrice: boolean;
  description?: string;
  privacy?: TPrivacy;
  mainImage?: File | null;
  additionalImages?: File[]; // для мерча
  quantity?: number; // для мерча
  propertyName?: string; // для мерча
  variants?: VariantForm[]; // для мерча
  hasProperty?: boolean; 
  artistId?: string;
}

export type PromocodeFormValues = {
  code: string;
  discountType?: "PERCENT" | "FIXED";
  discountValue: number | null;
  description?: string;
  limit?: number | null;
  startAt?: string;
  endAt?: string;
  artistId?: string;
}

export type TrackFormValues = {
  name: string;
  price?: number | null;
  allowHigherPrice: boolean;
  description: string;
  track: File | null;
};

type TOption = {
  value: string;
  label: string;
};

type TProfileType = "label" | "artist";

export type TReleaseFormFieldsProps = {
  artistsOptions: TOption[];
  isLoadingArtists: boolean;
  genresOptions: TOption[];
  isLoadingGenres: boolean;
  isEditForm: boolean;
  profileType?: TProfileType;
};

export type TMerchFormFieldsProps = {
  artistsOptions: TOption[];
  isLoadingArtists: boolean;
  isEditForm: boolean;
  merchKindsOptions: SelectOptionItem[];
  isLoadingMerchKinds: boolean;
  albumOptions: TOption[];
  isLoadingAlbums: boolean;
  profileType?: TProfileType;
  hasProperty?: boolean;
};

type TImage = {
  image: string;
  is_main: boolean;
  id?: number;
};

export type TMerchUploadFormProps = {
  profileType: "artist" | "label" | undefined;
  isEditForm: boolean;
  onDeleteImage: (data: number[]) => void;
  mainPreview?: TImage | null;
  additionalPreviews?: TImage[];
};

export type TReleaseUplodFormProps = {
  profileType: "artist" | "label" | undefined;
  isEditForm: boolean;
  onDeleteImage: (data: number[]) => void;
  mainPreview?: TImage | null;
};