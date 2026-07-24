"use client";

import { useEffect, useRef } from "react";

import { type YooKassaPaymentProps } from "../model/types";
import { type YooMoneyCheckoutWidgetInstance } from "../model/uCassa";

//const URL_SUCCESS = "https://dev.zvuchno.space/order/order-succeed";
const returnPath = "/fans/orders";
const successPath = "/order/order-succeed";

export const YooKassaPayment = ({
  confirmationToken,
  onError,
  onReturn,
  onSuccess,
}: YooKassaPaymentProps) => {
  //const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const widgetRef = useRef<YooMoneyCheckoutWidgetInstance>(null);

  //const handleSetIsLoaded = () => setIsScriptLoaded(true);

  useEffect(() => {
    if (window.YooMoneyCheckoutWidget) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://yookassa.ru/checkout-widget/v1/checkout-widget.js";
    script.async = true;
    script.onerror = () => console.error("Не удалось загрузить скрипт ЮKassa");

    document.body.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!confirmationToken) return;

    const initWidget = () => {
      if (!window.YooMoneyCheckoutWidget) return;

      if (widgetRef.current) {
        widgetRef.current.destroy();
      }

      widgetRef.current = new window.YooMoneyCheckoutWidget({
        confirmation_token: confirmationToken,
        //return_url: URL_SUCCESS,
        customization: {
          modal: true,
          colors: {
            control_primary: "#000000",
            background: "#ffffff",
          },
        },
        error_callback: function (error) {
          console.error("Ошибка виджета ЮKassa:", error);
          if (onError) onError(error);
        },
      });

      widgetRef.current.render();

      if (onSuccess) {
        widgetRef.current.on("success", () => {
          onSuccess(successPath);
          if (widgetRef.current) widgetRef.current.destroy();
        });
      }

      if (onReturn) {
        widgetRef.current.on("modal_close", () => onReturn(returnPath));
        widgetRef.current.on("fail", () => onReturn(returnPath));
      }
    };

    if (window.YooMoneyCheckoutWidget) {
      initWidget();
    } else {
      const timer = setInterval(() => {
        if (window.YooMoneyCheckoutWidget) {
          clearInterval(timer);
          initWidget();
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [confirmationToken, onError, onReturn, onSuccess]);

  return null;
};
