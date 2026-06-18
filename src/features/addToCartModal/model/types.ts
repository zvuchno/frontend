export type TDataForModal = {
  product_variant: number;
  type: string; 
  name: string; 
  image: string; 
  price: string;
  allow_overpay: boolean;
  is_single?: boolean;
}

export interface AddToCartModalProps {
  isOpen: boolean;
  data: TDataForModal;
  onClose: () => void;
}