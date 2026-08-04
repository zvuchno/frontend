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
  price: number;
  allowHigherPrice: boolean;
  description?: string;
  privacy: 'public' | 'link_only' | 'hidden';
  mainImage?: File | null;
  additionalImages?: File[]; // для мерча
  quantity?: number; // для мерча
  propertyName?: string; // для мерча
  variants?: VariantForm[]; // для мерча
  hasProperty?: boolean; 
};