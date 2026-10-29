type TVariant = {
   variant_id: number;
   sku: string; // артикул
   stock: number | null;
   property_value: string;
   is_available_for_purchase: boolean;
}

export interface VariantRangeProps {
  type: string;
  variants: TVariant[];
  selectadVariant?: string;
  onClick: (value: string, sku: string, id: number, is_purchase: boolean) => void;
};