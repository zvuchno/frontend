"use client";

import { useEffect, useRef, useState } from "react";

import { type YooKassaPaymentProps } from "../model/types";
import { type YooMoneyCheckoutWidgetInstance } from "../model/uCassa";

const RETURN_URL = "https://dev.zvuchno.space/order/order-succeed";

export const YooKassaPayment = ({ confirmationToken, onError }: YooKassaPaymentProps) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const widgetRef = useRef<YooMoneyCheckoutWidgetInstance>(null);

  //const handleSetIsLoaded = () => setIsScriptLoaded(true);

  useEffect(() => {
    if (!window.YooMoneyCheckoutWidget) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://yookassa.ru/checkout-widget/v1/checkout-widget.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => console.error("Не удалось загрузить скрипт ЮKassa");

    document.body.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !confirmationToken) return;

    if (widgetRef.current) {
      widgetRef.current.destroy();
    }

    widgetRef.current = new window.YooMoneyCheckoutWidget({
      confirmation_token: confirmationToken,
      return_url: RETURN_URL,
      customization: {
        modal: true,
        colors: {
          control_primary: "#000000", // Цвет кнопок
          background: "#ffffff",
        },
      },
      error_callback: function (error: any) {
        console.error("Ошибка виджета ЮKassa:", error);
        if (onError) onError(error);
      },
    });

    widgetRef.current.render();
  }, [isScriptLoaded, confirmationToken, onError]);

  return null;
};
