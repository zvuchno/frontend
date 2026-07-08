import type { TCdekPickupDetailsResponse } from "../api/cdek.api";
import { type TCdekOfficeAddress } from "../model/types";
import styles from "../ui/CdekDelivery.module.scss";

export const createDeliveryPriceViewer = (
  data: TCdekPickupDetailsResponse,
  address: TCdekOfficeAddress,
  isDeliveryChosen: (isChosen: boolean) => void
) => {
  const cdekDelivetryWidget = document.getElementById("cdek-map");

  const deliveryOptionsContainer = cdekDelivetryWidget?.querySelectorAll(".cdek-dorbss") || [];

  const deliveryOption = [...deliveryOptionsContainer].filter(
    (el) => el.className.trim() === "cdek-dorbss"
  );

  if (deliveryOption.length > 0) {
    const targetElement = deliveryOption[0];

    //deliveryOption.find((el) => el.className.includes("payment"))?.remove();
    const existingPayment = targetElement.querySelector('[class*="payment"]');
    if (existingPayment) {
      existingPayment.remove();
    }

    const paymentData = document.createElement("div");
    paymentData.textContent = `Доставка в ПВЗ - ${address.code}`;
    paymentData.className = `${styles.payment}`;
    paymentData.onclick = () => {
      paymentData.classList.toggle(styles.active);
      if (isDeliveryChosen) isDeliveryChosen(!!styles.active);
    };

    const paymentDataDetails = document.createElement("div");
    paymentDataDetails.textContent = `Срок доставки (рабочие дни): ${data.period_min}-${data.period_max}`;
    paymentDataDetails.className = `${styles.paymentDetails}`;
    paymentData.appendChild(paymentDataDetails);

    const paymentDataSum = document.createElement("div");
    paymentDataSum.textContent = `Стоимость доставки: ${data.delivery_sum} RUB`;
    paymentDataSum.className = `${styles.paymentDetails}`;
    paymentData.appendChild(paymentDataSum);

    targetElement.appendChild(paymentData);

    const chooseButton = targetElement.querySelector("button");
  }
};
