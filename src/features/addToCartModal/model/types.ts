export type TDataForModal = {
  product_variant: number;
  type: string; 
  name: string; 
  image: string | undefined | null; 
  price: string;
  allow_overpay: boolean;
  release_type?: "album" | "ep" | "single";
}

export interface AddToCartModalProps {
  isOpen: boolean;
  data: TDataForModal;
  onClose: () => void;
}