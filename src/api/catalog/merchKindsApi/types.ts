export type TMerchKind = {
  id: number;
  name: string;
  slug: string;
  is_carrier: boolean;
};

export type MerchKindsResponse = TMerchKind[];