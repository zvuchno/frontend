export type VariantForm = {
  id: string;
  value: string;
  sku: string;
  stock: string; 
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
  mainImage?: File;
  additionalImages?: File[]; // для мерча
  quantity?: number; // для мерча
  propertyName?: string;
  variants?: VariantForm[];
  hasProperty?: boolean; 
};