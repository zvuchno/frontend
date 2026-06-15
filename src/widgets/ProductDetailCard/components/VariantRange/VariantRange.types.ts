type TVariant = {
   variant_id: number;
   sku: string; // артикул
   stock: number | null;
   property_value: string;
}

export interface VariantRangeProps {
  type: string;
  variants: TVariant[];
  selectadVariant?: string;
  onClick: (value: string, sku: string, id: number) => void;
};