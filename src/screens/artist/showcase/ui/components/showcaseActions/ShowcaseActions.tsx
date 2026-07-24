"use client";

import { useEffect, useRef, useState } from "react";
import s from "./ShowcaseActions.module.scss";
import { ButtonUI, SelectUI } from "@/shared/ui";
import clsx from "clsx";

type PopupType = 'promo' | 'product' | null;
type TItem = 'promo' | 'products' ;

interface ShowcaseActionsProps {
  selectItemType: (item: TItem) => void;
  addProduct: () => void;
  addPromo: () => void;
  sortBytype: (value: string) => void;
  sortByAvailability: (value: string) => void;
}

export const ShowcaseActions = ({ 
  selectItemType, 
  addProduct,
  addPromo, 
  sortBytype, 
  sortByAvailability 
}: ShowcaseActionsProps) => {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const promoPopupRef = useRef<HTMLDivElement | null>(null);
  const productPopupRef = useRef<HTMLDivElement | null>(null);
  //const merchPopupRef = useRef<HTMLDivElement | null>(null);

  const [sortType, setSortType] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");

  const closeAll = () => setActivePopup(null);

  const getPopupRef = (type: PopupType) => {
    switch (type) {
      case 'promo': return promoPopupRef;
      case 'product': return productPopupRef;
      default: return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const currentRef = getPopupRef(activePopup);

      if (currentRef?.current) {
        const isClickInside = currentRef.current.contains(target);
        if (!isClickInside) {
          closeAll();
        }
      }
    };

    if (activePopup) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activePopup]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAll();
      }
    };
    
    if (activePopup) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activePopup]);

  const togglePromoPopup = () => {
    setActivePopup((prev) => (prev === 'promo' ? null : 'promo'));
  };

  const toggleProductPopup = () => {
    setActivePopup((prev) => (prev === 'product' ? null : 'product'));
  };

  const handleAddAlbum = () => {
    addProduct();
  };

  const handleAddPromo = () => {
    addPromo();
  };

  const handleChangeType = (value: string) => {
    setSortType(value);
    sortBytype(value);
  };

  const handleChangeAvailability = (value: string) => {
    setAvailability(value);
    sortByAvailability(value);
  };

  return (
    <div className={s.actions}>
      <div className={s.actions__buttons}>
        <ButtonUI 
          variant='primary' 
          size='standart' 
          className={s.button} 
          onClick={toggleProductPopup}
        >
          Товары
        </ButtonUI>
        <ButtonUI
          variant='primary'
          size='standart'
          className={s.button}
          onClick={togglePromoPopup}
        >
          Промокоды
        </ButtonUI>

        {activePopup === 'product' && (
          <div 
            className={clsx(s.popup, s.popup_album)} 
            ref={productPopupRef}
          >
            <button 
              type='button' 
              className={s.popup__item} 
              onClick={handleAddAlbum}
            >
              добавить товар
            </button>
            <button 
              type='button' 
              className={s.popup__item}
              onClick={() => selectItemType('products')}
            >
              все товары
            </button>
          </div>
        )}
        {activePopup === 'promo' && (
          <div 
            className={clsx(s.popup, s.popup_promo)} 
            ref={promoPopupRef}
          >
            <button 
              type='button' 
              className={s.popup__item} 
              onClick={handleAddPromo}
            >
              создать промокод
            </button>
            <button 
              type='button' 
              className={s.popup__item} 
              onClick={() => selectItemType('promo')}
            >
              все промокоды
            </button>
          </div>
        )}
      </div>

      <div className={s.actions__select}>
        <SelectUI
          value={sortType}
          onChange={handleChangeType}
          options={[
            { value: "products", label: "все" },
            { value: "merch", label: "мерч" },
            { value: "album", label: "музыка" },
          ]}
          placeholder='по типу товара'
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
            { value: "all", label: "все" },
            { value: "inStock", label: "в наличии" },
            { value: "outOfStock", label: "закончились" },
          ]}
          placeholder='наличие'
          containerClassName={s.containerOnPersonalAccountPage}
          selectClassName={s.selectOnPersonalAccountPage}
          contentClassName={s.itemListOnPersonalAccountPage}
          optionClassName={s.itemOnPersonalAccountPage}
          iconClassName={s.selectIcon}
        />
      </div>
    </div>
  )
}