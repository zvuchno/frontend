export type AddImageBlockProps = {
  severalImages?: boolean;
  setValue: (name: 'mainImage' | 'additionalImages', value: File | File[]) => void;
};