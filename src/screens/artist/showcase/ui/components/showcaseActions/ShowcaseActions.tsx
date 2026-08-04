"use client";

import { useEffect, useRef, useState } from "react";
import s from "./ShowcaseActions.module.scss";
import { ButtonUI, SelectUI } from "@/shared/ui";
import clsx from "clsx";
import { PromoTypeFilter, TShowcaseItem } from "@/entities/Artist";
import Link from "next/link";

type PopupType = 'promo' | 'product' | null;

interface ShowcaseActionsProps {
  itemType: TShowcaseItem;
  selectItemType: (item: TShowcaseItem) => void;
  addProduct: () => void; // ссылка на форму
  addPromo: () => void; // ссылка на форму
  filterByStock: (value: 'true' | 'false' | '') => void;
  filterByAvailability: (value: 'true' | 'false' | '') => void;
  filterByPromoType: (value: PromoTypeFilter) => void;
};

export const ShowcaseActions = ({ 
  itemType,
  selectItemType, 
  addProduct,
  addPromo, 
  filterByStock,
  filterByAvailability,
  filterByPromoType
}: ShowcaseActionsProps) => {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const promoPopupRef = useRef<HTMLDivElement | null>(null);
  const productPopupRef = useRef<HTMLDivElement | null>(null);

  // состояние для селекта выбора отображаемого товара: все, мерч, альбомы
  const [productType, setProductType] = useState<string>("");
  // состояние для селекта выбора фильтра для мерча по наличию
  const [stockFilter, setStockFilter] = useState<'true' | 'false' | ''>('');
  // состояние для селекта выбора типа скидки промокода
  const [promoType, setPromoType] = useState<string>("");
  // состояние для селекта выбора фильтра для промокода по доступности
  const [availability, setAvailability] = useState<'true' | 'false' | ''>('');

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

  const handleChangeTypeProduct = (value: string) => {
    setProductType(value);
    selectItemType(value as TShowcaseItem);
  };

  const handleChangeTypePromo = (value: string) => {
    setPromoType(value);
    filterByPromoType(value as PromoTypeFilter)
  };

  const hamdleChangeStock = (value: string) => {
    setStockFilter(value as 'true' | 'false' | '');
    filterByStock(value as 'true' | 'false' | '');
  };

  const handleChangeAvailability = (value: string) => {
    setAvailability(value as 'true' | 'false' | '');
    filterByAvailability(value as 'true' | 'false' | '');
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
            <Link 
              className={s.popup__item} 
              href='/artist/showcase/upload/album'
            >
              добавить товар
            </Link>
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
        {itemType === 'promo' ? (
          <SelectUI
            value={promoType}
            onChange={(e) => handleChangeTypePromo(e.target.value)}
            options={[
              { value: "ALL", label: "все" },
              { value: "PERСENT", label: "процент" },
              { value: "FIXED", label: "фиксированная" },
            ]}
            placeholder='по типу скидки'
            containerClassName={s.containerOnPersonalAccountPage}
            selectClassName={s.selectOnPersonalAccountPage}
            contentClassName={s.itemListOnPersonalAccountPage}
            optionClassName={s.itemOnPersonalAccountPage}
            iconClassName={s.selectIcon}
          />
        ) : (
          <SelectUI
            value={productType}
            onChange={(e) => handleChangeTypeProduct(e.target.value)}
            options={[
              { value: "products", label: "все товары" },
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
        )}

        {itemType === 'promo' ? (
          <SelectUI
            value={availability}
            onChange={(e) => handleChangeAvailability(e.target.value)}
            options={[
              { value: "", label: "все" },
              { value: "true", label: "доступен" },
              { value: "false", label: "не доступен" },
            ]}
            placeholder='наличие'
            containerClassName={s.containerOnPersonalAccountPage}
            selectClassName={s.selectOnPersonalAccountPage}
            contentClassName={s.itemListOnPersonalAccountPage}
            optionClassName={s.itemOnPersonalAccountPage}
            iconClassName={s.selectIcon}
          />
        ) : (
          <SelectUI
            value={stockFilter}
            onChange={(e) => hamdleChangeStock(e.target.value)}
            options={[
              { value: "", label: "все" },
              { value: "true", label: "в наличии" },
              { value: "false", label: "закончились" },
            ]}
            placeholder='наличие'
            containerClassName={s.containerOnPersonalAccountPage}
            selectClassName={s.selectOnPersonalAccountPage}
            contentClassName={s.itemListOnPersonalAccountPage}
            optionClassName={s.itemOnPersonalAccountPage}
            iconClassName={s.selectIcon}
          />
        )}
      </div>
    </div>
  )
};