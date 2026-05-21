'use client'

import { Title } from "@/shared/ui/Typography/Typography";
import s from "./FiltersBlock.module.scss";
import clsx from "clsx";
import { TagUI } from "@/shared/ui/tag/Tag";
import { FilterBlockProps } from "./FilterBlock.type";

const FiltersBlock = ({ genre, category, sortType, onChangeGenre, onChangeCategory, onChangeSortType }: FilterBlockProps) => {

  const genres = [
    {
      id: 1,
      name: 'Все'
    },
    {
      id: 2,
      name: 'Электронная музыка'
    },
    {
      id: 3,
      name: 'Хип-хоп'
    },
    {
      id: 4,
      name: 'рок'
    },
    {
      id: 5,
      name: 'рок'
    },
  ];

  const categories = [
    {
      id: 1,
      name: 'Все'
    },
    {
      id: 2,
      name: 'Мерч'
    },
    {
      id: 3,
      name: 'Музыка'
    },
    {
      id: 4,
      name: 'Артисты'
    },
  ]

  const sort = [
    {
      id: 1,
      name: 'Новинки'
    },
    {
      id: 2,
      name: 'Популярное'
    },
    {
      id: 3,
      name: 'Удиви меня'
    },
  ]
  return (
    <div className={s.container}>
      <div className={clsx(s.filterGroup, s.genreFilter)}>
        <Title Tag="h2" className={s.filterGroup__title}>Жанры</Title>
        <div className={s.filterGroup__tags}>
          {genres.map(item => (
            <TagUI key={item.id} title={item.name} onTagClick={onChangeGenre} isActive={genre === item.name}/>
          ))}
        </div>
      </div>

      <div className={s.filterGroup}>
        <Title Tag="h2" className={s.filterGroup__title}>Категории</Title>
        <div className={s.filterGroup__tags}>
          {categories.map(item => (
            <TagUI key={item.id} title={item.name} onTagClick={onChangeCategory} isActive={category === item.name}/>
          ))}
        </div>
      </div>

      <div className={s.filterGroup}>
        <Title Tag="h2" className={s.filterGroup__title}>Сортировка</Title>
        <div className={s.filterGroup__tags}>
          {sort.map(item => (
            <TagUI key={item.id} title={item.name} onTagClick={onChangeSortType} isActive={sortType ? sortType === item.name : false}/>
          ))}
        </div>
      </div>
    </div>
  )
};

export default FiltersBlock;