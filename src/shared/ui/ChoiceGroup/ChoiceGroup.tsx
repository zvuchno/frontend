import { Text } from "../Typography";
import s from "./ChoiceGroup.module.scss";
import clsx from "clsx";
import { ChoiceItemProps } from "./types";

export const ChoiceGroup = ({ items, value, containerClassName, disabled = false, onChange }: ChoiceItemProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div className={clsx(s.radioGroup, containerClassName)}>
      {items.map((item) => (
        <label key={item.value} className={clsx(s.radioGroup__label, { [s.radioGroup__label_disabled]: disabled })}>
          <input
            type="radio"
            name="choice"
            value={item.value}
            checked={value === item.value}
            onChange={handleChange}
            className={s.radioGroup__input}
            disabled={disabled}
          />
          <div
            className={clsx(
              s.radioGroup__button, 
              { [s.radioGroup__button_selected]: value === item.value }, 
              { [s.radioGroup__button_disabled]: disabled }

            )}
            style={{
              color: value === item.value ? "var(--color-text-primary)" : "var(--color-bg-secondary)",
            }}
          >
            <div 
              className={s.radioGroup__button__icon}
              style={{
                color: value === item.value ? "var(--color-text-primary)" : "var(--color-bg-secondary)",
              }}
            >
              <item.icon />
            </div>
            <Text className={s.text}>{item.label}</Text>
            {item.count && <Text className={s.text}>({item.count})</Text>}
          </div>
        </label>
      ))}
    </div>
  )
}