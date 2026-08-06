export type VariantForm = {
  value: string;
  sku: string;
  stock: number | null; 
};

export type UploadFormValues = {
  name: string;
  releaseDate: string; // для альбома
  kind?: string; // для мерча
  genre?: string; // для альбома
  album?: string; // для мерча
  price: number | null;
  allowHigherPrice: boolean;
  description?: string;
  privacy: 'public' | 'link_only' | 'hidden';
  mainImage?: File | null;
  additionalImages?: File[]; // для мерча
  quantity?: number | null; // для мерча
  propertyName?: string; // для мерча
  variants?: VariantForm[]; // для мерча
  hasProperty?: boolean; 
};

export type PromocodeFormValues = {
  code: string;
  discountType?: "PERCENT" | "FIXED";
  discountValue: number | null;
  description?: string;
  limit?: number | null;
  startAt?: string;
  endAt?: string;
}