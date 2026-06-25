import { TDeliveryOption } from "@/entities";
import { CheckboxUI } from "@/shared/ui";

import styles from '../OrderDetails.module.scss'

export const OrderDeliveryOptions = ({
  options,
  optionChecked,
  onChooseOption,
}: {
  options: TDeliveryOption[];
  optionChecked: string;
  onChooseOption: (option: string) => void;
}) => {
  return (
    <section className={styles.orderDetailsDeliveryOptions}>
      <h3 className={styles.title}>Способ доставки</h3>
      <div className={styles.orderDetailsDeliveryOptionsList}>
        {options.map((option) => (
          <CheckboxUI
            type={"radio"}
            key={option.id}
            name={option.name}
            onChange={() => onChooseOption(option.delivery_type)}
            isChecked={optionChecked === option.delivery_type}
          >
            {option.name}
          </CheckboxUI>
        ))}
      </div>
    </section>
  );
};