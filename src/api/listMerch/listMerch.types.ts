type TMerch = {
  id: number
  name: string;
  description: string;
  price: string;
  main_image: string | null;
};

export interface ListMerchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TMerch[];
};