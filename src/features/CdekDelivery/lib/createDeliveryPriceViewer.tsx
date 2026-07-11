import type {
  TCdekOfficeAddress,
  TCdekPickupDetailsResponse,
  TDeliveryPickpointSelection,
} from "../model/types";
import styles from "../ui/CdekDelivery.module.scss";

export const createDeliveryPriceViewer = (
  data: TCdekPickupDetailsResponse,
  address: TCdekOfficeAddress,
  onDeliverySelect: (selection: TDeliveryPickpointSelection) => void
) => {
  const cdekDelivetryWidget = document.getElementById("cdek-map");

  const deliveryOptionsContainer = cdekDelivetryWidget?.querySelectorAll(".cdek-dorbss") || [];

  const deliveryOption = [...deliveryOptionsContainer].filter(
    (el) => el.className.trim() === "cdek-dorbss"
  );

  if (deliveryOption.length > 0) {
    const targetElement = deliveryOption[0].querySelector(".cdek-qmwuzg");

    const selectButton = deliveryOption[0].querySelector("button");

    selectButton?.classList.add(`${styles.hiddenButton}`);

    const paymentDetails = document.createElement("div");
    paymentDetails.className = `${styles.payment}`;
    targetElement?.appendChild(paymentDetails);

    const paymentTitle = document.createElement("p");
    paymentTitle.textContent = "Выберите тариф";
    paymentTitle.className = `${styles.paymentTitle}`;
    paymentDetails.appendChild(paymentTitle);

    const paymentData = document.createElement("div");
    paymentData.className = `${styles.paymentData}`;
    paymentData.dataset.chosen = "false";
    paymentData.textContent = `Доставка в ПВЗ - ${address.code}`;
    paymentData.onclick = () => {
      const isCurrentlyChosen = paymentData.dataset.chosen === "true";
      const nextChosenState = !isCurrentlyChosen;
      paymentData.dataset.chosen = String(nextChosenState);
      paymentData.classList.toggle(styles.active, nextChosenState);

      onDeliverySelect(
        nextChosenState
          ? {
              isChosen: nextChosenState,
              code: address.code,
              price: Number(data.delivery_sum),
              daysMin: data.period_min,
              daysMax: data.period_max,
              address: address.address,
              city: address.city,
            }
          : null
      );
    };

    paymentDetails.appendChild(paymentData);

    const paymentDataDetails = document.createElement("div");
    paymentDataDetails.textContent = `Срок доставки (дн.): ${
      data.period_min === data.period_max || data.period_min === 0
        ? data.period_max
        : `${data.period_min}-${data.period_max}`
    }`;
    paymentDataDetails.className = `${styles.paymentDataDetails}`;
    paymentData.appendChild(paymentDataDetails);

    const paymentDataSum = document.createElement("div");
    paymentDataSum.textContent = `Стоимость доставки: ${data.delivery_sum} RUB`;
    paymentDataSum.className = `${styles.paymentDataDetails}`;
    paymentData.appendChild(paymentDataSum);

    const closeButtonContainer = deliveryOption[0].firstElementChild;

    const closeButton = closeButtonContainer?.querySelector("a");
    if (closeButton)
      closeButton.onclick = () => {
        onDeliverySelect(null);
        paymentDetails.remove();
      };
  }
};
