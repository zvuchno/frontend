import { ReleaseDescription, TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";

interface ReleasePageContentProps {
  id: string;
  release: TDetailRelease;
}

const ReleasePageContent = ({id, release}: ReleasePageContentProps) => {
  return (
    <div>
      <ReleaseDescription release={release}/>
    </div>
  )
};

export default ReleasePageContent;