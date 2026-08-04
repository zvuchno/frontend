export type TImage = {
  image: string;
  is_main: boolean;
  id?: number;
}

export type AddImageBlockProps = {
  severalImages?: boolean;
  setValue: (name: 'mainImage' | 'additionalImages', value: File | File[] | null) => void;
  onDelete: (data: number[]) => void;
  initialMainPreview?: TImage | null;
  initialAdditionalPreviews?: TImage[];
};