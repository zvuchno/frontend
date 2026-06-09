import { ProductCardArtistData } from "@/features";

export interface CardOrderArtistProps {
  orderId: string;
  statusLabel: string;
  address: string;
  deliveryType: string;
  recipientFIO: string;
  message?: string;
  totalPrice: number;
  orderDate: Date;
  products: ProductCardArtistData[];
  onAccepted: () => void;
  onRejected: () => void;
}
