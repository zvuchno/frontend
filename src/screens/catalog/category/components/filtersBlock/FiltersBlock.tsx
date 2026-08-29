'use client'

import s from "./FiltersBlock.module.scss";
import { type FilterBlockProps } from "./FilterBlock.type";
import FiltersGroup from "./ui/filtersGroup/FiltersGroup";
import { useRouter, useSearchParams } from "next/navigation";
import { useFilters } from "../../provider/useFilters";

const CATEGORIES = [
  {
    name: 'Все',
    slug: 'all'
  },
  {
    name: 'Музыка',
    slug: 'album'
  },
  {
    name: 'Артисты',
    slug: 'artists'
  },
  {
    name: 'Мерч',
    slug: 'merch'
  },
];

const ORDERING = [
  {
    name: 'Новинки',
    slug: '-created_at'
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

const FiltersBlock = ({ сategory, basePath, merchList }: FilterBlockProps) => {

  const router = useRouter();

  const { genresList } = useFilters();

  const searchParams = useSearchParams();
  const currentFiltersByGenre = searchParams.getAll('genre');
  const currentFiltersBySubcategory = searchParams.getAll('kind');
  const currenOrderingFilter = searchParams.get('ordering');

  const buildFiltersLink = (filter: string, filterKey: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter === 'ordering') {
      if (currenOrderingFilter === filterKey) {
        params.delete(filter);
      } else {
        params.set(filter, filterKey);
      }

    } else if (filter === 'genre') {
      if (currentFiltersByGenre.includes(filterKey)) {
        params.delete(filter);
        currentFiltersByGenre.filter((f)=> f !== filterKey).forEach((f) => params.append(filter, f));
      } else {
        params.append(filter, filterKey);
      }

    } else if (filter === 'kind') {
      if (currentFiltersBySubcategory.includes(filterKey)) {
        params.delete(filter);
        currentFiltersBySubcategory.filter((f)=> f !== filterKey).forEach((f) => params.append(filter, f));
      } else {
        params.append(filter, filterKey);
      }
    }

    router.push(`${basePath}?${params.toString()}`, { scroll: false });
  };

  const buildClearFiltersLink = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('genre');

    router.push(`${basePath}?${params.toString()}`, { scroll: false })
  };

  const isActiveFilterByGenre = (filterKey: string): boolean => currentFiltersByGenre.includes(filterKey);
  const isActiveFilterBySubcategory = (filterKey: string): boolean => currentFiltersBySubcategory.includes(filterKey);
  const isActiveOrderingFilters = (filterKey: string): boolean => currenOrderingFilter === filterKey;

  const isActiveCategory = (value: string): boolean => сategory === value;

  const hasGenreFilters = currentFiltersByGenre.length === 0;

  return (
    <div className={s.container}>

      <div className={s.genreFilter}>
        <FiltersGroup 
          title="Жанры" 
          items={genresList} 
          filterType={'genre'}
          buildLink={buildFiltersLink} 
          isActiveFilter={isActiveFilterByGenre}
          clearFilters={buildClearFiltersLink}
          isClearFilters={hasGenreFilters}
        />
      </div>
      
      <div className={s.categoryFilter}>
        <FiltersGroup 
          title="Категории" 
          items={CATEGORIES}
          isActiveFilter={isActiveCategory}
          isCategory
        />
        {сategory === 'merch' && merchList && (
          <FiltersGroup 
            items={merchList} 
            filterType="kind"
            isSecondary
            buildLink={buildFiltersLink} 
            isActiveFilter={isActiveFilterBySubcategory}
          />
        )}
      </div>

      <FiltersGroup 
        title="Сортировка" 
        items={ORDERING} 
        filterType="ordering"
        buildLink={buildFiltersLink} 
        isActiveFilter={isActiveOrderingFilters}
      />

    </div>
  )
};

export default FiltersBlock;