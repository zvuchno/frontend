"use client";

import { CheckboxUI } from "@/shared/ui";
import s from "./ListenerConsentsFields.module.scss";
import type { ListenerRegisterFormData } from "../../../model/ListenerRegisterForm.types";

export const ListenerConsentsFields = ({
  disabled,
  data,
  handleFieldChange,
}: {
  disabled: boolean;
  data: ListenerRegisterFormData;
  handleFieldChange: (
    field: keyof ListenerRegisterFormData
  ) => (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}
) => {

  return (
    <div className={s.consentsContainer}>

      <CheckboxUI 
        type="checkbox"
        name="listener_offer"
        isChecked={data.listener_offer}
        disabled={disabled}
        onChange={handleFieldChange("listener_offer")}
      >
        Я согласен с условиями{" "}
        <a 
          href="/legal/listener_offer" 
          target="_blank" 
          rel="noopener noreferrer"
          className={s.link}
        >
          оферты *
        </a>
      </CheckboxUI>

      <CheckboxUI 
        type="checkbox"
        name="listener_personal_data"
        isChecked={data.listener_personal_data}
        disabled={disabled}
        onChange={handleFieldChange("listener_personal_data")}
      >
        Я даю{" "}
        <a 
          href="/legal/listener_personal_data" 
          target="_blank" 
          rel="noopener noreferrer"
          className={s.link}
        >
          согласие на обработку персональных данных
        </a>
        {" "}в соответствии с{" "}
        <a 
          href="/legal/privacy_policy" 
          target="_blank" 
          rel="noopener noreferrer"
          className={s.link}
        >
          политикой обработки персональных данных *
        </a>
      </CheckboxUI>

      <CheckboxUI 
        type="checkbox"
        name="listener_distribution"
        isChecked={data.listener_distribution}
        disabled={disabled}
        onChange={handleFieldChange("listener_distribution")}
      >
        Я даю согласие{" "}
        <a 
          href="/legal/listener_distribution" 
          target="_blank" 
          rel="noopener noreferrer"
          className={s.link}
        >
          на распространение персональных данных *
        </a>
      </CheckboxUI>

      <CheckboxUI 
        type="checkbox"
        name="listener_newsletter"
        isChecked={data.listener_newsletter}
        disabled={disabled}
        onChange={handleFieldChange("listener_newsletter")}
      >
        Я даю {" "}
        <a 
          href="/legal/listener_newsletter" 
          target="_blank" 
          rel="noopener noreferrer"
          className={s.link}
        >
          согласие на рекламную и информационную рассылку
        </a>
      </CheckboxUI>
    </div>
  );
}