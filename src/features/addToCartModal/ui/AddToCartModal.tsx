"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import Image from "next/image";

import { type TCartItem } from "@/entities/cart";
import { useAddCartItem } from "@/entities/cart";

import { ButtonUI, CheckboxUI, ModalUI, Title } from "@/shared/ui";

import { type AddToCartModalProps } from "../model/types";
import s from "./AddToCartModal.module.scss";

const totalPriceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

const formatTotalPrice = (totalPrice: number) => totalPriceFormatter.format(totalPrice);

export const AddToCartModal = ({ isOpen, data, onClose }: AddToCartModalProps) => {
  const [checkStatus, setIsChecked] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const { isPending, error, mutate: addToCart } = useAddCartItem();

  useEffect(() => {
    setNewPrice("");
  }, [data]);

  const handleCheckStatusChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.name === "price") setNewPrice(value);
    if (e.target.name === "comment") setComment(value);
  };

  const handleAddToCart = () => {
    const itemForCart: TCartItem = {
      product_variant: data.product_variant,
      quantity: 1,
      price_with_donation: newPrice
        ? parseFloat(newPrice) < parseFloat(data.price)
          ? null
          : newPrice
        : null,
      comment: comment,
      is_artist_subscription: checkStatus,
    };

    addToCart(itemForCart, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <ModalUI isOpen={isOpen} onClose={onClose} closeButtonStyle='circledX'>
      <div className={s.contentWrapper}>
        <Title className={clsx(s.text, s.title)}>
          {data.type === "Диджитал"
            ? data.is_single
              ? `Сингл "${data.name}"`
              : `Альбом "${data.name}"`
            : `${data.type} "${data.name}"`}
        </Title>
        <div className={s.content}>
          {data.image ? (
              <Image
                src={data.image}
                style={{ flexShrink: "0" }}
                width={400}
                height={386}
                alt={data.name}
              />
            ) : (
              <div className={s.noPhoto}>Нет изображения</div>
            )
          }

          <div className={s.content__data}>
            {data.allow_overpay && (
              <div className={s.field}>
                <div className={s.field__labelContainer}>
                  <label className={clsx(s.text, s.field__labelContainer__label)} htmlFor='price'>
                    Введите сумму
                  </label>
                  <span className={s.field__labelContainer__icon}>
                    <span className={clsx(s.text, s.popup)}>
                      Вы можете выбрать любую сумму для оплаты товара, начиная с его номинальной
                      стоимости, чтобы поддержать любимого артиста
                    </span>
                  </span>
                </div>
                <input
                  value={newPrice}
                  className={clsx(s.text, s.field__input, s.field__input_border_bottom)}
                  type='number'
                  step={50}
                  name='price'
                  id='price'
                  placeholder={`от ${formatTotalPrice(Number(data.price))}`}
                  min={parseFloat(data.price)}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className={s.field}>
              <div className={s.field__labelContainer}>
                <label className={clsx(s.text, s.field__labelContainer__label)} htmlFor='comment'>
                  Комментарий к заказу
                </label>
                <span className={s.field__labelContainer__icon}>
                  <span className={clsx(s.text, s.popup)}>
                    Оставьте комментарий вместе с заказом и артист сможет увидеть его и ответить вам
                  </span>
                </span>
              </div>
              <input
                value={comment}
                className={clsx(s.text, s.field__input)}
                type='text'
                name='comment'
                id='comment'
                placeholder='Текст'
                onChange={handleChange}
              />
            </div>

            <CheckboxUI type='checkbox' isChecked={checkStatus} onChange={handleCheckStatusChange}>
              Подписаться на новости артиста и дать согласие на получение рассылки рекламных
              материалов
            </CheckboxUI>
            <ButtonUI variant='primary' onClick={handleAddToCart} disabled={isPending}>
              {isPending ? "Добавляем..." : "В корзину"}
            </ButtonUI>
            {error && <span>Ошибка добавления: попробуте еще раз</span>}
          </div>
        </div>
      </div>
    </ModalUI>
  );
};
