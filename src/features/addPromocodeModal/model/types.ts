import { SetStateAction } from "react";

export type PromocodeFormValues = {
  code: string;
  discountType?: "PERCENT" | "FIXED";
  discountValue: number | null;
  description?: string;
  limit?: number | null;
  startAt?: string;
  endAt?: string;
  artistId?: string;
};

type TSelectOption = {
  value: string;
  label: string;
}

export type AddPromocodeFormProps = {
  isEditForm: boolean;
  profileType: "label" | "artist" | undefined;
  artistsOptions: TSelectOption[];
  isLoadingArtists: boolean;
  formError: string | null;
  isLoadingEditData?: boolean;
  errorEditData?: Error | null;
  onSubmit: (data: PromocodeFormValues, action: "create" | "save") => Promise<void>;
  handleCancelClick: () => void;
  setFormError: (value: SetStateAction<string | null>) => void
};

export interface AddPromocodeModalProps {
  isOpen: boolean;
  profileType: "artist" | "label" | undefined;
  onClose: () => void;
  id?: number;
}