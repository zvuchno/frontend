'use client'

import { AccentContainer } from "@/widgets/layout/ui/accentContainer"
import Hero from "./components/hero/Hero"
import FiltersBlock from "./components/filtersBlock/FiltersBlock";

const CatalogPage = () => {
  const onChangeGenre = () => {
    console.log('кликнули на жанр')
  }

  const onChangeCategory = () => {
    console.log('кликнули на категорию')
  }

  const onChangeSortType = () => {
    console.log('сортировка')
  }
  return (
    <AccentContainer>
      <Hero />
      <FiltersBlock genre="Все" category="Музыка" onChangeCategory={onChangeCategory} onChangeGenre={onChangeGenre} onChangeSortType={onChangeSortType}/>
    </AccentContainer>
  )
}

export default CatalogPage;