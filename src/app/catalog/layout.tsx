import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import Hero from "./components/hero/Hero";
import FiltersBlock from "./components/filtersBlock/FiltersBlock";

const CatalogLayout = ({ children }: {children: React.ReactNode}) => {
  
  return (
    <div>
      <AccentContainer>
        <Hero />
        <FiltersBlock genre="Все" category="Музыка" />
      </AccentContainer>
      {children}
    </div>
  )
}

export default CatalogLayout;