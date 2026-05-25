'use client'

import s from "./FiltersBlock.module.scss";
import { FilterBlockProps, TCategory } from "./FilterBlock.type";
import { useState } from "react";
import FiltersGroup from "./ui/filtersGroup/FiltersGroup";
import { useSearchParams } from "next/navigation";

const GENERS = [
  {
    name: 'Электронная музыка',
    slug: 'Electronic music'
  },
  {
    name: 'Хип-хоп',
    slug: 'Hip-hop'
  },
  {
    name: 'рок',
    slug: 'rock'
  },
];

const CATEGORIES = [
  {
    name: 'Все',
    slug: 'all'
  },
  {
    name: 'Мерч',
    slug: 'merch'
  },
  {
    name: 'Музыка',
    slug: 'albums'
  },
  {
    name: 'Артисты',
    slug: 'atrists'
  },
];

const MERCH_SUBCATEGORIES = [
  {
    name: 'Футболки',
    slug: 't-shirts'
  },
  {
    name: 'Винил',
    slug: 'vinyl'
  },
  {
    name: 'Компакт диски',
    slug: 'CDs'
  },
  {
    name: 'Кассеты',
    slug: 'сassettes'
  },
];

const SORT = [
  {
    name: 'Новинки',
    slug: 'new'
  },
  {
    name: 'Популярное',
    slug: 'popular'
  },
  {
    name: 'Удиви меня',
    slug: 'random'
  },
];

const FiltersBlock = ({ initialCategory, basePath }: FilterBlockProps) => {

  // const [genre, setGenre] = useState<string>('all');
  // const [sortType, setSortType] = useState<string>('');
  const [category, setCategory] = useState<string>(initialCategory);
  // const [merchSubcategory, setMerchSubcategory] = useState<string>('');

  const searchParams = useSearchParams(); // хук для доступа к серч параметрам 
  const currentFilters = searchParams.getAll('filter'); // извлекаем все серч параметры с пометками 'filter' (массив)

  const buildFilterLink = (filterKey: string) => {
    const params = new URLSearchParams(searchParams.toString()); // создаем копию текущих параметров URL

    if (currentFilters.includes(filterKey)) {
      params.delete('filter');
      currentFilters.filter((f)=> f !== filterKey).forEach((f) => params.append('filter', f))
    } else {
      params.append('filter', filterKey)
    }

    return `${basePath}?${params.toString()}`
  };

  const isActiveFilter = (filterKey: string): boolean => currentFilters.includes(filterKey);

  const isActiveCategory = (value: string): boolean => category === value;

  


  // const handleChangeGenre = (genre: string) => {
  //   setGenre(genre);
  // };

  // const handleChangeCategory = (category: string) => {
  //   setCategory(category);
  // };

  // const handleChangeSortType = (sortType: string) => {
  //   setSortType(sortType);
  // };

  // const handleChangeMerchSubcategory = (subcategory: string) => {
  //   setMerchSubcategory(subcategory)
  // };

  return (
    <div className={s.container}>

      <div className={s.genreFilter}>
        <FiltersGroup 
          title="Жанры" 
          items={GENERS} 
           
          buildLink={buildFilterLink} 
          isActiveFilter={isActiveFilter}
        />
      </div>
      
      <div className={s.categoryFilter}>
        <FiltersGroup 
          title="Категории" 
          items={CATEGORIES} 
          
          isActiveFilter={isActiveCategory}
        />
        {category === 'merch' && (
          <FiltersGroup 
            items={MERCH_SUBCATEGORIES} 
            isSecondary
            buildLink={buildFilterLink} 
            isActiveFilter={isActiveFilter}
          />
        )}
      </div>
      

      <FiltersGroup 
        title="Сортировка" 
        items={SORT} 
        
        buildLink={buildFilterLink} 
        isActiveFilter={isActiveFilter}
      />

    </div>
  )
};

export default FiltersBlock;