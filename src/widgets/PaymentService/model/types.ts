export interface YooKassaPaymentProps {
  confirmationToken: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export type TPaymentRequest = {
  order_id: number;
};

export type TPaymentResponse = {
  confirmation_token: string;
};

export interface TPaymentError {
  error: string;
};
