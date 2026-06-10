import { MerchDescription, TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";

interface MerchPageContentProps {
  id: string;
  merch: TDetailMerch;
}

const MerchPageContent = ({id, merch}: MerchPageContentProps) => {
  return (
    <div>
      <MerchDescription product={merch}/>
    </div>
  )
};

export default MerchPageContent;