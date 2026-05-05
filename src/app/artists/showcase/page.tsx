"use client";

import { 
  useDeleteProduct, 
  useDeletePromo, 
  useShowcaseProducts, 
  useShowcasePromoCodes, 
  useToggleVisibilityProduct, 
  useToggleVisibilityPromo 
} from "@/entities/Artist/store/useShowcaseStore";
import RoleSelectBlock from "@/features/auth/ui/RoleSelectBlock/RoleSelectBlock";
import RoleCard from "@/shared/ui/RoleCard/RoleCard";
import s from "./page.module.scss";
import { Text, Title } from "@/shared/ui/Typography/Typography";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import ShowcaseCard from "@/entities/Artist/ui/ShowcaseCard/ShowcaseCard";
import { ButtonUI } from "@/shared/ui/button";
import { SelectUI } from "@/shared/ui/select/Select";

type TProducts = "product" | "promo"

const ShowcasePage = () => {

  //состояние для отображение списка товаров или списка промокодов
  const [productsType, setProductTypes] = useState<TProducts>("product");

  const isProduct = productsType === "product";
  const isPromo = productsType === "promo";

  // для селекта "тип товаров"
  const [type, setType] = useState<string>('');
  // для селекта "наличие"
  const [availability, setAvailability] = useState<string>('');

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const shocaseProducts = useShowcaseProducts();
  const shocasePromoCodes = useShowcasePromoCodes();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInsidePopup = popupRef.current?.contains(target);

      if (!isClickInsidePopup) setIsPopupOpen(false);
    };

    if (isPopupOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [isPopupOpen])

  const handleChangeType = (value: string) => {
    setType(value);
  };

  const handleChangeAvailability = (value: string) => {
    setAvailability(value);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleShowPromo = () => {
    setProductTypes('promo');
  }

  const handleEditPromo = () => {
    console.log('EditPromo')
  };

  return (
    <div className={s.container}>
      {shocaseProducts.length === 0 ? (
        <RoleSelectBlock>
          <RoleCard 
            path=""
            image={"/cassette.png"} 
            title="Загрузить сингл"
          />
          <RoleCard 
            path=""
            image={"/record.png"} 
            title="Загрузить альбом"
          />
          <RoleCard 
            path=""
            image={"/shirt.png"} 
            title="Загрузить мерч"
          />
        </RoleSelectBlock>
      ) : (
        <div className={s.container}>

          <div className={s.actions}>
            <div className={s.actions__buttons}>
              <ButtonUI variant="primary" size="standart" className={s.button} >Добавить товар</ButtonUI>
              <ButtonUI variant="primary" size="standart" className={s.button} onClick={handlePopupOpen} >
                Промокоды
              </ButtonUI>
              {isPopupOpen && (
                <div className={s.popup} ref={popupRef}>
                  <button type="button" className={s.popup__item}>создать промокод</button>
                  <button type="button" className={s.popup__item} onClick={handleShowPromo}>все промокоды</button>
                </div>
              )}
            </div>

            <div className={s.actions__select}>
              <SelectUI 
                value={type}
                onChange={handleChangeType}
                options={[
                  {value:'all', label:'все'},
                  {value:'merch', label:'мерч'},
                  {value:'music', label:'музыка'},
                ]}
                placeholder="тип товара"
                containerClassName={s.containerOnPersonalAccountPage}
                selectClassName={s.selectOnPersonalAccountPage}
                contentClassName={s.itemListOnPersonalAccountPage}
                optionClassName={s.itemOnPersonalAccountPage}
                iconClassName={s.selectIcon}
              />
              <SelectUI 
                value={availability}
                onChange={handleChangeAvailability}
                options={[
                  {value:'all', label:'все'},
                  {value:'inStock', label:'в наличии'},
                  {value:'outOfStock', label:'закончились'},
                ]}
                placeholder="наличие"
                containerClassName={s.containerOnPersonalAccountPage}
                selectClassName={s.selectOnPersonalAccountPage}
                contentClassName={s.itemListOnPersonalAccountPage}
                optionClassName={s.itemOnPersonalAccountPage}
                iconClassName={s.selectIcon}
              />
            </div>
          </div>

          {isPromo && <Title Tag="h4" className={s.title}>Промокоды</Title>}

          <div className={s.heading}>
            <Text className={s.heading__text}>{isProduct ? "Фото" : "Промокод"}</Text>
            <Text className={clsx(s.heading__text, {[s.heading__text_span]: isProduct})}>
              {isProduct ? "Наименование" : "Скидка"}
            </Text>
            <Text className={s.heading__text}>{isProduct ? "Артикул" : "Период"}</Text>
            <Text className={s.heading__text}>{isProduct ? "Цена" : "Количество"}</Text>
            <Text className={clsx(s.heading__text, {[s.heading__text_rightAligned]: isPromo}, {[s.heading__text_leftAligned]: isPromo})}>
              {isProduct ? "Остаток" : "Видимость"}
            </Text>
            {isProduct && <Text className={clsx(s.heading__text, s.heading__text_span, s.heading__text_leftAligned)}>Видимость</Text>}
          </div>

          <ul className={s.cardList}>
            {!isProduct ? (
              shocasePromoCodes.map((item) => (
                <ShowcaseCard 
                  key={item.id}
                  variant="promo"
                  promoCode={item}
                  onToggleVisibility={useToggleVisibilityPromo}
                  onDelete={useDeletePromo}
                  onEdit={handleEditPromo}
                />
              ))
            ) : (
              shocaseProducts.map((item) => (
                <ShowcaseCard 
                  key={item.id} 
                  variant="product" 
                  product={item}
                  onToggleVisibility={useToggleVisibilityProduct} 
                  onDelete={useDeleteProduct}
                />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
};

export default ShowcasePage;