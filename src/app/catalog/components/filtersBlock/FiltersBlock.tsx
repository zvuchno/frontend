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
  const currentFiltersByGenre = searchParams.getAll('genre'); // извлекаем все серч параметры с пометками 'genre' (массив)
  const currentFiltersBySubcategory = searchParams.getAll('kind'); // извлекаем все серч параметры с пометками 'kind' (массив)
  const currenOrderingFilter = searchParams.get('ordering'); // извлекаем все серч параметры с пометками 'kind' (массив)


  const buildFilterByGenreLink = (filterKey: string) => {
    const params = new URLSearchParams(searchParams.toString()); // создаем копию текущих параметров URL
    
    if (currentFiltersByGenre.includes(filterKey)) {
      params.delete('genre');
      currentFiltersByGenre.filter((f)=> f !== filterKey).forEach((f) => params.append('genre', f))
    } else {
      params.append('genre', filterKey)
    }

    // может использовать route чтобы не было перерендера

    return `${basePath}?${params.toString()}`
  };

  const buildFilterBySubcategoryLink = (filterKey: string) => {
    const params = new URLSearchParams(searchParams.toString()); // создаем копию текущих параметров URL

    if (currentFiltersBySubcategory.includes(filterKey)) {
      params.delete('kind');
      currentFiltersBySubcategory.filter((f)=> f !== filterKey).forEach((f) => params.append('kind', f))
    } else {
      params.append('kind', filterKey)
    }

    return `${basePath}?${params.toString()}`
  };

  const buildOrderingLink = (filterKey: string) => {
    const params = new URLSearchParams(searchParams.toString()); // создаем копию текущих параметров URL

    params.set('ordering', filterKey)

    return `${basePath}?${params.toString()}`
  };

  const isActiveFilterByGenre = (filterKey: string): boolean => currentFiltersByGenre.includes(filterKey);
  const isActiveFilterBySubcategory = (filterKey: string): boolean => currentFiltersBySubcategory.includes(filterKey);
  const isActiveOrderingFilters = (filterKey: string): boolean => currenOrderingFilter === filterKey;

  const isActiveCategory = (value: string): boolean => category === value;


  return (
    <div className={s.container}>

      <div className={s.genreFilter}>
        <FiltersGroup 
          title="Жанры" 
          items={GENERS} 
          buildLink={buildFilterByGenreLink} 
          isActiveFilter={isActiveFilterByGenre}
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
            buildLink={buildFilterBySubcategoryLink} 
            isActiveFilter={isActiveFilterBySubcategory}
          />
        )}
      </div>
      

      <FiltersGroup 
        title="Сортировка" 
        items={SORT} 
        buildLink={buildOrderingLink} 
        isActiveFilter={isActiveOrderingFilters}
      />

    </div>
  )
};

export default FiltersBlock;