"use client";

import { useEffect, useRef, useState } from "react";
import s from "./ShowcaseActions.module.scss";
import { ButtonUI, SelectUI } from "@/shared/ui";
import clsx from "clsx";
import type { PromoTypeFilter, TShowcaseItem } from "@/entities/Artist";
import Link from "next/link";

type PopupType = 'promo' | 'product' | null;
type TOption = {
  value: string;
  label: string;
}

interface ShowcaseActionsProps {
  itemType: TShowcaseItem;
  selectItemType: (item: TShowcaseItem) => void;
  addPromo: () => void; // ссылка на форму
  filterByStock: (value: 'true' | 'false' | 'none') => void;
  filterByAvailability: (value: 'true' | 'false' | 'none') => void;
  filterByPromoType: (value: PromoTypeFilter) => void;
  artistOptions?: TOption[];
  onChangeArtist?: (id: string) => void;
};

export const ShowcaseActions = ({ 
  itemType,
  artistOptions,
  selectItemType,
  addPromo, 
  filterByStock,
  filterByAvailability,
  filterByPromoType,
  onChangeArtist
}: ShowcaseActionsProps) => {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const promoPopupRef = useRef<HTMLDivElement | null>(null);
  const productPopupRef = useRef<HTMLDivElement | null>(null);

  // состояние для селекта выбора отображаемого товара: все, мерч, альбомы
  const [productType, setProductType] = useState<string>("");
  // состояние для селекта выбора фильтра для мерча по наличию
  const [stockFilter, setStockFilter] = useState<string>("");
  // состояние для селекта выбора типа скидки промокода
  const [promoType, setPromoType] = useState<string>("");
  // состояние для селекта выбора фильтра для промокода по доступности
  const [availability, setAvailability] = useState<string>("");
  // состояние для селекта фильтрации по артисту
  const [artist, setArtist] = useState<string>("");

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

  const handleChangeArtist = (id: string) => {
    setArtist(id);
    if (onChangeArtist) onChangeArtist(id);
  }

  const handleChangeTypeProduct = (value: string) => {
    setProductType(value);
    selectItemType(value as TShowcaseItem);
  };

  const handleChangeTypePromo = (value: string) => {
    setPromoType(value);
    filterByPromoType(value as PromoTypeFilter)
  };

  const hamdleChangeStock = (value: string) => {
    setStockFilter(value as 'true' | 'false' | 'none');
    filterByStock(value as 'true' | 'false' | 'none');
  };

  const handleChangeAvailability = (value: string) => {
    setAvailability(value as 'true' | 'false' | 'none');
    filterByAvailability(value as 'true' | 'false' | 'none');
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
            className={clsx(s.popup, s.popup_product)} 
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
              onClick={() => { 
                selectItemType('products');
                closeAll();
              }}
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
              onClick={() => addPromo()}
            >
              создать промокод
            </button>
            <button 
              type='button' 
              className={s.popup__item} 
              onClick={() => {
                selectItemType('promo');
                closeAll();
              }}
            >
              все промокоды
            </button>
          </div>
        )}
      </div>

      <div className={s.actions__select}>
        {artistOptions && artistOptions.length > 0 && (
          <SelectUI
            value={artist}
            onChange={handleChangeArtist}
            options={artistOptions}
            placeholder='артист'
            containerClassName={s.containerOnPersonalAccountPage}
            selectClassName={s.selectOnPersonalAccountPage}
            contentClassName={s.itemListOnPersonalAccountPage}
            optionClassName={s.itemOnPersonalAccountPage}
            iconClassName={s.selectIcon}
          />
        )}
        {itemType === 'promo' ? (
          <SelectUI
            value={promoType}
            onChange={handleChangeTypePromo}
            options={[
              { value: "ALL", label: "все типы" },
              { value: "PERCENT", label: "процент" },
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
            onChange={handleChangeTypeProduct}
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
            onChange={handleChangeAvailability}
            options={[
              { value: "none", label: "все" },
              { value: "true", label: "доступны" },
              { value: "false", label: "не доступны" },
            ]}
            placeholder='по доступности'
            containerClassName={s.containerOnPersonalAccountPage}
            selectClassName={s.selectOnPersonalAccountPage}
            contentClassName={s.itemListOnPersonalAccountPage}
            optionClassName={s.itemOnPersonalAccountPage}
            iconClassName={s.selectIcon}
          />
        ) : productType === 'merch' ? (
          <SelectUI
            value={stockFilter}
            onChange={hamdleChangeStock}
            options={[
              { value: "none", label: "все" },
              { value: "true", label: "в наличии" },
              { value: "false", label: "закончились" },
            ]}
            placeholder='по наличию'
            containerClassName={s.containerOnPersonalAccountPage}
            selectClassName={s.selectOnPersonalAccountPage}
            contentClassName={s.itemListOnPersonalAccountPage}
            optionClassName={s.itemOnPersonalAccountPage}
            iconClassName={s.selectIcon}
          />
        ) : null}
      </div>
    </div>
  )
};