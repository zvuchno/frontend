export interface YooKassaPaymentProps {
  confirmationToken: string;
  onReturn?: (path: string) => void;
  onSuccess?: (path: string) => void;
  onError?: (error: {
    type: string;
    description: string;
    params?: Record<string, string> | undefined;
  }) => void;
}

export type TPaymentRequest = {
  order_id: number;
};

export type TPaymentResponse = {
  confirmation_token: string;
} | null;

export interface TPaymentError {
  error: string;
}
