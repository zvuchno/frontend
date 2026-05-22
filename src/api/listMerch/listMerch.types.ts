type TMerch = {
  id: number
  name: string;
  description: string;
  price: number;
  main_image: string | null;
};

export interface ListMerchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TMerch[];
};